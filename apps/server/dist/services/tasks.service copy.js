"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_model_1 = require("../models/Task.model");
class TasksService {
    async getTasks() {
        const tasks = await Task_model_1.Task.findAll();
        return tasks;
    }
    async getTasksByClientId(clientId) {
        const tasks = await Task_model_1.Task.findAll({ where: { clientId } });
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
//# sourceMappingURL=tasks.service copy.js.map