"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
const clients_controller_1 = require("./controllers/clients.controller");
const config = dotenv_1.default.config({ path: path_1.default.join(__dirname, '../..', '.env') });
const app = new app_1.default([
    new clients_controller_1.ClientsController()
], config.parsed.PORT);
app.listen();
//# sourceMappingURL=server.js.map