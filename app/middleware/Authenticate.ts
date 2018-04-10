import {Request, Response, NextFunction} from 'express';
import {TokenController} from "../controllers/TokenController";

let jwt = require('jsonwebtoken');
let config = require('./../../config/config');

class Authenticate {

    tokenCtlr: TokenController;
    constructor() {
        this.tokenCtlr = new TokenController();
    }

    public authenticateApiRequest(req: Request, res: Response, next: NextFunction) {

        if(!(req.headers && req.headers.authorization))  {
            return res.status(400).json({success: false, message: 'Please provide valid authorization headers'});
        }

        let header = (<string>req.headers.authorization).split(' ');
        let token = header[1] || req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) return res.json({status: 204, success: false, message: `No token provided`});

        jwt.verify(token, config.key, function (err, decoded) {
            if (err) return res.json({status: 401, message: `Access restricted`});

            next();
        });
    }
}

export {Authenticate};