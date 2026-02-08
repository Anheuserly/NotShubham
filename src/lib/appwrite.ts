import { Account, Client, Databases, ID, Query } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "";

const client = new Client();

if (endpoint) {
  client.setEndpoint(endpoint);
}

if (projectId) {
  client.setProject(projectId);
}

const account = new Account(client);
const databases = new Databases(client);

const appwriteConfig = {
  endpoint,
  projectId,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
  messagesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID ?? "",
  profilesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID ?? "",
};

export { account, appwriteConfig, client, databases, ID, Query };
