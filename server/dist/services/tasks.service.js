"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_model_1 = require("../models/Task.model");
const Service_model_1 = require("../models/Service.model");
class TasksService {
    async getTasks() {
        const tasks = await Task_model_1.Task.findAll();
        return tasks;
    }
    async getTasksByClientId(clientId) {
        const tasks = await Task_model_1.Task.findAll({ where: { clientId }, include: [Service_model_1.Service] });
        return tasks;
    }
    async createTask(body) {
        //Update the client's balance
        //Possibly update the task current balance or isPaid
        const task = new Task_model_1.Task(body);
        await task.save();
        return task;
    }
}
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map