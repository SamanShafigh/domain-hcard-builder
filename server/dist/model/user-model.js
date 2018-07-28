"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A user model
 */
class User {
    constructor() {
        this.givenName = null;
        this.surname = null;
        this.email = null;
        this.phone = null;
        this.houseNumber = null;
        this.street = null;
        this.suburb = null;
        this.state = null;
        this.postcode = null;
        this.country = null;
    }
}
exports.User = User;
/**
 * A simple ORM for sanitization mechanism of input data.
 * This function will return User object if data are valid
 * otherwise will throw an error.
 * I can use other advanced techniques like an ORM or some third
 * party validators but will keep it simple for now
 * @param data
 */
function makeUser(data) {
    const user = new User();
    const keys = Object.keys(user);
    Object.keys(data).map(key => {
        if (!keys.includes(key)) {
            throw new Error(`Param ${key} is not defined in User model`);
        }
    });
    return Object.assign(user, data);
}
exports.default = makeUser;
;
//# sourceMappingURL=user-model.js.map