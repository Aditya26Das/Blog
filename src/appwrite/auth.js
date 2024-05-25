import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Call a method to redirect to login page
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async logIn({ email, password }) {
    try {
      return this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser()
  {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite Error")
    }

    return null;
  }
  
  async logOut()
  {
    try {
        this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite service :: Logout Error")
    }
  }
}

const authServise = new AuthService();

export default authServise;
