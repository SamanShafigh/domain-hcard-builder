class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUser(userId) {
    return await this.userRepository.get(userId);
  }  

  async submitUser(userId, data) {
    return await this.userRepository.save(userId, data);
  }

  async updateUser(userId, key, value) {
    return await this.userRepository.update(userId, key, value);
  }
}

module.exports = UserService;
