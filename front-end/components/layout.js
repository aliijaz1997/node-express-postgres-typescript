"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var footer_1 = __importDefault(require("./footer"));
var navbar_1 = __importDefault(require("./navbar"));
var Layout = function (_a) {
    var children = _a.children;
    return (<div className="content">
      <navbar_1.default />
      {children}
      <footer_1.default />
    </div>);
};
exports.default = Layout;
