import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentsDisplay from "../../components/commentsDisplay";
import LikesDisplay from "../../components/likesdisplay";
import CreateComment from "../../components/createcomments";
import { FormData } from "../../components/createcomments";
export interface Comment {
  id: number;
  description: string;
  fullname: string;
}
export interface Likes {
  fullname: string;
  name: string;
}
const Details = () => {
  const router = useRouter();
  const postIdFromUrl = router.query;
  const [postsComments, setPostComments] = useState<Comment[]>();
  const [postLikes, setPostLikes] = useState<Likes[]>();
  console.log(postIdFromUrl);
  useEffect(() => {
    axios
      .post("http://localhost:5000/comments", {
        id: postIdFromUrl.id,
      })
      .then((res) => setPostComments(res.data));
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:5000/likes", {
        id: postIdFromUrl.id,
      })
      .then((res) => setPostLikes(res.data));
  }, []);
  console.log(postLikes);
  async function HandleSubmit(
    data: FormData,
    reset: ({ Description }: any) => void
  ) {
    console.log(data);
    try {
      await axios.post(
        "http://localhost:5000/comment/",
        { description: data.Description, postId: postIdFromUrl.id },
        { withCredentials: true }
      );
      reset({ Description: "" });
      await axios
        .post("http://localhost:5000/comments", {
          id: postIdFromUrl.id,
        })
        .then((res) => setPostComments(res.data));
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <div>
      <p className="font-bold text-3xl text-center text-green-700">Comments</p>
      <CreateComment HandleSubmit={HandleSubmit} />
      <div>
        {postsComments?.map((data: Comment) => (
          <CommentsDisplay
            id={data.id}
            fullname={data.fullname}
            description={data.description}
          />
        ))}
      </div>
      <hr className="mt-5 border-b-8 " />
      <p className="font-bold text-3xl text-center text-red-400 mt-8">Likes</p>
      <div>
        {postLikes?.map((data: Likes) => (
          <LikesDisplay fullname={data.fullname} name={data.name} />
        ))}
      </div>
    </div>
  );
};

export default Details;
