import {Request, Response, NextFunction} from 'express';
import Validator from './../validators/Validator';

import Code from '../models/Code';

class CodeController {

    constructor() {

    }

    public getCodes(req: Request, res: Response): any {
        Code.find({})
            .then((data) => {
                if (data.length < 1) {
                    res.status(400).json({
                        status: 204,
                        success: false,
                        data: `No postal codes found`
                    });
                } else {
                    res.status(200).json({status: 200, success: true, data: data});
                }
            }, (err) => {
                res.json({
                    success: false,
                    error: err
                })
            });
    }


    public getPostalName(req: Request, res: Response): any {
        let code = req.params.code;
        if (!Validator.isValidPostalCode(code)) {
            return res.status(400).json({success: false, message: `Please provide a valid postal code`});
        }

        Code.find({code: Number(code)})
            .then((data) => {
                if (data.length < 1) {
                    res.status(400).json({
                        status: 204,
                        success: false,
                        data: `No Postal name found for the Code: ${code}`
                    });
                } else {
                    res.status(200).json({status: 200, success: true, data: data});
                }
            }, (err) => {
                res.json({success: false, error: err})
            });

    }

    public getPostalCode(req: Request, res: Response): any {
        let postalName = req.params.name;
        if (!Validator.isValidString(postalName)) {
            return res.status(400).json({success: false, message: `Please provide a valid Postal name`});
        }

        Code.find({name: postalName})
            .then((data) => {
                if (data.length < 1) {
                    res.status(400).json({
                        status: 204,
                        success: false,
                        data: `No Postal Code found for the name: ${postalName}`
                    });
                } else {
                    res.status(200).json({status: 200, success: true, data: data});
                }
            }, (err) => {
                res.json({success: false, error: err})
            });

    }


}

export {CodeController};