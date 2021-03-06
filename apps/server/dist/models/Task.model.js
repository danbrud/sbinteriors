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
exports.Task = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Client_model_1 = require("./Client.model");
const Service_model_1 = require("./Service.model");
let Task = class Task extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Client_model_1.Client),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Task.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Task.prototype, "startTime", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Task.prototype, "endTime", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], Task.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Service_model_1.Service),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Task.prototype, "serviceTypeId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Service_model_1.Service),
    __metadata("design:type", Service_model_1.Service)
], Task.prototype, "serviceType", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Client_model_1.Client),
    __metadata("design:type", Client_model_1.Client)
], Task.prototype, "client", void 0);
Task = __decorate([
    sequelize_typescript_1.Table
], Task);
exports.Task = Task;
//# sourceMappingURL=Task.model.js.map