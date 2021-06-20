import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Layout from "../components/layout";
import axios from "axios";
import { useReducer } from "react";

interface MyCustomAppProps extends AppProps {
  currentUser: { id: string; username: string; iat: number };
}

function MyApp({ Component, pageProps, currentUser }: MyCustomAppProps) {
  return (
    <Layout currentUser={currentUser}>
      <>
        <Component {...pageProps} />
      </>
    </Layout>
  );
}

export default MyApp;

MyApp.getInitialProps = async (context: AppContext) => {
  console.log(context.ctx.req?.headers);
  console.log("lllllllllllll");

  function isNextJsServerSide() {
    return typeof window === "undefined";
  }
  let currentUser = null;
  try {
    if (isNextJsServerSide()) {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/current",
        {
          headers: context.ctx.req?.headers,
        }
      );
      console.log(data);

      currentUser = data;
    } else {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/current",
        {
          withCredentials: true,
        }
      );
      console.log(data);

      currentUser = data;
    }
  } catch (error) {
    console.error(error?.response?.data);
  }

  return {
    currentUser: currentUser,
  };
};
