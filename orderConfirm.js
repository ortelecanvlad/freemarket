$( document ).ready(function() {
	$("#backButton").click(function() {
	 	window.location.pathname = "/D:/freeMarket/Website/basket.html"
	});
	$("#inbox").click(function() {
	 	window.location.pathname = "/D:/freeMarket/Website/feedback.html"
	});
	$("#order").click(function() {
		localStorage.ordered = JSON.stringify(basketItems);
		localStorage.productsInBasket = JSON.stringify([]);
		localStorage.pricesInBasket = JSON.stringify([]);
	  	window.location.pathname = "/D:/freeMarket/Website/index.html"
	});
	$("#productMenu").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/index.html"
	});
	var basketItems = JSON.parse(localStorage["productsInBasket"]);
	var basketItemsPrices = JSON.parse(localStorage["pricesInBasket"]);
    getProductsFromBasket(basketItems, basketItemsPrices);
});

function getProductsFromBasket(basketItems, basketPrices) {
	$("#orderTableBody").empty();
	var total = 0;
	var totalCurrency = "token";
	var numOfProd = 0;
	var prod = "products";
	for (i=0; i<basketItems.length; i++) {
		numOfProd++;
		var currency = "token";
		if (parseInt(basketPrices[i]) > 1)  {
			currency = "tokens"
		}
		total = total + parseInt(basketPrices[i]);
		$("#orderTableBody").append('<tr><td>' + basketItems[i] + '</td><td class="skinny">' + basketPrices[i] + " " + currency + '</td></tr>');
	};

	if (total > 1)  {
		totalCurrency = "tokens";
	}
	if (numOfProd == 1)  {
		prod = "product";
	}

	$(".summary").text("You have a total of " + basketItems.length + " " + prod + " worth " + total + " " + totalCurrency);
}