"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_service_1 = require("../not-used/projects.service");
class ProjectsController {
    constructor() {
        this.projectsService = new projects_service_1.ProjectsService();
        this.path = 'projects';
        this.router = express_1.default.Router();
        this.getProjects = async (req, res) => {
            const projects = await this.projectsService.getProjects();
            res.send(projects);
        };
        this.getProjectsByClientId = async (req, res) => {
            const { clientId } = req.params;
            const projects = await this.projectsService.getProjectsByClientId(clientId);
            res.send(projects);
        };
        this.createProject = async (req, res) => {
            const project = await this.projectsService.createProject(req.body);
            res.send(project);
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/', this.getProjects);
        this.router.get('/:clientId', this.getProjectsByClientId);
        this.router.post('/', this.createProject);
    }
}
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map