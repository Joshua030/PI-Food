
import styles from "./Pagination.module.css";

export const Pagination = ({prevPage,pageNumbers,choosedPage,nextPage}) => {
 
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className={styles.arrowIcon}
        onClick={prevPage}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      {pageNumbers.map(pgNumber => 
        <li key={pgNumber}><button  className={styles.btn} onClick={()=>choosedPage(pgNumber)}>{pgNumber}</button></li>
        )}

      {/* <button className={styles.btn}>1</button>
      <button className={styles.btn}>2</button>
      <button className={styles.btn}>3</button>
      <button className={styles.btn}>4</button>
      <button className={styles.btn}>5</button>
      <button className={styles.btn}>6</button>
      <p>...</p>
      <button className={styles.btn}>23</button> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className={styles.arrowIcon}
        onClick={nextPage}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};
