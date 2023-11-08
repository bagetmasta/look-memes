import React, { useState } from "react";
import Head from "next/head";
import CategoryList from "../components/categories/category-list";
import Header from "../components/header/header";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (search) => {
    setSearchTerm(search.toLowerCase());
  };

  return (
    <>
      <Head>
        <title>Look Memes</title>
        <meta name="description" content="" />
      </Head>
      <Header onSearchChange={handleSearchChange} />
      <main>
        <CategoryList searchTerm={searchTerm} />
      </main>
    </>
  );
}
