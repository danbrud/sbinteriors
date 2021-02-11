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
exports.BalanceTransfer = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Client_model_1 = require("./Client.model");
let BalanceTransfer = class BalanceTransfer extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Client_model_1.Client),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BalanceTransfer.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BalanceTransfer.prototype, "fromAccount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BalanceTransfer.prototype, "toAccount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], BalanceTransfer.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], BalanceTransfer.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Client_model_1.Client),
    __metadata("design:type", Client_model_1.Client)
], BalanceTransfer.prototype, "client", void 0);
BalanceTransfer = __decorate([
    sequelize_typescript_1.Table
], BalanceTransfer);
exports.BalanceTransfer = BalanceTransfer;
//# sourceMappingURL=BalanceTransfer.model.js.map