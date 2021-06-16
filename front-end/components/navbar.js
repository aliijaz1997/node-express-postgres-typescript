"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
require("../styles/Home.module.css");
var Navbar = function () {
    return (<nav className=" bg-blue-700 p-3">
      <div className="flex justify-between text-white mr-6">
        <div className="font-bold text-xl">FaceBook</div>
        <div className="flex">
          <link_1.default href="/">
            <button className="mr-1 bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              Home
            </button>
          </link_1.default>
          <br />
          <link_1.default href="/auth/signin">
            <button className="mr-1  bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              SignIn
            </button>
          </link_1.default>
          <br />
          <link_1.default href="/auth/signup">
            <button className="mr-1  bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              SignUp
            </button>
          </link_1.default>
          <br />
          <link_1.default href="/">
            <button className="mr-1  bg-red-600 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              SignOut
            </button>
          </link_1.default>
        </div>
      </div>
    </nav>);
};
exports.default = Navbar;
