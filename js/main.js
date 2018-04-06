'use strict';
var productsList = document.querySelector('.products__list');
var titleRecipe = document.querySelector('.header__title');
var counterProducts = 0;
var recipe = "";

function requestIngredients(){
	var responseJSON;
  fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function (response){
    return response.json();
  })
  .then(function(json){
    responseJSON = json;
    var list = '';

    if(responseJSON !== undefined){
      recipe = responseJSON.recipe.ingredients;
      var currency =responseJSON.recipe.currency;
      for(var i=0; i < recipe.length; i++){
    		list+= '<li class="products__list-items">';
        list+= '<input class="checkbox__list" type="checkbox" value="'+recipe[i].product+'" name="ingredients"/>';
        list+= '<input class="counter__list" type="number" value="" name="quantity"/>';
        list+= '<div class="list__details">';
        list+= '<h3 class="article__list">'+recipe[i].product+'</h3>';
        list+= '<h4 class="brand__list">'+recipe[i].brand+'</h4>';
        list+= '<p class="weight__list">'+recipe[i].quantity+'</p>';
        list+= '</div>';
        list+= '<div class="">';
        list+= '<p class="price__list">'+recipe[i].price+''+currency+'</p>';
        list+= '</div>';
        list+= '</li>'
    	}

      productsList.innerHTML +=list;
      console.log('entro en el ListIngredient')
      titleRecipe.innerHTML = recipe.name;
    }
  })
}

requestIngredients();
