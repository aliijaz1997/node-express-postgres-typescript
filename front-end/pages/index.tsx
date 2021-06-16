import React from "react";
import CreatePost from "../components/createpost";
import Layout from "../components/layout";
import Posts from "../components/posts";
export default function Home() {
  return (
    <Layout>
      <>
        <CreatePost />
        <Posts />
      </>
    </Layout>
  );
}
