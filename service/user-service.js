const tplService = require('./template-service')
const hCardComponent = require('../public/main.js').default;

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getView(userId) {
    var props = await this.userRepository.get(userId);

    return tplService.render(hCardComponent, props);
  }  

  async submitUser(userId, data) {
    return await this.userRepository.save(userId, data);
  }

  async updateUser(userId, data) {
    return await this.userRepository.save(userId, data);
  }
}

module.exports = UserService;
