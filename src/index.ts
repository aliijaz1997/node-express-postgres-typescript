import express from "express";
import { pool } from "./queries";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { requireAuth } from "./requireauth";

const app = express();
const port = 5000;
app.use(express.json());
dotenv.config();

app.use(
  cookieSession({
    signed: false,
  })
);

app.get("/api/posts", async (req, res) => {
  const posts = await pool.query("SELECT * FROM post");
  res.json(posts.rows);
});

app.post("/api/posts/", requireAuth, async (req, res) => {
  const body = req.body;
  console.log(body);
  console.log(req.user);

  //   if (!body?.id || !body?.description || !body?.users_id || !body?.image)
  //     return res.status(400).send();
  //   const newPost = await pool.query(
  //     `INSERT INTO post (id,description,users_id,created0n,image,updatedon) VALUES ($4, $1, $2, '2016-2-2 00:00',$3, '2016-2-2 00:00')
  //  `,
  //     [body.description, body.user_id, body.image, body.id]
  //   );
  return res.status(201);
  // .send(newPost);
});

app.get("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await pool.query("SELECT * FROM post WHERE id=$1", [id]);
  res.json(post.rows[0]);
});

app.post("/api/auth/signup", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    if (!body?.username || !body?.fullname || !body?.password || !body?.email)
      return res.status(400).send();
    const isValid = await pool.query("select * from users where email = $1", [
      body.email,
    ]);
    if (isValid.rowCount > 0) return res.status(400).send("User already exist");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    const user = await pool.query(
      "insert into users (username,fullname,email,password) values($1, $2, $3, $4) returning id, username",
      [body.username, body.fullname, body.email, hashPassword]
    );
    const token = jwt.sign(
      { id: user.rows[0].id, username: user.rows[0].username },
      process.env.JWT_TOKEN!
    );
    req.session = { jwt: token };
    return res.status(201).send("User created successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});
app.post("/api/auth/signin", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    if (!body?.password || !body?.email) return res.status(400).send();
    const alreadyUser = await pool.query(
      "select * from users where email = $1",
      [body.email]
    );
    if (!alreadyUser.rows[0]) return res.status(400).send("User not exist");
    const validUser = await bcrypt.compare(
      body.password,
      alreadyUser.rows[0].password
    );
    if (!validUser) return res.status(400).send("Invalid user");
    const token = jwt.sign(
      { id: alreadyUser.rows[0].id, username: alreadyUser.rows[0].username },
      process.env.JWT_TOKEN!
    );
    req.session = { jwt: token };
    return res.send("logged in");
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});
if (!process.env.JWT_TOKEN) {
  process.exit(1);
}
app.post("/api/auth/signout", (req, res) => {
  req.session = null;
  res.status(200).send();
});
app.listen(port, () => {
  console.log("listnning on port 5000...");
});
