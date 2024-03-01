"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const projectRoute_1 = __importDefault(require("./router/projectRoute"));
const taskRoute_1 = __importDefault(require("./router/taskRoute"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const mainApp = (app) => {
    try {
        app.use("/api/v1", userRouter_1.default);
        app.use("/api/v1", projectRoute_1.default);
        app.use("/api/v1", taskRoute_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Entry to my server is Successfull",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error",
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mainApp = mainApp;
