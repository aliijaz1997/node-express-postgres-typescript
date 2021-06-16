"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAuth(req, res, next) {
    var _a;
    var token = (_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt;
    if (!token)
        return res.status(401).send("Not Authorized");
    try {
        var jwtPayload = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        req.user = jwtPayload;
        next();
    }
    catch (error) {
        return res.status(400).send("Invalid Token");
    }
}
exports.requireAuth = requireAuth;
