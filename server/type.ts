import { Context } from "koa";
import { Router } from "koa-router";

declare namespace HCardT {
  /**
   * A user model
   */
  export interface User {
    givenName?: string;
    surname?: string;
    email?: string;
    phone?: string;
    houseNumber?: string;
    street?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    country?: string;
  }

  /**
   * A simple key/value data structure
   */
  export interface KeyValue {
    key: string;
    value: number|string;
  }

  /**
   * Our extended context over Koa context
   */
  export interface CTX extends Context {
    view?: View;
    meta?: Meta;
  }

  /**
   * The next middleware
   */
  export type Next = () => Promise<any>

  /**
   * Data structure to represent how our render 
   * middleware is going to render the result 
   */
  export interface View {
    component?: string;
    template?: string;
    props?: any;
    response?: any;
  }

  /**
   * Some metadata we add to the ctx, you can access it by
   * ctx.meta
   */
  export interface Meta {
    userId: string;
    noscript: boolean;
  }

  /**
   * System main configuration data structure
   */
  export interface Config {
    staticRoot: string;
    serverPort: number;
    renderMode: 'ssr' | 'spa';
    dbUri: string;
    dbName: string;
  }

  export type CntrMiddleware = Router.IMiddleware;

  /**
   * UserController is to abstract the user related controllers
   */
  export declare class UserController {
    /** Get the view page */
    index(): CntrMiddleware;

    /** Submit a user data endpoint */
    submit(): CntrMiddleware;

    /** Update user data endpoint */
    update(): CntrMiddleware;
  }

  /**
   * UserService is to abstract the main logic related to User
   */
  export declare class UserService {
    userRepository: any

    /**
     * Get a user and if user does not exist returns null
     * @param userId 
     */
    async getUser(userId: string): Promise<User|null>;

    /**
     * Submit a user data
     * @param userId 
     * @param data 
     */
    async submitUser(userId: string, data: User): Promise<any>;

    /**
     * Update a user parameter
     * @param userId 
     * @param key 
     * @param value 
     */
    async updateUser(userId: string, key: string, value: any): Promise<any>;
  }  

  /**
   * UserRepository abstracts all the persisting 
   * logics related to a User model
   */
  export declare class UserRepository {
    db: any;

    /**
     * Find and return a user from db or return null
     * @param userId 
     */
    async get(userId: string): Promise<User|null>;
    
    /**
     * Save a user data to db
     * @param userId 
     * @param data 
     */
    async save(userId: string, data: User): Promise<void>;
    
    /**
     * Update a user filed in db
     * @param userId 
     * @param key 
     * @param value 
     */
    async update(userId: string, key: string, value: any): Promise<void>;
  }
}

export default HCardT;