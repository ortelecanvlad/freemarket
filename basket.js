$( document ).ready(function() {
	$("#backButton").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/index.html"
	});
	$("#forwardButton").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/orderConfirm.html"
	});
	$("#productMenu").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/index.html"
	});
	$("#inbox").click(function() {
	 	window.location.pathname = "/D:/freeMarket/Website/feedback.html"
	});
	var basketItems = JSON.parse(localStorage["productsInBasket"]);
	var basketPrices = JSON.parse(localStorage["pricesInBasket"]);
    getProductsFromBasket(basketItems, basketPrices);
});

function getProductsFromBasket(basketItems, basketPrices) {
	$("#tableBody").empty();
	for (i=0; i<basketItems.length; i++) {

		$("#tableBody").append('<tr><td>' + basketItems[i] + '</td><td>' + basketPrices[i] + '</td><td><div class="deleteBtn cursorPointer" onclick="removeFromBasket(&quot;' + basketItems[i] + '&quot;)">x</div></td></tr>');
	};
}

function removeFromBasket(productName) {

	var basketItems = JSON.parse(localStorage["productsInBasket"]);
	var basketItemsPrices = JSON.parse(localStorage["pricesInBasket"]);
	var index = basketItems.indexOf(productName);
	if (index > -1) {
    	basketItems.splice(index, 1);
    	basketItemsPrices.splice(index, 1);
	}
	localStorage.productsInBasket = JSON.stringify(basketItems);
	localStorage.pricesInBasket = JSON.stringify(basketItemsPrices);
	getProductsFromBasket(basketItems, basketItemsPrices);
}

