"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const Task_model_1 = require("../models/Task.model");
const sequelize_1 = require("sequelize");
const Client_model_1 = require("../models/Client.model");
const contracts_service_1 = require("./contracts.service");
const clients_service_1 = require("./clients.service");
class TasksService {
    async getTasks() {
        const tasks = await Task_model_1.Task.findAll();
        return tasks;
    }
    async getTasksByClientId(clientId, include, attributes, where) {
        where = where ? where : [];
        const tasks = await Task_model_1.Task.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId },
                    ...where
                ]
            },
            attributes,
            include
        });
        return tasks;
    }
    async createTask(body) {
        const { serviceTypeId, clientId } = body;
        const contractsService = new contracts_service_1.ContractsService();
        const { includedHours } = await contractsService.getContractByClientId(clientId, [{ serviceId: serviceTypeId }]);
        const tasks = await this.getTasksByClientId(clientId, [Client_model_1.Client], ['startTime', 'endTime', 'price'], [{ serviceTypeId }]);
        const clientsService = new clients_service_1.ClientsService();
        const client = tasks.length
            ? tasks[0].client
            : await clientsService.getClientById(clientId, ['pricePerHour']);
        body.price = this.getTotalBillablePrice(tasks, includedHours, client.pricePerHour, body);
        const task = new Task_model_1.Task(body);
        await task.save();
        return task;
    }
    getTotalBillablePrice(tasks, includedHours, pricePerHour, body) {
        const taskTime = this.getDurationInMinutes(+new Date(body.endTime) - +new Date(body.startTime));
        const includedMinutes = includedHours * 60;
        const totalTimeOfTasks = tasks.reduce((acc, t) => acc + (+t.endTime - +t.startTime), 0);
        const totalMinutesOfTasks = this.getDurationInMinutes(totalTimeOfTasks);
        let price = 0;
        if (totalMinutesOfTasks >= includedMinutes) {
            price = pricePerHour * (taskTime / 60);
        }
        else if (totalMinutesOfTasks + taskTime > includedMinutes) {
            const leftOverTime = includedMinutes - totalMinutesOfTasks;
            const billableMinutes = taskTime - leftOverTime;
            price = pricePerHour * (billableMinutes / 60);
        }
        return price;
    }
    getDurationInMinutes(duration) {
        return Math.floor((duration / 1000) / 60);
    }
    async updateTask(taskId, body) {
        const { prop, value } = body;
        const task = await Task_model_1.Task.findOne({ where: { id: taskId } });
        task[prop] = value;
        await task.save();
        return task;
    }
}
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map