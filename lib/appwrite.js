import { Client, Account, Databases, ID, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("68668b18003724b775c6"); // Replace with your project ID

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
export { databases, account, ID, storage };
