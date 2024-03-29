"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.route("/get-one-user/:userID").get(userController_1.getOneUser);
router.route("/get").get(userController_1.getUser);
router.route("/sign-up").post(userController_1.createUser);
router.route("/sign-in-user").post(userController_1.signIn);
router.route("/verify-user").patch(userController_1.VerifyUser);
router.route("/update-user/:userID").patch(userController_1.updateOneUser);
exports.default = router;
