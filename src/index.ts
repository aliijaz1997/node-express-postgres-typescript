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
  console.log(body);
  
  if(!body?.id || !body?.description || !body?.users_id || !body?.image) 
      return res.status(400).send();
  const newPost=await pool.query(`INSERT INTO post (id,description,users_id,created0n,image,updatedon) VALUES ($4, $1, $2, '2016-2-2 00:00',$3, '2016-2-2 00:00')
 `,[body.description,body.user_id,body.image, body.id]);
      return res.status(201).send(newPost);
});




app.listen(port, () => {
    console.log("listnning on port 5000...");
  });