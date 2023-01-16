import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { replaceWithBr } from "../helpers/replaceWithBr";
import { getRecipesByParams } from "../store/actions/actions";
import defaultImg from "../images/meals/defaultImgs.jpg";
import styles from "./DetailRecipe.module.css";

export const DetailRecipe = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const filteredByParams = useSelector((state) => state.filteredByParams);
  useEffect(() => {
    dispatch(getRecipesByParams(recipeId));
  }, [recipeId]);
  const {
    title = "",
    image = defaultImg,
    summary = "",
    healthScore = "",
    diets = [],
    analyzedInstructions = [[]],
  } = filteredByParams[0];
  const { steps } = analyzedInstructions[0];
  console.log(filteredByParams);

  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>
        <h2 className={styles.headerTitle}>{title}</h2>
        <Link to="/search">
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="78"
            height="78"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e67e22"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="bevel"
          >
            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
          </svg>
        </Link>
      </div>

      <div className={styles.headerContainer}>
        <img src={image} alt={title} className={styles.imageDetail} />
        <div className="mainInformation">
          <h3 className={styles.subHeadingD}>Diets</h3>
          <ul className={styles.list}>
            {diets?.map((element) => (
              <li key={element} className={styles.listItem}>
                <svg
                  className={styles.listIcon}
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
      <h3 className={`${styles.subHeading} margin-left-at`}>Summary</h3>
      <p
        className={styles.summaryDescription}
        dangerouslySetInnerHTML={{ __html: replaceWithBr(summary) }}
      />
      <h3 className={`${styles.subHeading} margin-right-at`}>Instructions</h3>
      <ul className={styles.steps}>
        {steps?.map((item, index) => (
          <li key={index} className={styles.stepItem}>
            <span><strong style={{ color: '#e67e22'}}>&#10033;</strong> {item.step}</span>
          </li>
        ))}
      </ul>
      {/* {Object.keys(filteredByParams[0]).length > 0 && (
            <div>
            <h2>{filteredByParams[0]['title']}</h2>
                <img src={filteredByParams[0]['image']} alt={filteredByParams[0]['title']} />
                <p dangerouslySetInnerHTML={{__html: replaceWithBr(filteredByParams)}} />
                
                <h3>{filteredByParams[0]['healthScore']}</h3>
                <h3>{filteredByParams[0]['diets']?.map(element=>
                 <li key={element}>{element}</li>  
                  )}</h3> 
                   <h3>{filteredByParams[0]['analyzedInstructions'][0]?.steps.map((item, index)=>
                 <li key={index}>{item.step}</li> 
                  )}</h3>
            </div>
)} */}
      <div className={styles.subtitleDescription}>
        <svg
        className={styles.finalIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e67e22"
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="arcs"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <h3>
          <span>
            HealthScore &reg;<strong> {healthScore}</strong>
          </span>
        </h3>
      </div>
    </div>
  );
};
