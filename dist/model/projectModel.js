"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    projectName: { type: String },
    createdAt: { type: Date, default: Date.now },
    avatar: { type: String },
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Task" }],
});
exports.default = (0, mongoose_1.model)("projecttask", projectSchema);
