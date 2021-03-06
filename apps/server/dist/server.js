"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
const clients_controller_1 = require("./controllers/clients.controller");
const tasks_controller_1 = require("./controllers/tasks.controller");
const expenses_controller_1 = require("./controllers/expenses.controller");
const transfers_controller_1 = require("./controllers/transfers.controller");
const admin_controller_1 = require("./controllers/admin.controller");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../..', '.env') });
const app = new app_1.default([
    new clients_controller_1.ClientsController(),
    new tasks_controller_1.TasksController(),
    new expenses_controller_1.ExpensesController(),
    new transfers_controller_1.TransfersController(),
    new admin_controller_1.AdminController()
], process.env.PORT);
app.listen();
//# sourceMappingURL=server.js.map