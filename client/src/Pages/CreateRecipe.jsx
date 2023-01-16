import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TodoAdd } from "../components/TodoAdd";
import { TodoList } from "../components/TodoList";
import { useForm } from "../hooks/useForm";
import { useTodo } from "../hooks/useTodo";
import { createRecipe, getDiets } from "../store/actions/actions";
import styles from "./CreateRecipe.module.css";

export const CreateRecipe = () => {
  const [dietsFiltered, setDietsFiltered] = useState([]);
  const dietsBack = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const { handleNewTodo, handleDeleteTodo, todos } = useTodo();
  useEffect(() => {
    dispatch(getDiets());
  }, []);



  const { title, summary, healthScore, onInputChange } = useForm({
    title: "",
    summary: "",
  });

  const handleCreation = (e) => {
    e.preventDefault(e);
    dispatch(
      createRecipe({ title, summary, healthScore, dietsFiltered, todos })
    );
  };

  const handleCheck = ({ target }) => {
    let updatedList = [...dietsFiltered];
    const { checked, value } = target;
    if (checked) {
      updatedList = [...dietsFiltered, { ["name"]: value }];
    } else {
      updatedList.splice(dietsFiltered.indexOf(value), 1);
    }
    setDietsFiltered(updatedList);
  };

  return (
    <div className="container margin-top-lg">
      <div className={styles.mainInformation}>
        <div className={styles.textBox}>
          <h2 className={styles.primaryHeading}>
            Let us know your delicious recipes
          </h2>
          <form className="cta-form" onSubmit={handleCreation}>
            <div className={styles.PrincipalInformation}>
              <div className="column-width-md">
                <label for="formTitle">Recipe Name</label>
                <input
                  type="text"
                  placeholder="Recipe Name"
                  className="form-control"
                  id="formTitle"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={onInputChange}
                />
              </div>
              <div className="column-width-md">
                <label for="formHealthScore">HealthScore</label>
                <input
                  type="number"
                  placeholder="Number between 0-100"
                  className="form-control"
                  id="formHealthScore"
                  name="healthScore"
                  autoComplete="off"
                  value={healthScore}
                  onChange={onInputChange}
                />
              </div>
            </div>

            {/* <input
      type="text"
      placeholder="Recipe summary"
      className="form-control"
      name="summary"
      autoComplete="off"
      value={summary}
      onChange={onInputChange}
    /> */}
            <div>
              <label for="formSummary">Summary</label>
              <textarea
                id="formSummary"
                name="summary"
                placeholder="Tell us about your Recipe"
                rows="4"
                cols="60"
                value={summary}
                onChange={onInputChange}
              ></textarea>
            </div>
            <div className="checkList">
              <div className="titleCheck mb-check">Diets:</div>
              <div className="list-container">
                {dietsBack?.map((item) => (
                  <div key={item.id}  >
                    <label><input
                      value={item.name}
                      type="checkbox"
                      onChange={handleCheck}
                      className={styles.inputCheck}
                    /><span className={styles.innerName}>{item.name}</span></label>
                    
                    {/* <span>{item.name}</span> */}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.stepsTable}>
              <h1>Steps: {todos.length}</h1>
              <hr />
              <div className="row">
                <div className="col-7">
                  <TodoList
                    todos={todos}
                    onDeleteTodo={(event) => handleDeleteTodo(event)}
                  />
                </div>
                {/* <div className="col-5"></div> */}
                <h4 className={styles.formSubtitle}>Add Step</h4>
                <hr />
                <TodoAdd onNewTodo={(event) => handleNewTodo(event) }
                />
              </div>
            </div>
            <button className={styles.mainButton}>Create</button>
              </div>
              <div className="all-recipes">
          <Link to="/search" className={styles.linkCreateRecipe}>See all recipes &rarr;</Link>
        </div>     
          </form>
        </div>
        <div
          class={styles.imgBox}
          role="img"
          aria-label="woman enjoying food"
        ></div>
      </div>
    </div>
  );
};
