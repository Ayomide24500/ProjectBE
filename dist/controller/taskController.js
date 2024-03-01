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
exports.deleteTask = exports.updateTask = exports.getTasksById = exports.getTasks = exports.createTask = void 0;
const taskmodel_1 = __importDefault(require("../model/taskmodel"));
const mongoose_1 = require("mongoose");
const projectModel_1 = __importDefault(require("../model/projectModel"));
// Create Task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const { name, description } = req.body;
        const find = yield projectModel_1.default.findById(projectID);
        const project = yield taskmodel_1.default.create({
            name,
            description,
        });
        find === null || find === void 0 ? void 0 : find.tasks.push(new mongoose_1.Types.ObjectId(project._id));
        find === null || find === void 0 ? void 0 : find.save();
        res.status(201).json({
            message: "Task created",
            data: project,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Error creating task",
            error: error.message,
        });
    }
});
exports.createTask = createTask;
// Get Tasks
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskmodel_1.default.find();
        res.status(200).json({
            message: "Tasks retrieved",
            data: tasks,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error getting tasks",
            error: error.message,
        });
    }
});
exports.getTasks = getTasks;
const getTasksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const find = yield taskmodel_1.default.findById(taskId);
        res.status(200).json({
            message: "Tasks retrieved",
            data: find,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error getting tasks",
            error: error.message,
        });
    }
});
exports.getTasksById = getTasksById;
// Update Task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const updatedData = req.body;
        const updatedTask = yield taskmodel_1.default.findByIdAndUpdate(taskId, updatedData, {
            new: true,
        });
        res.status(200).json({
            message: "Task updated",
            data: updatedTask,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error updating task",
            error: error.message,
        });
    }
});
exports.updateTask = updateTask;
// Delete Task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const deletedTask = yield taskmodel_1.default.findOneAndDelete({ _id: taskId });
        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json({
            message: "Task deleted",
            data: deletedTask,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message,
        });
    }
});
exports.deleteTask = deleteTask;
