"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.AssignTask = exports.updateProject = exports.getProject = exports.getProjectById = exports.createProject = void 0;
const projectModel_1 = __importDefault(require("../model/projectModel"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectName } = req.body;
        const createproject = yield projectModel_1.default.create({
            projectName,
            avatar: projectName.charAt(0),
        });
        console.log(createproject);
        res.status(201).json({
            message: "Project created",
            data: createproject,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.createProject = createProject;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const find = yield projectModel_1.default.findById(projectID);
        return res.status(200).json({
            message: "project found",
            data: find,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.getProjectById = getProjectById;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield projectModel_1.default.find();
        return res.status(200).json({
            message: "project found",
            data: find,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.getProject = getProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const { projectName } = req.body;
        const existingProject = yield projectModel_1.default.findById(projectID);
        if (!existingProject) {
            return res.status(404).json({
                message: "Project not found",
            });
        }
        const result = yield projectModel_1.default.findOneAndUpdate({ _id: projectID }, { projectName });
        if (result) {
            res.status(200).json({
                message: "Project updated",
                data: result,
            });
        }
        else {
            return res.status(404).json({
                message: "Error updating user",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "Error updating project",
            error: error.message,
        });
    }
});
exports.updateProject = updateProject;
const AssignTask = (req, res) => {
    try {
    }
    catch (error) { }
};
exports.AssignTask = AssignTask;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const deleted = yield projectModel_1.default.findByIdAndDelete(projectID);
        return res.status(201).json({
            message: "Project deleted",
            data: deleted,
        });
    }
    catch (error) {
        return error;
    }
});
exports.deleteProject = deleteProject;
