import axios from "axios";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/createpost";
import Posts from "../components/posts";
import { Post } from "../components/posts";
import { FormData } from "../components/createpost";

export default function Home() {
  const [postdata, setPostdata] = useState<Post[]>();
  console.log(postdata);

  useEffect(() => {
    const data = axios.get<Post[]>("http://localhost:5000/api/posts");
    const result = data.then((res) => {
      setPostdata(res.data);
    });
  }, []);
  async function HandleSubmit(
    data: FormData,
    reset: ({ Description }: any) => void
  ) {
    console.log(data);
    try {
      await axios.post(
        "http://localhost:5000/api/posts/",
        { description: data.Description },
        { withCredentials: true }
      );
      reset({ Description: "" });
      await axios.get<Post[]>("http://localhost:5000/api/posts").then((res) => {
        setPostdata(res.data);
      });
    } catch (error) {
      console.log(error.response);
    }
  }
  const handleDelete = async (id: number) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/posts/${id}`
    );
    await axios.get<Post[]>("http://localhost:5000/api/posts").then((res) => {
      setPostdata(res.data);
    });
  };
  return (
    <>
      <CreatePost HandleSubmit={HandleSubmit} />
      <Posts handleDelete={handleDelete} Data={postdata!} />
    </>
  );
}
