// src/lib/appwrite.ts
import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Export collection IDs for easy access
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

export const COLLECTIONS = {
  PARTNERS: process.env.NEXT_PUBLIC_APPWRITE_PARTNERS_COLLECTION_ID || '',
  CLIENTS: process.env.NEXT_PUBLIC_APPWRITE_CLIENTS_COLLECTION_ID || '',
  SERVICE_REQUESTS: process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID || '',
  VENDORSHOWCASE: process.env.NEXT_PUBLIC_APPWRITE_VENDORSHOWCASE_COLLECTION_ID || '',
  FEED: process.env.NEXT_PUBLIC_APPWRITE_FEED_COLLECTION_ID || '',
  FEEDBACK: process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID || '',
  USERS: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '',
  SESSIONS: process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID || '',
  AUDIT_LOGS: process.env.NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID || '',
  ADMIN: process.env.NEXT_PUBLIC_APPWRITE_ADMIN_COLLECTION_ID || '',
  ANALYSTS: process.env.NEXT_PUBLIC_APPWRITE_ANALYSTS_COLLECTION_ID || '',
  CONTACTS: process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID || '',
  JOURNAL: process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID || '',
};

// Export bucket IDs
export const BUCKETS = {
  PAYMENT: process.env.NEXT_PUBLIC_APPWRITE_PAYMENT_BUCKET_ID || '',
  SHOWCASE: process.env.NEXT_PUBLIC_APPWRITE_SHOWCASE_BUCKET_ID || '',
  FEED: process.env.NEXT_PUBLIC_APPWRITE_FEED_BUCKET_ID || '',
  PARTNERS_DOCS: process.env.NEXT_PUBLIC_APPWRITE_PARTNERS_DOCS_BUCKET_ID || '',
};


export { client, account, databases, storage };