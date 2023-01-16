import {
  ADD_TODO,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPES_BY_DIET,
  GET_RECIPES_BY_NAME,
  GET_RECIPES_BY_PARAMS,
  GET_RECIPES_BY_QUERY,
  GET_RECIPE_BY_ORDER,
  GET_TODOS,
  POST_RECIPE,
  REMOVE_TODO,
} from "../actions/actions";

const initialState = {
  recipes: [],
  filteredRecipe: [],
  // filteredOrderRecipe: [],
  filterByQuery: [],
  filteredByParams: [{}],
  uploadRecipeMessage: "",
  orderedRecipe:[],
  diets:[],
  initialToDo:[]
  // diets: {
  //   GlutenFree: false,
  //   Vegan: false,
  //   Ketogenic: false,
  //   Vegetarian: false,
  //   LactoVegetarian: false,
  // },
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipe: action.payload,
        // filteredOrderRecipe: action.payload
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        filteredRecipe: state.recipes.filter(({ title }) =>
          title.toLowerCase().includes(action.payload)
        ),
      };

    case GET_RECIPES_BY_DIET:
      if (action.payload.length === 0) {
        if(state.orderedRecipe[0]==='ascending'){
          console.log(state.recipes);
          const ascendingArray = [...state.recipes].sort((a,b)=>(a.title.toLowerCase()>b.title.toLowerCase())? 1 : ((b.title.toLowerCase()>a.title.toLowerCase()) ? -1 :0));
          //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
          console.log('entro')
          return {
            ...state,
            filteredRecipe: ascendingArray,
          };
        };
        if(state.orderedRecipe[0]==='descending'){
          const descendingArray = [...state.recipes].sort((a,b)=>(a.title.toLowerCase()>b.title.toLowerCase())? -1 : ((b.title.toLowerCase()>a.title.toLowerCase()) ? 1 :0));
          //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
          console.log('entroot')
          return {
            ...state,
            filteredRecipe: descendingArray,
          };
        }
        return {
          ...state,
          filteredRecipe: state.recipes,
        };
      }
      
      const filteredArray = state.recipes.filter((recipe) => {
        const intersection = action.payload.every((item) =>
          // action payload filtros seleccionados ['gluten free', 'vegan']
          recipe.diets.includes(item)
        );
        if (intersection === true) {
          return recipe;
        }
      });
      if(state.orderedRecipe[0]==='ascending'){
        const ascendingArray = [...filteredArray].sort((a,b)=>(a.title.toLowerCase()>b.title.toLowerCase())? 1 : ((b.title.toLowerCase()>a.title.toLowerCase()) ? -1 :0));
        //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
        return {
          ...state,
          filteredRecipe: ascendingArray,
        };
      };
      if(state.orderedRecipe[0]==='descending'){
        const descendingArray = [...filteredArray].sort((a,b)=>(a.title.toLowerCase()>b.title.toLowerCase())? -1 : ((b.title.toLowerCase()>a.title.toLowerCase()) ? 1 :0));
        //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
        return {
          ...state,
          filteredRecipe: descendingArray,
        };
      }
      return {
        ...state,
        filteredRecipe: filteredArray,
      };
      // if (state.diets[Object.keys(action.payload)[0]] === true)
      //   return {
      //     ...state,
      //     filteredRecipe: state.recipes.filter(({ diets }) =>
      //       diets.find((element) =>
      //         element.includes(action.payload[Object.keys(action.payload)[0]])
      //       )
      //     ),
      //   };
      // if (state.diets.GlutenFree === true)
      //   return {
      //     ...state,
      //     filteredRecipe: state.recipes.filter(({ diets }) =>
      //       diets.includes(action.payload.GlutenFree)
      //     ),
      //   };

      // if (state.diets.Vegan === true)
      //   return {
      //     ...state,
      //     filteredRecipe: state.recipes.filter(({ diets }) =>
      //       diets.includes(action.payload.Vegan)
      //     ),
      //   };
      // if (state.diets.Ketogenic === true)
      //   return {
      //     ...state,
      //     filteredRecipe: state.recipes.filter(({ diets }) =>
      //       diets.includes(action.payload.Ketogenic)
      //     ),
      //   };
      // if (state.diets.Vegetarian === true)
      // return {
      //   ...state,
      //   filteredRecipe: state.recipes.filter(({ diets }) =>
      //     diets.find (element => element.includes(action.payload.Vegetarian))
      // )};
      // if (state.diets.LactoVegetarian === true)
      //   return {
      //     ...state,
      //     filteredRecipe: state.recipes.filter(({ diets }) =>
      //     diets.find (element => element.split.includes(action.payload.LactoVegetarian))
      //     ),
      //   };

      // return {
      //   ...state,
      //   filteredRecipe: state.recipes,
      // };
      case GET_RECIPE_BY_ORDER:
          return {
            ...state,
            orderedRecipe: action.payload,
          };
        
    case GET_RECIPES_BY_QUERY:
      return {
        ...state,
        filterByQuery: action.payload,
      };

      case GET_RECIPES_BY_PARAMS:
      return {
        ...state,
        filteredByParams: action.payload,
      };

      case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

      case POST_RECIPE:
      return {
        ...state,
        uploadRecipeMessage: action.payload,
      };

      case ADD_TODO:
      return {
        ...state,
        initialToDo: [...state.initialToDo, action.payload],
      };

      case REMOVE_TODO:
        return {
          ...state,
          initialToDo: state.initialToDo.filter(todo => todo.id !== action.payload)
        };

        case GET_TODOS:
        return {
          ...state,
          initialToDo: state.initialToDo
        };

    default:
      return state;
  }
  
};
