"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TokenController_1 = require("../controllers/TokenController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.tokenCtlr = new TokenController_1.TokenController();
        this.routes();
    }
    // Authentication & Authorization required for the API
    // requests below.
    routes() {
        this.router.post('/key', this.tokenCtlr.generateToken);
        this.router.post('/verify/key', this.tokenCtlr.verifyToken);
    }
}
exports.default = new AuthRoutes().router;
//# sourceMappingURL=NoAuthRoutes.js.map