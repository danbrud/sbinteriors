"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Client_model_1 = require("../models/Client.model");
const Task_model_1 = require("../models/Task.model");
const Expense_model_1 = require("../models/Expense.model");
let Project = class Project extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Client_model_1.Client),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Project.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Project.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Project.prototype, "city", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Project.prototype, "isComplete", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Task_model_1.Task),
    __metadata("design:type", Array)
], Project.prototype, "tasks", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Expense_model_1.Expense),
    __metadata("design:type", Array)
], Project.prototype, "expenses", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Client_model_1.Client),
    __metadata("design:type", Client_model_1.Client)
], Project.prototype, "client", void 0);
Project = __decorate([
    sequelize_typescript_1.Table
], Project);
exports.Project = Project;
//# sourceMappingURL=Project.model.js.map