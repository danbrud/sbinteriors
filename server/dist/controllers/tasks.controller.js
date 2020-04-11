"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_service_1 = require("../services/tasks.service");
class TasksController {
    constructor() {
        this.tasksService = new tasks_service_1.TasksService();
        this.path = 'tasks';
        this.router = express_1.default.Router();
        this.getTasks = async (req, res) => {
            const tasks = await this.tasksService.getTasks();
            res.send(tasks);
        };
        this.getTasksByProjectId = async (req, res) => {
            const { projectId } = req.params;
            const tasks = await this.tasksService.getTasksByProjectId(projectId);
            res.send(tasks);
        };
        this.createExpense = async (req, res) => {
            const task = await this.tasksService.createTask(req.body);
            res.send(task);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getTasks);
        this.router.get('/:projectId', this.getTasksByProjectId);
        this.router.post('/', this.createExpense);
    }
}
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map