"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    constructor() {
    }
    isValidEmail(email) {
        const re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        return re.test(email);
    }
    isValidPostalCode(code) {
        if ((code != null && code != 0)) {
            if (!isNaN(code)) {
                return true;
            }
        }
        return false;
    }
    isValidString(string) {
        if ((string != null && string != undefined)) {
            return true;
        }
        return false;
    }
}
exports.default = new Validator();
//# sourceMappingURL=Validator.js.map