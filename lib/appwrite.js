import { Client, Account, Databases, ID, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("6865571c000697a2d379"); // Replace with your project ID

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
export { databases, account, ID, storage };
