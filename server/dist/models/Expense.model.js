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
const sequelize_typescript_1 = require("sequelize-typescript");
const Project_model_1 = require("./Project.model");
let Expense = class Expense extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Project_model_1.Project),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Expense.prototype, "projectId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Expense.prototype, "paymentMethod", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Expense.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Expense.prototype, "isPaid", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], Expense.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Project_model_1.Project),
    __metadata("design:type", Project_model_1.Project)
], Expense.prototype, "project", void 0);
Expense = __decorate([
    sequelize_typescript_1.Table
], Expense);
exports.Expense = Expense;
//# sourceMappingURL=Expense.model.js.map