import conf from "../conf/conf";
import { ID, Client, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Post Related Services
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return post;
    } catch (error) {
      console.log("Appwrite Error :: createPost");
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Error :: updatePost");
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite error :: deletePost");
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Error :: getPost");
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Error :: getAllPosts");
      return false;
    }
  }

  //File Related Services
  async fileUpload(file) {
    try {
      return await this.storage.createFile(conf.appwriteBuckedId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite Error :: fileUpload");
      return false;
    }
  }

  async fileDelete(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBuckedId,fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Error :: fileDelete");
      return false;
    }
  }

  getfilePreview(fileId)
  {
    return this.storage.getFilePreview(conf.appwriteBuckedId,fileId);
  }
}

const service = new Service();
export default service;
