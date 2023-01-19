export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_BY_NAME =  "GET_RECIPES_BY_NAME";
export const GET_RECIPES_BY_DIET = "GET_RECIPES_BY_DIET";
export const GET_RECIPES_BY_QUERY = "GET_RECIPES_BY_QUERY";
export const GET_RECIPES_BY_PARAMS= "GET_RECIPES_BY_PARAMS";
export const POST_RECIPE = "POST_RECIPE";
export const GET_RECIPE_BY_ORDER = "GET_RECIPE_BY_ORDER";
export const GET_DIETS = "GET_DIETS";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const GET_TODOS = "GET_TODOS";

const apiKey = "af3e2f1866f747d6997fcec100f1a4a3";
export const getRecipes = () => {
  return async (dispatch) => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
    );
   
    const {results} = await resp.json();
    const filteredData = await results.filter(function(item) {
        if (this.count < 100 ) {
          this.count++;
          return true;
        }
        return false;
      }, {count: 0});
      const database = await fetch(
        // `http://localhost:3001/recipes/search`
        `https://pi-food-production-d652.up.railway.app/recipes/search`
      );
      const dataResults = await database.json()
    
  
    dispatch({ type: GET_RECIPES, payload: [...dataResults,...filteredData] });
  };
};

export const getRecipesByName = (payload = "") => {
  payload = payload.toLowerCase().trim();
  if (payload.length === 0) return []
  return {
  type:GET_RECIPES_BY_NAME,payload
  }
  ;

  // return heroes.filter(({ superhero }) =>
  //   superhero.toLowerCase().includes(name)
  // );
};

export const getRecipesByDiet = (payload) => {
  return {
  type:GET_RECIPES_BY_DIET,payload
  }
};

export const getRecipesByQueryName = (q) => {
  return async (dispatch) => {
  
    const resp = await fetch(
      // `http://localhost:3001/recipes?name=${q}`
      `https://pi-food-production-d652.up.railway.app/recipes?name=${q}`
    );

    const results = await resp.json();
    console.log(results);
    const filteredData = await results.filter(function(item) {
        if (this.count < 20 ) {
          this.count++;
          return true;
        }
        return false;
      }, {count: 0});
     
      console.log(filteredData)
    dispatch({ type: GET_RECIPES_BY_QUERY, payload: filteredData });
  }; 
};

export const getRecipesByParams = (id) => {
  return async (dispatch) => {
    const resp = await fetch(
      // `http://localhost:3001/recipes/${id}`
      `https://pi-food-production-d652.up.railway.app/recipes/${id}`
    );

    const results = await resp.json();
  
    
    dispatch({ type: GET_RECIPES_BY_PARAMS, payload: results });
  }; 
};

export const createRecipe = (recipe) => {
  const {title,summary,healthScore,dietsFiltered,todos} = recipe
  const diets = dietsFiltered;
  return async (dispatch) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "title": title,
      "summary": summary,
      "healthScore": healthScore,
      "diets": diets,
      "analyzedInstructions": todos
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    // fetch("http://localhost:3001/recipes", requestOptions)
     
    // const resp = await fetch("http://localhost:3001/recipes",  requestOptions)
    const resp = await fetch("https://pi-food-production-d652.up.railway.app/recipes",  requestOptions)
  //     method: 'POST',
  //     redirect: 'follow',
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'},
  //     body: JSON.stringify({
  //       recipe
  //       //  title: title,
  //       //  summary: summary,
  //       //  healthScore: healthScore,
  //       //  diets: diets
  //     }),
  //  })
      dispatch({ type: POST_RECIPE, payload: resp })
  };

  };

  export const getOrder = (payload) => {
    return {
      
      type:GET_RECIPE_BY_ORDER ,payload
    }
  }

  export const getDiets = () => {
    return async (dispatch) => {
      const resp = await fetch(
        // `http://localhost:3001/diets`
        `https://pi-food-production-d652.up.railway.app/diets`
      );
  
      const results = await resp.json();
    
     
      dispatch({ type: GET_DIETS  , payload: results });
    }; 
  };

  export const addTodo = (payload) => {
    return {
      
      type: ADD_TODO ,payload
    }
  }

  export const removeTodo = (payload) => {
    return {
      type: REMOVE_TODO ,payload
    }
  }

  export const getTodos = () => {
    return {
      type: GET_TODOS
    }
  }



  





