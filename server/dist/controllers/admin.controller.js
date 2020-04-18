"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_service_1 = require("../services/admin.service");
class AdminController {
    constructor() {
        this.adminService = new admin_service_1.AdminService();
        this.path = 'admin';
        this.router = express_1.default.Router();
        this.getServices = async (req, res) => {
            const services = await this.adminService.getServices();
            res.send(services);
        };
        this.createService = async (req, res) => {
            const service = await this.adminService.createService(req.body);
            res.send(service);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/services', this.getServices);
        this.router.post('/services', this.createService);
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map