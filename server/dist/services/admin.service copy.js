"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_model_1 = require("../models/Service.model");
const TransferMethod_model_1 = require("../models/TransferMethod.model");
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
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service copy.js.map