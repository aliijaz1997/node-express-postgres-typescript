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
  
  if(!body?.description || !body?.user_id || !body?.image) 
      return res.status(400);
  const newPost=await pool.query(`INSERT INTO post (id,description,users_id,created0n,image,updatedon) VALUES ($4, $1, $2, '2016-2-2 00:00',$3, '2016-2-2 00:00')
 `,[body.description,body.user_id,body.image, body.id]);
  if(newPost.rowCount>0)
      return res.status(201);
});




app.listen(port, () => {
    console.log("listnning on port 5000...");
  });