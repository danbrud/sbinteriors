"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const sequelize_typescript_1 = require("sequelize-typescript");
const Client_model_1 = require("./models/Client.model");
const Transfer_model_1 = require("./models/Transfer.model");
class App {
    constructor(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeDB();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        if (process.env.NODE_ENV === 'development') {
            this.app.use(cors_1.default());
        }
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    initializeDB() {
        const sequelize = new sequelize_typescript_1.Sequelize({
            database: 'sbinteriors',
            dialect: 'mysql',
            username: 'root',
            host: 'localhost',
            models: [Client_model_1.Client, Transfer_model_1.Transfer]
        });
        sequelize.sync();
    }
    initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use(`/api/${controller.path}`, controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map