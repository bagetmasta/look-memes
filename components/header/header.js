import React, { useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";

function Header({ onSearchChange }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(search.trim());
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <a className={styles.logo}>
          <Image
            className={styles.logo__svg}
            src={"/images/look.svg"}
            width={78}
            height={30}
            alt="logo"
          />
          <p className={styles.logo__text}>Memes</p>
        </a>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <Image
              className={styles.search__button}
              src="/images/search.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
