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
exports.Client = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Transfer_model_1 = require("./Transfer.model");
const Task_model_1 = require("./Task.model");
const Expense_model_1 = require("./Expense.model");
const Service_model_1 = require("./Service.model");
const Contract_model_1 = require("./Contract.model");
let Client = class Client extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "spouseName", void 0);
__decorate([
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "city", void 0);
__decorate([
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], Client.prototype, "pricePerHour", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Client.prototype, "isComplete", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Transfer_model_1.Transfer),
    __metadata("design:type", Array)
], Client.prototype, "transfers", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Task_model_1.Task),
    __metadata("design:type", Array)
], Client.prototype, "tasks", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Expense_model_1.Expense),
    __metadata("design:type", Array)
], Client.prototype, "expenses", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Service_model_1.Service, () => Contract_model_1.Contract),
    __metadata("design:type", Array)
], Client.prototype, "services", void 0);
Client = __decorate([
    sequelize_typescript_1.Table
], Client);
exports.Client = Client;
//# sourceMappingURL=Client.model.js.map