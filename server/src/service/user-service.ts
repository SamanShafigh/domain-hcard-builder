import HCardT from '../type';
import makeUser from '../lib/model/user-model';

const MODEL_NAME = 'user'

/**
 * UserService is to abstract the main logic related to User
 */
class UserService implements HCardT.UserService {
  dbDriver: HCardT.DbDriver
  
  constructor(dbDriver: HCardT.DbDriver) {
    this.dbDriver = dbDriver;
  }

  /**
   * Get a user and if user does not exist returns null
   * @param userId 
   */
  async getUser(userId: string) {
    var result = await this.dbDriver
      .findOne(MODEL_NAME, { userId }, { _id: 0 });
    
    return result? makeUser(result.data) : null;
  }  

  /**
   * Submit a user data
   * @param userId 
   * @param data 
   */
  async submitUser(userId: string, data: any) {
    const user = makeUser(data);
    return await this.dbDriver
      .update(MODEL_NAME, { userId }, { data: user });
  }

  /**
   * Update a user parameter
   * @param userId 
   * @param key 
   * @param value 
   */
  async updateUser(userId: string, key: string, value: string) {
    var reference = `data.${key}`;

    return await this.dbDriver
      .update(MODEL_NAME, { userId }, { [reference]: value });
  }
}

export default UserService;
