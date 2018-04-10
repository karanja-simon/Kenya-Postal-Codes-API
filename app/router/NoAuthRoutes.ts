import {Router} from 'express';
import {TokenController} from '../controllers/TokenController';

class AuthRoutes {
    router: Router;
    tokenCtlr: TokenController;

    constructor(){
        this.router = Router();
        this.tokenCtlr = new TokenController();
        this.routes();
    }

    // Authentication & Authorization required for the API
    // requests below.
    private routes(): void {
        this.router.post('/key', this.tokenCtlr.generateToken);
        this.router.post('/verify/key', this.tokenCtlr.verifyToken);
    }
}

export default new AuthRoutes().router;