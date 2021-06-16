"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.sign = function (payload) {
        var token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
        return token;
    };
    return Token;
}());
exports.Token = Token;
