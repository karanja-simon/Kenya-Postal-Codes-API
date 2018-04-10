"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("./../validators/Validator");
const Code_1 = require("../models/Code");
class CodeController {
    constructor() {
    }
    getCodes(req, res) {
        Code_1.default.find({})
            .then((data) => {
            if (data.length < 1) {
                res.status(400).json({
                    status: 204,
                    success: false,
                    data: `No postal codes found`
                });
            }
            else {
                res.status(200).json({ status: 200, success: true, data: data });
            }
        }, (err) => {
            res.json({
                success: false,
                error: err
            });
        });
    }
    getPostalName(req, res) {
        let code = req.params.code;
        if (!Validator_1.default.isValidPostalCode(code)) {
            return res.status(400).json({ success: false, message: `Please provide a valid postal code` });
        }
        Code_1.default.find({ code: Number(code) })
            .then((data) => {
            if (data.length < 1) {
                res.status(400).json({
                    status: 204,
                    success: false,
                    data: `No Postal name found for the Code: ${code}`
                });
            }
            else {
                res.status(200).json({ status: 200, success: true, data: data });
            }
        }, (err) => {
            res.json({ success: false, error: err });
        });
    }
    getPostalCode(req, res) {
        let postalName = req.params.name;
        if (!Validator_1.default.isValidString(postalName)) {
            return res.status(400).json({ success: false, message: `Please provide a valid Postal name` });
        }
        Code_1.default.find({ name: postalName })
            .then((data) => {
            if (data.length < 1) {
                res.status(400).json({
                    status: 204,
                    success: false,
                    data: `No Postal Code found for the name: ${postalName}`
                });
            }
            else {
                res.status(200).json({ status: 200, success: true, data: data });
            }
        }, (err) => {
            res.json({ success: false, error: err });
        });
    }
}
exports.CodeController = CodeController;
//# sourceMappingURL=CodeController.js.map