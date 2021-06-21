import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentsDisplay from "../../components/commentsDisplay";
import LikesDisplay from "../../components/likesdisplay";
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

  return (
    <div>
      <p className="font-bold text-3xl text-center text-green-700">Comments</p>
      <div>
        {postsComments?.map((data: Comment) => (
          <CommentsDisplay
            id={data.id}
            fullname={data.fullname}
            description={data.description}
          />
        ))}
      </div>
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
