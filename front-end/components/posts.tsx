import axios from "axios";
import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
export interface Post {
  id: number;
  updatedon: string;
  description: string;
  fullname: string;
  number_of_reactions: number;
}
interface PostsProps {
  handleDelete(id: number): void;
  handleLike(postId: number): void;
  Data: Post[];
}
function Posts({ handleDelete, Data, handleLike }: PostsProps) {
  return (
    <div>
      {Data?.map((data: Post, index: number) => {
        return (
          <PostStructure
            handleDelete={handleDelete}
            data={data}
            key={index}
            handleLike={handleLike}
          />
        );
      })}
    </div>
  );
}

export default Posts;
interface PostStructureProps {
  data: Post;
  handleDelete(id: number): void;
  handleLike(postId: number): void;
}
function PostStructure({ data, handleDelete, handleLike }: PostStructureProps) {
  return (
    <div className="flex justify-center">
      <div className="max-w-md py-4 px-8 bg-gray-200 shadow-lg rounded-lg my-20">
        <div className="flex justify-center md:justify-end -mt-16">
          <img
            className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          />
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">
            From {data.fullname}
          </h2>
          <p className="mt-2 text-gray-600">{data.description}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              handleLike(data.id);
            }}
            className="text-xl font-medium text-blue-800"
          >
            {data.number_of_reactions} Likes
          </button>
          <Link href={"/details/" + data.id} key={data.id}>
            <button className="text-xl font-medium text-purple-500">
              Details of Post
            </button>
          </Link>
          <button
            onClick={() => {
              handleDelete(data.id);
            }}
            className="text-xl font-medium text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
