"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UserService is to abstract the main logic related to User
 */
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Get a user and if user does not exist returns null
     * @param userId
     */
    async getUser(userId) {
        return await this.userRepository.get(userId);
    }
    /**
     * Submit a user data
     * @param userId
     * @param data
     */
    async submitUser(userId, data) {
        return await this.userRepository.save(userId, data);
    }
    /**
     * Update a user parameter
     * @param userId
     * @param key
     * @param value
     */
    async updateUser(userId, key, value) {
        return await this.userRepository.update(userId, key, value);
    }
}
exports.default = UserService;
//# sourceMappingURL=user-service.js.map