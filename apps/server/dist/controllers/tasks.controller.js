"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const express_1 = __importDefault(require("express"));
const tasks_service_1 = require("../services/tasks.service");
const Service_model_1 = require("../models/Service.model");
class TasksController {
    constructor() {
        this.tasksService = new tasks_service_1.TasksService();
        this.path = 'tasks';
        this.router = express_1.default.Router();
        this.getTasks = async (req, res) => {
            const tasks = await this.tasksService.getTasks();
            res.send(tasks);
        };
        this.getTasksByClientId = async (req, res) => {
            const { clientId } = req.params;
            const tasks = await this.tasksService.getTasksByClientId(clientId, [Service_model_1.Service]);
            res.send(tasks);
        };
        this.createTask = async (req, res) => {
            const task = await this.tasksService.createTask(req.body);
            res.send(task);
        };
        this.updateTask = async (req, res) => {
            const task = await this.tasksService.updateTask(req.params.taskId, req.body);
            res.send(task);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getTasks);
        this.router.get('/:clientId', this.getTasksByClientId);
        this.router.post('/', this.createTask);
        this.router.put('/:taskId', this.updateTask);
    }
}
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map