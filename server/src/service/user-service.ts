import HCardT from '../type';
import makeUser from '../model/user-model';

/**
 * UserService is to abstract the main logic related to User
 */
class UserService implements HCardT.UserService {
  userRepository: any
  
  constructor(userRepository: any) {
    this.userRepository = userRepository;
  }

  /**
   * Get a user and if user does not exist returns null
   * @param userId 
   */
  async getUser(userId: string) {
    return await this.userRepository.get(userId);
  }  

  /**
   * Submit a user data
   * @param userId 
   * @param data 
   */
  async submitUser(userId: string, data: any) {
    const user = makeUser(data);
    
    return await this.userRepository.save(userId, user);
  }

  /**
   * Update a user parameter
   * @param userId 
   * @param key 
   * @param value 
   */
  async updateUser(userId: string, key: string, value: string) {
    return await this.userRepository.update(userId, key, value);
  }
}

export default UserService;
