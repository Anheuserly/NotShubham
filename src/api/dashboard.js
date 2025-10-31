// pages/api/dashboard.js
import { verifySession } from '../../lib/authController';
import { databases } from '../../lib/appwrite';
import { Query } from 'node-appwrite';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify the session
    const sessionValid = await verifySession(token);
    
    if (!sessionValid) {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }

    // Fetch dashboard data from Appwrite
    const [
      serviceRes, 
      clientsRes, 
      contactsRes, 
      feedRes, 
      vendorsRes,
      partnersRes,
      adminRes
    ] = await Promise.all([
      databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID),
      databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_CLIENTS_COLLECTION_ID),
      databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID),
      databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_FEED_COLLECTION_ID),
      databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_VENDORSHOWCASE_COLLECTION_ID),
      databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_PARTNERS_COLLECTION_ID),
      databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, process.env.NEXT_PUBLIC_APPWRITE_ADMIN_COLLECTION_ID)
    ]);

    const recentServiceRes = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, 
      process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID,
      [Query.limit(10), Query.orderDesc("$createdAt")]
    );

    const pendingRequests = serviceRes.documents.filter(r => r.status === "pending").length;
    const completedRequests = serviceRes.documents.filter(r => r.status === "completed").length;

    // Return the dashboard data
    res.json({
      success: true,
      stats: {
        totalServices: serviceRes.total,
        totalClients: clientsRes.total,
        totalContacts: contactsRes.total,
        totalFeedPosts: feedRes.total,
        totalVendors: vendorsRes.total,
        totalPartners: partnersRes.total,
        totalAdmins: adminRes.total,
        pendingRequests,
        completedRequests
      },
      recentActivities: recentServiceRes.documents
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}