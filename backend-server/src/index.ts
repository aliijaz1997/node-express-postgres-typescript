import express from "express";
import { pool } from "./queries";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { requireAuth } from "./requireauth";
import cors from "cors";

const app = express();
const port = 5000;
app.use(express.json());
dotenv.config();

app.use(
  cookieSession({
    signed: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

app.get("/api/posts", async (req, res) => {
  const posts = await pool.query(
    "SELECT post.id, post.updatedon, post.description, users.fullname, COUNT(post_reaction.reaction_id) as number_of_reactions FROM post LEFT JOIN post_reaction ON post.id = post_reaction.post_id JOIN users ON post.users_id = users.id GROUP BY post.id, post.description, post.updatedon, users.fullname"
  );
  console.log(posts.rows);

  res.json(posts.rows);
});

app.post("/api/posts/", requireAuth, async (req, res) => {
  const body = req.body;
  console.log(body);
  console.log(req.user);

  if (!body?.description) return res.status(400).send("Enter all the data");
  const newPost = await pool.query(
    `INSERT INTO post (description,users_id,updatedon) VALUES ($1, $2, NOW())  RETURNING *
   `,
    [body.description, req.user?.id]
  );

  return res.status(201).send(newPost);
});
app.delete("/api/posts/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const deletedPost = await pool.query("DELETE FROM post WHERE post.id=$1", [
    id,
  ]);
  console.log("Successfully deleted");

  res.json(deletedPost);
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
    if (!body?.password || !body?.email)
      return res.status(400).send("Field is missing");
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
app.post("/comments", async (req, res) => {
  const body = req.body;
  console.log(body.id);

  const postsComments = await pool.query(
    "select users.fullname, coment.description, coment.id from coment LEFT JOIN users ON coment.user_id = users.id WHERE post_id=$1",
    [body.id]
  );
  res.send(postsComments.rows);
});
if (!process.env.JWT_TOKEN) {
  process.exit(1);
}
app.post("/comment", requireAuth, async (req, res) => {
  const body = req.body;
  console.log(body.id);
  const userId = req.user;
  const postsComments = await pool.query(
    "INSERT INTO coment(description, user_id, post_id) VALUES ($1, $2, $3)",
    [body.description, userId?.id, body.postId]
  );
  res.send(postsComments.rows);
});
if (!process.env.JWT_TOKEN) {
  process.exit(1);
}
app.post("/likes", async (req, res) => {
  const body = req.body;
  const postLikes = await pool.query(
    "select u.fullname, r.name from post_reaction left outer join users u on u.id = post_reaction.user_id left join reactions r on post_reaction.reaction_id = r.id WHERE post_id = $1",
    [body.id]
  );
  res.send(postLikes.rows);
});
app.post("/like", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;
  const addLike = await pool.query(
    "insert into post_reaction (user_id, post_id, reaction_id) values ($1, $2, 1)",
    [user?.id, body.postId]
  );
});
app.post("/api/auth/signout", (req, res) => {
  req.session = null;
  res.status(200).send("Logged Out");
});

app.get("/api/auth/current", requireAuth, (req, res) => {
  console.log("got request");

  res.json(req.user);
});
app.listen(port, () => {
  console.log("listnning on port 5000...");
});
