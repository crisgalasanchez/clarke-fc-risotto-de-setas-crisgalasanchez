'use strict';
var productsList = document.querySelector('.products__list');

function requestIngredients(){
  fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function (response){
    return response.json();
  })
  .then(function(json){
    var responseJSON = json;
  });
  return responseJSON;
}
function ListIngredient(){
  productsList.innerHTML ="";
	var list = '';
  var recipe = responseJSON.recipe.ingredients;
  for(var i=0; i < recipe.length; i++){
		list+= '<li class="">';
    list+= '<input class="checkbox__list" type="checkbox" value="'+recipe[i].product+'" name="ingredients"/>';
    list+= '<div class="">';
    list+= '<p class="counter__list"></p>';
    list+= '<div class="">';
    list+= '<h3 class="article__list">'+recipe[i].product+'</h3>';
    list+= '<h4 class="brand__list">'+recipe[i].brand+'</h4>';
    list+= '<p class="weight__list">'+recipe[i].quantity+'</p>';
    list+= '<div class="">';
    list+= '<p class="price__list">'+recipe[i].price+''+recipe.currency+'</p>';
    list+= '</div>';
    list+= '</li>'
	}
    productsList.innerHTML +=list;
    console.log('entro en el ListIngredient')
}
