"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_model_1 = require("../models/Task.model");
class TasksService {
    async getTasks() {
        const tasks = await Task_model_1.Task.findAll();
        return tasks;
    }
    async getTasksByProjectId(projectId) {
        const tasks = await Task_model_1.Task.findAll({ where: { projectId } });
        return tasks;
    }
    async createTask(body) {
        try {
            const task = new Task_model_1.Task(body);
            await task.save();
            return task;
        }
        catch (e) {
            return { error: 'Must have a valid project id' };
        }
    }
}
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map