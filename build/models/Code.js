"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let CodeSchema = new mongoose_1.Schema({
    postalCode: { type: Number, default: 0 },
    postalName: { type: String, default: '' },
}, { collection: 'codes' });
exports.default = mongoose_1.model('Code', CodeSchema);
//# sourceMappingURL=Code.js.map