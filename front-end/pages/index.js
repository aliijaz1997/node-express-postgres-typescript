"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var createpost_1 = __importDefault(require("../components/createpost"));
var layout_1 = __importDefault(require("../components/layout"));
var posts_1 = __importDefault(require("../components/posts"));
function Home() {
    return (<layout_1.default>
      <>
        <createpost_1.default />
        <posts_1.default />
      </>
    </layout_1.default>);
}
exports.default = Home;
