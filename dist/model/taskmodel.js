"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deadline: { type: Date },
    status: { type: String, default: "Open" },
    project: { type: mongoose_1.Schema.Types.ObjectId, ref: "Projects" },
});
exports.default = (0, mongoose_1.model)("taskproject", taskSchema);
