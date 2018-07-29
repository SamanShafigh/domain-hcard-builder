"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../lib/model/user-model");
const MODEL_NAME = 'user';
/**
 * UserService is to abstract the main logic related to User
 */
class UserService {
    constructor(dbDriver) {
        this.dbDriver = dbDriver;
    }
    /**
     * Get a user and if user does not exist returns null
     * @param userId
     */
    async getUser(userId) {
        var result = await this.dbDriver
            .findOne(MODEL_NAME, { userId }, { _id: 0 });
        return result ? user_model_1.default(result.data) : null;
    }
    /**
     * Submit a user data
     * @param userId
     * @param data
     */
    async submitUser(userId, data) {
        const user = user_model_1.default(data);
        return await this.dbDriver
            .update(MODEL_NAME, { userId }, { data: user });
    }
    /**
     * Update a user parameter
     * @param userId
     * @param key
     * @param value
     */
    async updateUser(userId, key, value) {
        var reference = `data.${key}`;
        return await this.dbDriver
            .update(MODEL_NAME, { userId }, { [reference]: value });
    }
}
exports.default = UserService;
//# sourceMappingURL=user-service.js.map