"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_model_1 = require("../models/Service.model");
class ServicesService {
    async getServices() {
        const services = await Service_model_1.Service.findAll();
        return services;
    }
    async createService(body) {
        const service = new Service_model_1.Service(body);
        await service.save();
        return service;
    }
}
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map