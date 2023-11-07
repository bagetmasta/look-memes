import CategoryList from "../components/categories/category-list";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Look Memes</title>
        <meta name="description" content="" />
      </Head>
      <CategoryList />
    </>
  );
}
