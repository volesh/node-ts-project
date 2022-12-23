"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./userRouter");
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
apiRouter.use('/users', userRouter_1.userRouter);
//# sourceMappingURL=apiRouter.js.map