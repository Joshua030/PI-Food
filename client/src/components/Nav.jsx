import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./Nav.module.css";
import logoPrincipal from "../images/meals/logo.png";
export const Nav = () => {
  function reloadPage(){ 
    window.location.reload(); 
}
  return (
    <header className={styles.header}>
    <Link   onClick={reloadPage}>
      <img className={styles.logo} src={logoPrincipal} alt="main logo" />
    </Link>

    <nav className="mainNav">
      <ul className={styles.mainNavList}>
        <li>
          <Link
            className={`${styles.mainNavLink} ${styles.navCta}`}
            to="/recipe/create"
          >
           Create Recipe
          </Link>
        </li>
      </ul>
    </nav>
  </header>
  )
}
