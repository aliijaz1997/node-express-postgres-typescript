import {Pool} from 'pg';

export const pool=new Pool({
    host:'localhost',
    user:'postgres',
    password:'test1',
    port:5432,
    database:'facbook'
})