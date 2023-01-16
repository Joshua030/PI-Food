import styles from "./Home.module.css";
import customer1 from "../images/customers/customer-1.jpg";
import customer2 from "../images/customers/customer-2.jpg";
import customer3 from "../images/customers/customer-3.jpg";
import customer4 from "../images/customers/customer-4.jpg";
import customer5 from "../images/customers/customer-5.jpg";
import customer6 from "../images/customers/customer-6.jpg";
import heroImage from "../images/meals/hero.png";
import businessInsider from "../images/logos/business-insider.png";
import forbes from "../images/logos/forbes.png";
import techcrunch from "../images/logos/techcrunch.png";
import newYorkTimes from "../images/logos/the-new-york-times.png";
import usaToday from "../images/logos/usa-today.png";
import logoPrincipal from "../images/meals/logo.png";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/search">
          <img className={styles.logo} src={logoPrincipal} alt="main logo" />
        </Link>

        <nav className="mainNav">
          <ul className={styles.mainNavList}>
            <li>
              <Link
                className={`${styles.mainNavLink} ${styles.navCta}`}
                to="/search"
              >
                Try for free
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className={styles.sectionHero}>
        <div className={styles.hero}>
          <div className="hero-text-box">
            <h1 className="heading-primary">
              A healthy meal to prepare, every single day
            </h1>
            <p className={styles.heroDescription}>
              The smart Recipe web that will make you eat healthy again.
              Tailored to your personal tastes and nutritional needs.
            </p>
            <Link to="/search" className="btn btn--full margin-right-sm">
              Start eating well
            </Link>
            <div className={styles.deliveredMeals}>
              <div className={styles.deliveredImgs}>
                <img src={customer1} alt="Customer1 Photo" />
                <img src={customer2} alt="Customer2 Photo" />
                <img src={customer3} alt="Customer3 Photo" />
                <img src={customer4} alt="Customer4 Photo" />
                <img src={customer5} alt="Customer5 Photo" />
                <img src={customer6} alt="Customer6 Photo" />
              </div>
              <p className={styles.deliveredText}>
                <span>250,000+</span> recipes added last year!
              </p>
            </div>
          </div>
          <div className="hero-imag-box">
            <img
              src={heroImage}
              className={styles.heroImg}
              alt="Woman enjoying food"
            />
          </div>
        </div>
      </section>
      <section className={styles.sectionFeatured}>
        <div className="container">
          <h2 className={styles.headingFeaturedIn}>As featured in</h2>
          <div className={styles.logos}>
            <img src={techcrunch} alt="techcrunch logo" />
            <img src={businessInsider} alt="Bussiness Insider logo" />
            <img src={newYorkTimes} alt="The new york times logo" />
            <img src={forbes} alt="forbes logo" />
            <img src={usaToday} alt="USA Today logo" />
            <img src={'https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png'} alt="Henry logo" />
          </div>
        </div>
      </section>
    </>
  );
};
