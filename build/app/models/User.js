"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
    }
});
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map