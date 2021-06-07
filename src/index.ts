import express from "express";
import {pool} from "./queries"
const app = express()
const port = 5000
app.use(express.json());


app.get("/api/posts", async(req, res) => {
  const posts=await pool.query('SELECT * FROM post');
  res.json(posts.rows);
});

app.post("/api/posts/", async(req, res) => {
  const body=req.body;
  if(!body?.description || !body?.user_id || !body?.image) 
      return res.status(400);
  const newPost=await pool.query(`INSERT INTO posts(id,description,image,user_id,\
  created_at,updated_at) VALUES(gen_random_uuid(),$1,$2,$3,now(),now())`,[body.description,body.image,body.user_id]);
  if(newPost.rowCount>0)
      return res.status(201);
});




app.listen(port, () => {
    console.log("listnning on port 5000...");
  });