// authController.js
const { Client, Databases, Query } = require("node-appwrite");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

// Use consistent environment variable names
const DB_ID = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const ANALYSTS_COLLECTION_ID = process.env.APPWRITE_ANALYSTS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_ANALYSTS_COLLECTION_ID;
const SESSIONS_COLLECTION_ID = process.env.APPWRITE_SESSIONS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID;
const AUDIT_LOGS_COLLECTION_ID = process.env.APPWRITE_AUDIT_LOGS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID;

// Security settings
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

async function login(req, res) {
  try {
    const { phone_number, password, remember_me } = req.body;
    
    // Input validation
    if (!phone_number || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Phone number and password are required" 
      });
    }

    // Clean phone number (remove non-digit characters)
    const cleanPhone = phone_number.replace(/\D/g, '');

    // Check if analyst exists
    const analysts = await databases.listDocuments(
      DB_ID,
      ANALYSTS_COLLECTION_ID,
      [Query.equal("phone_number", cleanPhone)]
    );

    if (analysts.total === 0) {
      await logAudit('login', null, 'failure', 'Invalid phone number', req.ip);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const analyst = analysts.documents[0];
    
    // Check if account is locked
    if (analyst.login_attempts >= MAX_LOGIN_ATTEMPTS) {
      const lastAttempt = new Date(analyst.last_attempt || 0);
      const timeDiff = Date.now() - lastAttempt.getTime();
      
      if (timeDiff < LOGIN_TIMEOUT) {
        await logAudit('login', analyst.$id, 'failure', 'Account locked', req.ip);
        return res.status(401).json({ 
          success: false, 
          message: "Account temporarily locked. Try again later." 
        });
      } else {
        // Reset login attempts after timeout
        await databases.updateDocument(
          DB_ID,
          ANALYSTS_COLLECTION_ID,
          analyst.$id,
          { login_attempts: 0 }
        );
      }
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, analyst.password_hash);
    
    if (!isPasswordValid) {
      // Increment login attempts
      const newAttempts = (analyst.login_attempts || 0) + 1;
      await databases.updateDocument(
        DB_ID,
        ANALYSTS_COLLECTION_ID,
        analyst.$id,
        {
          login_attempts: newAttempts,
          last_attempt: new Date().toISOString()
        }
      );
      
      await logAudit('login', analyst.$id, 'failure', 'Invalid password', req.ip);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    // Check if account is active
    if (analyst.is_active === false) {
      await logAudit('login', analyst.$id, 'failure', 'Account inactive', req.ip);
      return res.status(401).json({ 
        success: false, 
        message: "Account is deactivated. Contact administrator." 
      });
    }

    // Generate session token
    const sessionToken = generateSessionToken();
    const sessionExpiry = new Date(Date.now() + SESSION_DURATION);
    const hashedToken = await hashToken(sessionToken);
    
    // Create session record
    await databases.createDocument(
      DB_ID,
      SESSIONS_COLLECTION_ID,
      'unique()',
      {
        analyst_id: analyst.$id,
        session_token: hashedToken,
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        login_time: new Date().toISOString(),
        expiry_time: sessionExpiry.toISOString(),
        is_active: true
      }
    );

    // Update analyst record
    await databases.updateDocument(
      DB_ID,
      ANALYSTS_COLLECTION_ID,
      analyst.$id,
      {
        is_logged_in: true,
        last_login: new Date().toISOString(),
        login_attempts: 0, // Reset on successful login
        session_token: hashedToken,
        session_expiry: sessionExpiry.toISOString()
      }
    );

    // Log successful login
    await logAudit('login', analyst.$id, 'success', 'User logged in', req.ip);

    // Return success response
    res.json({
      success: true,
      session_token: sessionToken,
      analyst_id: analyst.$id,
      analyst_name: analyst.name,
      analyst_role: analyst.role,
      analyst_phone: analyst.phone_number,
      expires_in: SESSION_DURATION
    });

  } catch (error) {
    console.error("Login error:", error);
    await logAudit('login', null, 'failure', 'Server error: ' + error.message, req.ip);
    res.status(500).json({ 
      success: false, 
      message: "Server error. Please try again later." 
    });
  }
}

// Utility functions
function generateSessionToken() {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex') + Date.now();
}

async function hashToken(token) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function logAudit(action, analystId, status, details, ipAddress) {
  try {
    await databases.createDocument(
      DB_ID,
      AUDIT_LOGS_COLLECTION_ID,
      'unique()',
      {
        analyst_id: analystId,
        action: action,
        status: status,
        details: details,
        ip_address: ipAddress,
        timestamp: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error("Audit log error:", error);
  }
}

// Password utility functions
const hashPassword = async (plainPassword) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  return await bcrypt.hash(plainPassword, saltRounds);
};

const verifyPassword = async (plainPassword, hash) => {
  return await bcrypt.compare(plainPassword, hash);
};

// Middleware to verify session
async function verifySession(req, res, next) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({ 
        success: false, 
        message: "Session token required" 
      });
    }

    // Hash the token to compare with stored hash
    const hashedToken = await hashToken(sessionToken);

    // Find active session
    const sessions = await databases.listDocuments(
      DB_ID,
      SESSIONS_COLLECTION_ID,
      [
        Query.equal("session_token", hashedToken),
        Query.equal("is_active", true)
      ]
    );

    if (sessions.total === 0) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid or expired session" 
      });
    }

    const session = sessions.documents[0];
    
    // Check if session is expired
    if (new Date() > new Date(session.expiry_time)) {
      await databases.updateDocument(
        DB_ID,
        SESSIONS_COLLECTION_ID,
        session.$id,
        {
          is_active: false,
          logout_reason: 'expired',
          logout_time: new Date().toISOString()
        }
      );
      
      return res.status(401).json({ 
        success: false, 
        message: "Session expired" 
      });
    }

    // Update last activity
    await databases.updateDocument(
      DB_ID,
      SESSIONS_COLLECTION_ID,
      session.$id,
      {
        last_activity: new Date().toISOString()
      }
    );

    req.analystId = session.analyst_id;
    next();
  } catch (error) {
    console.error("Session verification error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during session verification" 
    });
  }
}

module.exports = { 
  login, 
  hashPassword, 
  verifyPassword,
  generateSessionToken,
  hashToken,
  verifySession
};