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
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const sequelize_typescript_1 = require("sequelize-typescript");
const Client_model_1 = require("./models/Client.model");
const Transfer_model_1 = require("./models/Transfer.model");
const Task_model_1 = require("./models/Task.model");
const Expense_model_1 = require("./models/Expense.model");
const Service_model_1 = require("./models/Service.model");
const TransferMethod_model_1 = require("./models/TransferMethod.model");
const Contract_model_1 = require("./models/Contract.model");
const User_model_1 = require("./models/User.model");
const BalanceTransfer_model_1 = require("./models/BalanceTransfer.model");
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./config/passport");
class App {
    constructor(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeDB();
        this.inializeAuth();
        this.initializeControllers(controllers);
        if (process.env.NODE_ENV === 'production') {
            this.serveClient();
        }
    }
    initializeMiddlewares() {
        if (process.env.NODE_ENV === 'development') {
            this.app.use(cors_1.default());
        }
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    inializeAuth() {
        this.app.use(passport_1.default.initialize());
        passport_2.useStrategy(passport_1.default);
    }
    initializeDB() {
        const sequelize = new sequelize_typescript_1.Sequelize({
            database: process.env.DB_NAME,
            dialect: 'mysql',
            username: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD || '',
            models: [
                Client_model_1.Client,
                Task_model_1.Task,
                Expense_model_1.Expense,
                TransferMethod_model_1.TransferMethod,
                Transfer_model_1.Transfer,
                Service_model_1.Service,
                Contract_model_1.Contract,
                User_model_1.User,
                BalanceTransfer_model_1.BalanceTransfer
            ],
            dialectOptions: {
                useUTC: false,
                dateStrings: true,
                typeCast: true
            },
            timezone: '+03:00'
        });
        sequelize.sync();
    }
    serveClient() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'build')));
        this.app.get('*', function (req, res) {
            res.sendFile(path_1.default.join(__dirname, '..', '..', 'build', 'index.html'));
        });
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