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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var queries_1 = require("./queries");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var requireauth_1 = require("./requireauth");
var app = express_1.default();
var port = 5000;
app.use(express_1.default.json());
dotenv_1.default.config();
app.use(cookie_session_1.default({
    signed: false,
}));
app.get("/api/posts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, queries_1.pool.query("SELECT * FROM post")];
            case 1:
                posts = _a.sent();
                res.json(posts.rows);
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/posts/", requireauth_1.requireAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        body = req.body;
        console.log(body);
        console.log(req.user);
        //   if (!body?.id || !body?.description || !body?.users_id || !body?.image)
        //     return res.status(400).send();
        //   const newPost = await pool.query(
        //     `INSERT INTO post (id,description,users_id,created0n,image,updatedon) VALUES ($4, $1, $2, '2016-2-2 00:00',$3, '2016-2-2 00:00')
        //  `,
        //     [body.description, body.user_id, body.image, body.id]
        //   );
        return [2 /*return*/, res.status(201)];
    });
}); });
app.get("/api/posts/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, queries_1.pool.query("SELECT * FROM post WHERE id=$1", [id])];
            case 1:
                post = _a.sent();
                res.json(post.rows[0]);
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/auth/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, isValid, salt, hashPassword, user, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                console.log(body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!(body === null || body === void 0 ? void 0 : body.username) || !(body === null || body === void 0 ? void 0 : body.fullname) || !(body === null || body === void 0 ? void 0 : body.password) || !(body === null || body === void 0 ? void 0 : body.email))
                    return [2 /*return*/, res.status(400).send()];
                return [4 /*yield*/, queries_1.pool.query("select * from users where email = $1", [
                        body.email,
                    ])];
            case 2:
                isValid = _a.sent();
                if (isValid.rowCount > 0)
                    return [2 /*return*/, res.status(400).send("User already exist")];
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(body.password, salt)];
            case 4:
                hashPassword = _a.sent();
                return [4 /*yield*/, queries_1.pool.query("insert into users (username,fullname,email,password) values($1, $2, $3, $4) returning id, username", [body.username, body.fullname, body.email, hashPassword])];
            case 5:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign({ id: user.rows[0].id, username: user.rows[0].username }, process.env.JWT_TOKEN);
                req.session = { jwt: token };
                return [2 /*return*/, res.status(201).send("User created successfully")];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).send()];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.post("/api/auth/signin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, alreadyUser, validUser, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                console.log(body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!(body === null || body === void 0 ? void 0 : body.password) || !(body === null || body === void 0 ? void 0 : body.email))
                    return [2 /*return*/, res.status(400).send()];
                return [4 /*yield*/, queries_1.pool.query("select * from users where email = $1", [body.email])];
            case 2:
                alreadyUser = _a.sent();
                if (!alreadyUser.rows[0])
                    return [2 /*return*/, res.status(400).send("User not exist")];
                return [4 /*yield*/, bcrypt_1.default.compare(body.password, alreadyUser.rows[0].password)];
            case 3:
                validUser = _a.sent();
                if (!validUser)
                    return [2 /*return*/, res.status(400).send("Invalid user")];
                token = jsonwebtoken_1.default.sign({ id: alreadyUser.rows[0].id, username: alreadyUser.rows[0].username }, process.env.JWT_TOKEN);
                req.session = { jwt: token };
                return [2 /*return*/, res.send("logged in")];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).send()];
            case 5: return [2 /*return*/];
        }
    });
}); });
if (!process.env.JWT_TOKEN) {
    process.exit(1);
}
app.post("/api/auth/signout", function (req, res) {
    req.session = null;
    res.status(200).send();
});
app.listen(port, function () {
    console.log("listnning on port 5000...");
});
