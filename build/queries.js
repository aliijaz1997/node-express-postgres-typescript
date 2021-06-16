"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'test1',
    port: 5432,
    database: 'facbook'
});
