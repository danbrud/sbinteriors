"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const Service_model_1 = require("../models/Service.model");
const TransferMethod_model_1 = require("../models/TransferMethod.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const User_model_1 = require("../models/User.model");
class AdminService {
    async getServices() {
        const services = await Service_model_1.Service.findAll();
        return services;
    }
    async createService(body) {
        const service = new Service_model_1.Service(body);
        await service.save();
        return service;
    }
    async createTransferMethod(body) {
        const transferMethod = new TransferMethod_model_1.TransferMethod(body);
        await transferMethod.save();
        return transferMethod;
    }
    async getTransferMethods() {
        const transferMethods = await TransferMethod_model_1.TransferMethod.findAll();
        return transferMethods;
    }
    async loginUser(body) {
        const { username, password } = body;
        const { errors, isValid } = utils_1.validateLoginInput({ username, password });
        if (!isValid) {
            return { success: false, errors, code: 400 };
        }
        const user = await User_model_1.User.findOne({ where: { username } });
        if (!user) {
            return {
                success: false, errors: { error: 'Username not found' }, code: 404
            };
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (isMatch) {
            const payload = {
                id: user.id,
                clientId: user.clientId,
                role: user.role
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_OR_KEY, {
                expiresIn: 31556926
            });
            return { success: true, token };
        }
        else {
            return {
                success: false, errors: { error: 'Password incorrect' }, code: 400
            };
        }
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map