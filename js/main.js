'use strict';
var productsList = document.querySelector('.products__list');
var titleRecipe = document.querySelector('.header__title');
var totalPrice = document.querySelector('.total__price');
var shippingPrice = document.querySelector('.shipping__price');
var subtotalContainer = document.querySelector('.subtotal__price');
var subtotalContainerButton = document.querySelector('.buttom__buy');
var counterProducts = 0;
var ingredients = "";
var currency = "";

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
      ingredients = responseJSON.recipe.ingredients;
      currency =responseJSON.recipe.currency;
			var name =responseJSON.recipe.name;
			var shippingCosts =responseJSON.recipe["shipping-cost"];

      for(var i=0; i < ingredients.length; i++){
    		list+= '<li class="products__list-items">';
        list+= '<input class="checkbox__list" type="checkbox" onchange="checkUncheck()" id="checkbox'+ i +'" value="'+ingredients[i].product+'" name="ingredients"/>';
        list+= '<input class="counter__list" type="number" onchange="checkPriceArticle()" value="0" min="0" name="quantity" disabled="true"/>';
        list+= '<div class="list__details">';
        list+= '<h3 class="article__list">'+ingredients[i].product+'</h3>';
        list+= '<h4 class="brand__list">'+ingredients[i].brand+'</h4>';
        list+= '<p class="weight__list">'+ingredients[i].quantity+'</p>';
        list+= '</div>';
        list+= '<div class="">';
        list+= '<p class="price__list">'+ingredients[i].price+currency+'</p>';
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
	for(var i=0; i < checkboxList.length; i++){
		if(checkboxList[i].checked){
			var counterIngredient = counterlist[i].value;
			var priceIngredient = getIngredientPrice(checkboxList[i].value);
			//var priceIngredient = pricelist[i].innerHTML.substring(0, pricelist[i].innerHTML.length-1);
			var sumPrice = parseFloat(counterIngredient) * parseFloat(priceIngredient);
			var result = sumPrice.toFixed(2);
			pricelist[i].innerHTML = result + currency;
    }
	}
}

function getIngredientPrice(product){
	var price = 0;
	for(var i = 0; i < ingredients.length; i++){
		if( ingredients[i].product == product){
			price = ingredients[i].price;
			break;
		}
	}
	return price;
}

// function printTotal() {
//   subtotalContainer.innerHTML = sumPrice + currency;
// 	totalPrice.innerHTML = subtotalContainer*shippingPrice;
//
// }

function checkAll(){
  var checkbox = document.querySelectorAll('.checkbox__list');
  for(let i=0; i<checkbox.length; i++){
    document.querySelector('#checkbox'+ i ).checked = true;

  }
// printTotal()

}

function descheckAll(e){
	var counterlist = document.querySelectorAll('.counter__list');
	var checkbox = document.querySelectorAll('.checkbox__list');
  for(let i=0; i<checkbox.length; i++){
    document.querySelector('#checkbox'+ i ).checked = false;
		counterlist[i].value= 0;
  }

}

function checkUncheck(){
	var checkboxList = document.querySelectorAll('.checkbox__list');
	var counterlist = document.querySelectorAll('.counter__list');
	for(var i=0; i < checkboxList.length; i++){
		if(checkboxList[i].checked){
			counterlist[i].disabled = false;
    }else{
			counterlist[i].disabled = true;
		}
	}
}

document.querySelector('.buttom__select').addEventListener('click', checkAll);
document.querySelector('.buttom__deselect').addEventListener('click', descheckAll);

requestIngredients();
