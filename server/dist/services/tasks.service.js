"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_model_1 = require("../models/Task.model");
const Service_model_1 = require("../models/Service.model");
const Contract_model_1 = require("../models/Contract.model");
const sequelize_1 = require("sequelize");
const Client_model_1 = require("../models/Client.model");
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
        const { serviceTypeId, clientId } = body;
        const { includedHours } = await Contract_model_1.Contract.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId },
                    { serviceId: serviceTypeId }
                ]
            }
        });
        const tasks = await Task_model_1.Task.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { clientId },
                    { serviceTypeId }
                ]
            },
            attributes: ['startTime', 'endTime', 'price'],
            include: [Client_model_1.Client]
        });
        const totalTime = tasks.reduce((acc, t) => acc + (+t.endTime - +t.startTime), 0);
        const totalMinutes = Math.floor((totalTime / 1000) / 60);
        const includedMinutes = includedHours * 60;
        body.endTime = new Date(body.endTime);
        body.startTime = new Date(body.startTime);
        const taskTime = Math.floor(((+body.endTime - +body.startTime) / 1000) / 60);
        //put in function and call inside if
        let client;
        if (tasks.length) {
            client = tasks[0].client;
        }
        else {
            client = await Client_model_1.Client.findOne({
                where: {
                    id: clientId
                },
                attributes: ['pricePerHour']
            });
        }
        if (totalMinutes >= includedMinutes) {
            body.price = client.pricePerHour * (taskTime / 60);
        }
        else if (totalMinutes + taskTime > includedMinutes) {
            const leftOverTime = includedMinutes - totalMinutes;
            const billableMinutes = taskTime - leftOverTime;
            body.price = client.pricePerHour * (billableMinutes / 60);
        }
        const task = new Task_model_1.Task(body);
        await task.save();
        return task;
    }
}
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map