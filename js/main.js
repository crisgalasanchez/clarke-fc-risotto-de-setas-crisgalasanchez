'use strict';
var productsList = document.querySelector('.products__list');
var titleRecipe = document.querySelector('.header__title');
var totalPrice = document.querySelector('.total__price');
var shippingPrice = document.querySelector('.shipping__price');
var itemContainer = document.querySelector('.item__container-number');
var subtotalContainer = document.querySelector('.subtotal__price');
var subtotalContainerButton = document.querySelector('.total__price-buttom');
var counterProducts = 0;
var itemCounter = 0;
var subtotalCounter = 0;
var ingredients = "";
var currency = "";
var shippingCosts = "";

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
			shippingCosts =responseJSON.recipe["shipping-cost"];

      for(var i=0; i < ingredients.length; i++){
    		list+= '<li class="products__list-items">';
        list+= '<input class="checkbox__list" type="checkbox" onchange="checkUncheck()" id="checkbox'+ i +'" value="'+ingredients[i].product+'" name="ingredients"/>';
        list+= '<input class="counter__list" type="number" onchange="checkPriceArticle()" value="0" min="0" name="quantity" disabled="true"/>';
        list+= '<div class="list__details">';
        list+= '<h3 class="article__list">'+ingredients[i].product+'</h3>';
				if( ingredients[i].brand == undefined){
					list+= '<h4 class="brand__list">'+"Marca blanca"+'</h4>';
				}else{
					list+= '<h4 class="brand__list">'+ingredients[i].brand+'</h4>';
				}

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
	itemCounter = 0;
	subtotalCounter = 0;
	for(var i=0; i < checkboxList.length; i++){
		if(checkboxList[i].checked){
			var counterIngredient = counterlist[i].value;
			var priceIngredient = getIngredientPrice(checkboxList[i].value);
			var sumPrice = parseFloat(counterIngredient) * parseFloat(priceIngredient);
			var result = sumPrice.toFixed(2);
			pricelist[i].innerHTML = result + currency;
			itemCounter += parseFloat(counterIngredient);
			subtotalCounter += parseFloat(result);
    }
	}
		printTotal()
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

function printTotal() {
  itemContainer.innerHTML = itemCounter;
	subtotalContainer.innerHTML = subtotalCounter.toFixed(2) + currency;
	totalPrice.innerHTML = (subtotalCounter + shippingCosts).toFixed(2) + currency;
	subtotalContainerButton.innerHTML = (subtotalCounter + shippingCosts).toFixed(2) + currency;
}

function checkAll(){
  var checkbox = document.querySelectorAll('.checkbox__list');
	var counterlist = document.querySelectorAll('.counter__list');
  for(let i=0; i<checkbox.length; i++){
    document.querySelector('#checkbox'+ i ).checked = true;
		counterlist[i].disabled = false;
  }
// printTotal()

}

function descheckAll(e){
	var counterlist = document.querySelectorAll('.counter__list');
	var checkbox = document.querySelectorAll('.checkbox__list');
  for(let i=0; i<checkbox.length; i++){
    document.querySelector('#checkbox'+ i ).checked = false;
		counterlist[i].value= 0;
		counterlist[i].disabled = true;
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
			counterlist[i].value= 0;
		}
	}
	checkPriceArticle();
}

document.querySelector('.buttom__select').addEventListener('click', checkAll);
document.querySelector('.buttom__deselect').addEventListener('click', descheckAll);

requestIngredients();
