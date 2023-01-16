import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../components/Pagination";
import { RecipeCard } from "../components/recipeCard";
import { useForm } from "../hooks/useForm";
import { usePagination } from "../hooks/usePagination";
import styles from "./SearchRecipe.module.css";
import {
  getOrder,
  getRecipes,
  getRecipesByDiet,
  getRecipesByName,
} from "../store/actions/actions";

export const SearchRecipe = () => {
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState([]);

  // const recipes = useSelector((state) => state.recipes);
  const filteredRecipe = useSelector((state) => state.filteredRecipe);
  const {
    prevPage,
    nextPage,
    choosedPage,
    pageNumbers,
    indexOfFirstRecord,
    indexOfLastRecord,
  } = usePagination(filteredRecipe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  const [styleGlutenFree, setStyleGlutenFree] = useState("btn-hover color-3");
  const [styleDairyFree, setStyleDairyFree] = useState("btn-hover color-3");
  const [styleVegan, setStyleVegan] = useState("btn-hover color-3");
  const [styleKetogenic, setStyleKetogenic] = useState("btn-hover color-3");
  const [stylePrimal, setStylePrimal] = useState("btn-hover color-3");
  const [styleLactoVegetarian, setStyleLactoVegetarian] =
    useState("btn-hover color-3");
  const [styleWhole30, setStyleWhole30] = useState("btn-hover color-3");
  const [stylePescatarian, setStylePescatarian] = useState("btn-hover color-3");
  const [styleAscending, setStyleAscending] = useState("btn-hover color-4");
  const [styleDescending, setStyleDescending] = useState("btn-hover color-4");

  const { searchText, onInputChange,onResetForm } = useForm({
    searchText: "",
  });

  const handleSearch = (e) => {
    e.preventDefault(e);
    if (searchText.length === 0) return;
    dispatch(getRecipesByName(searchText));
  onResetForm();
    console.log(filteredRecipe);
  };

  const handleDietType = ({ target }) => {
    const selectedFilters = [...filters];
    const index = filters.findIndex((filter) => filter == target.value);
    if (index >= 0) {
      selectedFilters.splice(index, 1);
      setFilters(selectedFilters);
      dispatch(getRecipesByDiet(selectedFilters));
      return;
    }
    selectedFilters.push(target.value);
    setFilters(selectedFilters);
    dispatch(getRecipesByDiet(selectedFilters));
  };

  const handleOrder = ({ target }) => {
    const selectedOrder = [...order];
    const index = selectedOrder.findIndex((element) => element == target.value);
    if (index >= 0) {
      selectedOrder.splice(index, 1);
      setOrder(selectedOrder);
      dispatch(getOrder(selectedOrder));
      dispatch(getRecipesByDiet(filters));
      return;
    }
    selectedOrder.shift();
    selectedOrder.push(target.value);
    setOrder(selectedOrder);
    dispatch(getOrder(selectedOrder));
    dispatch(getRecipesByDiet(filters));
  };

  const currentRecords = useMemo(() => {
    return filteredRecipe.slice(indexOfFirstRecord, indexOfLastRecord);
  }, [choosedPage, handleDietType]);

  const changeStyle = ({ target }) => {
    if (eval(`${`style${target.name}`}`) === "btn-hover color-3") {
      eval(`${`setStyle${target.name}`}`)("btn-hover color-0");
    } else {
      eval(`${`setStyle${target.name}`}`)("btn-hover color-3");
    }
  };

  const changeStyleOrder = ({ target }) => {
    if (target.name === "Ascending") {
      if (eval(`${`style${target.name}`}`) === "btn-hover color-4") {
        eval(`${`setStyle${target.name}`}`)("btn-hover color-1");
        setStyleDescending("btn-hover color-4");
      } else {
        eval(`${`setStyle${target.name}`}`)("btn-hover color-4");
        setStyleDescending("btn-hover color-4");
      }
    }
    if (target.name === "Descending") {
      if (eval(`${`style${target.name}`}`) === "btn-hover color-4") {
        eval(`${`setStyle${target.name}`}`)("btn-hover color-1");
        setStyleAscending("btn-hover color-4");
      } else {
        eval(`${`setStyle${target.name}`}`)("btn-hover color-4");
        setStyleAscending("btn-hover color-4");
      }
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className="main-filter">
          <ul className={styles.filter}>
            <button
              className={styleGlutenFree}
              name="GlutenFree"
              value="gluten free"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Gluten Free
            </button>
            <button
              className={styleDairyFree}
              name="DairyFree"
              value="dairy free"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Dairy free
            </button>
            <button
              className={styleVegan}
              name="Vegan"
              value="vegan"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Vegan
            </button>
            <button
              className={styleKetogenic}
              name="Ketogenic"
              value="ketogenic"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Ketogenic
            </button>
            <button
              className={stylePrimal}
              name="Primal"
              value="primal"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Primal
            </button>
            <button
              className={styleLactoVegetarian}
              name="LactoVegetarian"
              value="lacto ovo vegetarian"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Lacto-Vegetarian
            </button>
            <button
              className={styleWhole30}
              name="Whole30"
              value="whole 30"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Whole-30
            </button>
            <button
              className={stylePescatarian}
              name="Pescatarian"
              value="pescatarian"
              onClick={(e) => {
                handleDietType(e);
                changeStyle(e);
              }}
            >
              Pescatarian
            </button>
          </ul>
        </div>

        <div className={styles.secondBar}>
          <div className="barContainer">
            <form className={styles.innerContainer} onSubmit={handleSearch}>
              <button className={styles.searchIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#657789"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search a Recipe"
                className={styles.inputContainer}
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={onInputChange}
              />
            </form>
          </div>

          <div className={styles.secondaryButtons}>
            <button
              className={styleAscending}
              name="Ascending"
              value="ascending"
              onClick={(e) => {
                handleOrder(e);
                changeStyleOrder(e);
              }}
            >
              A to Z
            </button>
            <button
              className={styleDescending}
              name="Descending"
              value="descending"
              onClick={(e) => {
                handleOrder(e);
                changeStyleOrder(e);
              }}
            >
              Z TO A
            </button>
          </div>
        </div>
      </div>

      <section class={styles.sectionRecipes}>
        <div class="container center-text">
          <h2 class="heading-secondary">Choose from 5,000+ recipes</h2>
        </div>
        <div className="container grid grid--3-cols margin-bottom-md">
          {currentRecords?.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </section>
      <Pagination
        data={filteredRecipe}
        prevPage={prevPage}
        nextPage={nextPage}
        choosedPage={choosedPage}
        pageNumbers={pageNumbers}
      />
    </>
  );
};
