import styles from "../../styles/Home.module.css";
import Link from "next/link";

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  const paths = data.map((data) => {
    return {
      params: { id: data.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  console.log(context);
  const id = context.params.id;
  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const data = await res.json();

  return {
    props: { dataProps: data },
  };
};

const Details = ({ dataProps }) => {
  return (
    <div>
      <h1>{dataProps.name}</h1>
      <Link href="/">Go to Home</Link>
    </div>
  );
};

export default Details;
