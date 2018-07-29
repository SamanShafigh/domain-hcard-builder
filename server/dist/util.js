"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getKeyValue(data) {
    if (typeof data !== "object") {
        throw new Error('Expect to have an object');
    }
    var key = Object.keys(data)[0];
    return {
        key: key,
        value: data[key]
    };
}
exports.getKeyValue = getKeyValue;
//# sourceMappingURL=util.js.map