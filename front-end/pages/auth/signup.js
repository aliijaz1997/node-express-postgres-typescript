"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
function SignUp() {
    var _a = react_hook_form_1.useForm(), register = _a.register, setValue = _a.setValue, handleSubmit = _a.handleSubmit, errors = _a.formState.errors;
    var onSubmit = handleSubmit(function (data) { return console.log(data); });
    // firstName and lastName will have correct type
    return (
    // <Layout>
    <div style={{
            backgroundImage: "url(" +
                "https://c4.wallpaperflare.com/wallpaper/517/669/110/5bd20237efe12-wallpaper-preview.jpg" +
                ")",
            height: "100vh",
        }} className="flex justify-end">
      <div className="">
        <form className="bg-white mt-16 mr-4 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-900">Username</label>
            <input className="h-8 mt-1 text-center bg-blue-900 border-black" placeholder="Username" {...register("UserName")}/>
            <label className="text-gray-900">Email</label>
            <input placeholder="Email" className="h-8 mt-1 text-center bg-blue-900 border-black" {...register("Email")}/>
            <label className="text-gray-900">Password</label>
            <input placeholder="Password" className="h-8 mt-1 text-center bg-blue-900 border-black" {...register("Password")}/>
            <button className="mt-4 bg-green-600 text-white rounded" type="button" onClick={function () {
            setValue("Email", "luo");
        }}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
    // </Layout>
    );
}
exports.default = SignUp;
