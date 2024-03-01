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
exports.updateOneUser = exports.getUser = exports.getOneUser = exports.VerifyUser = exports.signIn = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const user = yield userModel_1.default.create({
            username,
            email,
            password: hashed,
            verificationToken: token,
            avatar: username.charAt(0),
        });
        return res.status(201).json({
            message: "user created",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.createUser = createUser;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getUser = yield userModel_1.default.findOne({ email });
        if (getUser) {
            const passChecker = yield bcrypt_1.default.compare(password, getUser.password);
            if (passChecker) {
                if (getUser.verified && getUser.verificationToken === "") {
                    const webToken = jsonwebtoken_1.default.sign({ id: getUser._id }, "justAlock", {
                        expiresIn: "2d",
                    });
                    return res.status(201).json({
                        message: "User has been sign in successfully",
                        data: webToken,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Account hasn't been verified please verify",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "please check your password",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Please check your email correctly",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.signIn = signIn;
const VerifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, email } = req.body;
        const getWithEmail = yield userModel_1.default.findOne({ email });
        const getWithToken = yield userModel_1.default.findOne({ verificationToken: token });
        if (getWithEmail && getWithToken) {
            yield userModel_1.default.findByIdAndUpdate(getWithEmail._id, {
                verificationToken: "",
                verified: true,
            }, { new: true });
            return res.status(201).json({
                message: "User is been verified..👍 you can now sign_in",
            });
        }
        else {
            return res.status(404).json({
                message: "something wrong when verifing..😒",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.VerifyUser = VerifyUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const get = yield userModel_1.default.findById(userID);
        return res.status(201).json({
            message: "User found",
            data: get,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.getOneUser = getOneUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield userModel_1.default.find();
        return res.status(201).json({
            message: "User found",
            data: get,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error",
        });
    }
});
exports.getUser = getUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { username } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(userID, { username }, { new: true });
        return res.status(201).json({
            message: "user data",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateOneUser = updateOneUser;
