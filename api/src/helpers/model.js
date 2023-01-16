module.exports = {
   
    findRecipe: function (array, name) {
    
       const filteredArray= array.filter(({title}) => title.toLowerCase().includes(name.toLowerCase()));

    //    if(filteredArray.length===0) throw new Error('no Data');
       return filteredArray;
       },

       findRecipeById: function (array, primaryId) {
    
         const filteredArray= array.filter(({id}) => id=== Number(primaryId));
  
      //    if(filteredArray.length===0) throw new Error('no Data');
         return filteredArray;
    },

    mapData: function (array) {

      const arrayFilter = array.map(element =>({ steps:element.analyzedInstructions.map(({step})=>({step:step}))}));
      return array.map(element => ({ diets:element.diets.map(({name})=>name),title:element.title, id: element.id, healthScore: element.healthScore,summary: element.summary,analyzedInstructions:[...arrayFilter]}))
    }
   }
  