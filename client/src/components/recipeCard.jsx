
import styles from "./recipeCard.module.css";
import { Link } from "react-router-dom";
import defaultImg from "../images/meals/defaultImgs.jpg";

// const defaultImage = 'https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png'
export const RecipeCard = ({
  title,
  image,
  diets,
  id,
}) => {
  
  return (
    <div className={styles.recipe}>
      {/* <object data={image} type="image/png">
      <img src="https://es.wikipedia.org/wiki/Imagen#/media/Archivo:Image_created_with_a_mobile_phone.png" alt={title}/>
    </object> */}
      <img
        clasName={styles.mealImg}
        src={image !== undefined ? image:defaultImg}
        alt={title}
      />
      <div className={styles.mealCont}>
        <Link className={styles.mealTitle} to={`/recipes/${id}`}>
          {title}
        </Link>

        <ul className="list">
          {diets?.map((element) => (
            <li key={element} class="list-item">
              <svg
                className="list-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e67e22"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{element}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
