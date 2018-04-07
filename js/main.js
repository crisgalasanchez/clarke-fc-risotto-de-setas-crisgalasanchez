'use strict';
var productsList = document.querySelector('.products__list');
var titleRecipe = document.querySelector('.header__title');
var totalPrice = document.querySelector('.total__price');
var shippingPrice = document.querySelector('.shipping__price');
var subtotalContainer = document.querySelector('.subtotal__price');
var subtotalContainerButton = document.querySelector('.buttom__buy');
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
			var name =responseJSON.recipe.name;
			var shippingCosts =responseJSON.recipe["shipping-cost"];

      for(var i=0; i < recipe.length; i++){
    		list+= '<li class="products__list-items">';
        list+= '<input class="checkbox__list" type="checkbox"  id="checkbox'+ i +'" value="'+recipe[i].product+'" name="ingredients"/>';
        list+= '<input class="counter__list" type="number" onchange="checkPriceArticle()" value="0" name="quantity"/>';
        list+= '<div class="list__details">';
        list+= '<h3 class="article__list">'+recipe[i].product+'</h3>';
        list+= '<h4 class="brand__list">'+recipe[i].brand+'</h4>';
        list+= '<p class="weight__list">'+recipe[i].quantity+'</p>';
        list+= '</div>';
        list+= '<div class="">';
        list+= '<p class="price__list">'+recipe[i].price+'</p>';
				// '+currency+'
        list+= '</div>';
        list+= '</li>'
    	}

      productsList.innerHTML +=list;
      titleRecipe.innerHTML = name;
    	shippingPrice.innerHTML = shippingCosts + ' ' + currency;
    }
  })
}

function checkPriceArticle(){
	var checkboxList = document.querySelectorAll('.checkbox__list');
	var counterlist = document.querySelectorAll('.counter__list');
	var pricelist = document.querySelectorAll('.price__list');
	for(var i=0; i < checkbox.length; i++){
		if(checkboxList[i].checked){
			var counterIngredient = counterlist[i].value;
    	var priceIngredient =pricelist[i].innerHTML;
			var sumPrice=counterIngredient*priceIngredient;
			pricelist.innerHTML = sumPrice;
    }

// var priceIngredient = pricelist[i].value.substring(0,pricelist[i].value.length-1);
	}
}
function printTotal() {
  subtotalContainer.innerHTML = sumPrice + currency;
	totalPrice.innerHTML = subtotalContainer*shippingPrice;

}

function checkAll(){
  var checkbox = document.querySelectorAll('.checkbox__list');
  for(let i=0; i<checkbox.length; i++){
    document.querySelector('#checkbox'+ i ).checked = true;

  }
printTotal()

}

function descheckAll(e){
var checkbox = document.querySelectorAll('.checkbox__list');
  for(let i=0; i<checkbox.length; i++){
    document.querySelector('#checkbox'+ i ).checked = false;
  }
}

document.querySelector('.buttom__select').addEventListener('click', checkAll);
document.querySelector('.buttom__deselect').addEventListener('click', descheckAll);
requestIngredients();
