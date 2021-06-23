import axios from "axios";
import React, { useEffect, useState } from "react";
import CreatePost from "../components/createpost";
import Posts from "../components/posts";
import { Post } from "../components/posts";
import { FormData } from "../components/createpost";
import { baseUrl } from "../BaseURL/baseurl";

export default function Home() {
  const [postdata, setPostdata] = useState<Post[]>();
  console.log(postdata);
  const [like, setLike] = useState(true);
  const handleLike = (postId: number) => {
    if (like === true) {
      setLike(false);
      try {
        axios.post(
          `${baseUrl}/like`,
          {
            postId: postId,
          },
          {
            withCredentials: true,
          }
        );
        axios.get<Post[]>(`${baseUrl}/api/posts`).then((res) => {
          setPostdata(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setLike(true);
    }
  };
  console.log(like);
  useEffect(() => {
    const data = axios.get<Post[]>(`${baseUrl}/api/posts`);
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
        `${baseUrl}/api/posts/`,
        { description: data.Description },
        { withCredentials: true }
      );
      reset({ Description: "" });
      await axios.get<Post[]>(`${baseUrl}/api/posts`).then((res) => {
        setPostdata(res.data);
      });
    } catch (error) {
      console.log(error.response);
    }
  }
  const handleDelete = async (id: number) => {
    const { data } = await axios.delete(`${baseUrl}/api/posts/${id}`);
    await axios.get<Post[]>(`${baseUrl}/api/posts`).then((res) => {
      setPostdata(res.data);
    });
  };

  return (
    <>
      <CreatePost HandleSubmit={HandleSubmit} />
      <Posts
        handleDelete={handleDelete}
        Data={postdata!}
        handleLike={handleLike}
      />
    </>
  );
}
