import {Router} from 'express';

import {CodeController} from '../controllers/CodeController';


class AuthRoutes {
    router: Router;
    codeCtlr: CodeController;

    constructor(){
        this.router = Router();
        this.codeCtlr = new CodeController();
        this.routes();
    }

    // Authentication & Authorization required for the API requests below.
    private routes(): void {
        this.router.get('/codes',       this.codeCtlr.getCodes);
        this.router.get('/code/:code', this.codeCtlr.getPostalName);
        this.router.get('/name/:name', this.codeCtlr.getPostalCode);

    }
}

export default new AuthRoutes().router;