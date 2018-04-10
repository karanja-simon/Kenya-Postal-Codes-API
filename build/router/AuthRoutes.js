"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CodeController_1 = require("../controllers/CodeController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.codeCtlr = new CodeController_1.CodeController();
        this.routes();
    }
    // Authentication & Authorization required for the API requests below.
    routes() {
        this.router.get('/codes', this.codeCtlr.getCodes);
        this.router.get('/code/:code', this.codeCtlr.getPostalName);
        this.router.get('/name/:name', this.codeCtlr.getPostalCode);
    }
}
exports.default = new AuthRoutes().router;
//# sourceMappingURL=AuthRoutes.js.map