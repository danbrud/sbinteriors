"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_model_1 = require("./Project.model");
class ProjectsService {
    async getProjects() {
        const projects = await Project_model_1.Project.findAll();
        return projects;
    }
    async getProjectsByClientId(clientId) {
        const projects = await Project_model_1.Project.findAll({ where: { clientId } });
        return projects;
    }
    async createProject(body) {
        try {
            const project = new Project_model_1.Project(body);
            await project.save();
            return project;
        }
        catch (e) {
            return { error: 'Must have a valid client id' };
        }
    }
}
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map