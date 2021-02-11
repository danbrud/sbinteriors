"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_service_1 = require("../services/services.service");
class ServicesController {
    constructor() {
        this.servicesService = new services_service_1.ServicesService();
        this.path = 'services';
        this.router = express_1.default.Router();
        this.getServices = async (req, res) => {
            const services = await this.servicesService.getServices();
            res.send(services);
        };
        this.createService = async (req, res) => {
            const service = await this.servicesService.createService(req.body);
            res.send(service);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getServices);
        this.router.post('/', this.createService);
    }
}
exports.ServicesController = ServicesController;
//# sourceMappingURL=services.controller.js.map