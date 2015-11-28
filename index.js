$( document ).ready(function() {
	$("#inbox").click(function() {
	 	window.location.pathname = "/D:/freeMarket/Website/feedback.html"
	});
    getImages();
});
var parentGr;
function getImages() {
	
	var productsArray = ["red_velvet.png",
						 "tres_semme.png",
						 "tres_semme_hair.png",
						 "univer.png",
						 "zdravo.png",
						 "nivea.png",
						 "the_bay_tree.png",
						 "your_brand.png",
						 "dads.png",
						 "green_way.png",
						 "green_works.png",
						 "plum.png",
						 "inspiral.png",
						 "new_home.png",
						 "loreto.png",
						 "sugarpova.png",
						 "australian_beauty.png"];

	var productPrices = ["1","3","1","2","2","1","1","3","1","1","2","3","3","1","1","2","1"];

	var productsName = getNamesFromPicture(productsArray);
	var productsInLocalstorage = [];
	var pricesInLocalstorage = [];

	if (localStorage.getItem("productsInBasket") !== null) {
		var productsInLocalstorage = JSON.parse(localStorage["productsInBasket"]);
	} 

	if (localStorage.getItem("pricesInBasket") !== null) {
		var pricesInLocalstorage = JSON.parse(localStorage["pricesInBasket"]);
	}

	if (productsInLocalstorage.length > 0) {
		$("#numberInBasket").text(productsInLocalstorage.length);
		$("#basket").click(function() {
		  window.location.pathname = "/D:/freeMarket/Website/basket.html"
		});
	}

	for (i=0; i<productsArray.length; i++) {
		var productFunction = "addToBasket";
		var productPicture = "addToBasket.png";
		var index = productsInLocalstorage.indexOf(productsName[i]);
		if (index > -1) {
	    	productFunction = "removeFromBasket";
	    	productPicture = "removeFromBasket.png";
		}
		
		$("#containerBody").append('<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 templateProd">' +
									'<div class="productThumbnail">' +
									'<div class="productImage" onclick="seeProductDetails(&quot;' + productsName[i] + '&quot;, &quot;' + productPrices[i] + '&quot;, &quot;' + productsArray[i] + '&quot;)"><img src="Products/' + productsArray[i] + '" alt="" style="max-height:100%;max-width:100%;margin:auto;"></div>' +
									'<div class="productName">' + productsName[i] + '</div>' +
									'<div class="productControl" onclick="' + productFunction + '(&quot;' + productsName[i] + '&quot;, &quot;' + productPrices[i] + '&quot;)"><img src="Elements/' + productPicture + '" alt="" style="width:100%;cursor:pointer;"></div>' +
									'</div></div>');
	};
}

function seeProductDetails(productName, productPrice, productPicture) {
	var prodDetails = {productName: productName, productPrice: productPrice, productPicture: productPicture};
	localStorage.productDetails = JSON.stringify(prodDetails);
	window.location.pathname = "/D:/freeMarket/Website/productDetails.html"
}

function getNamesFromPicture(pictureNameArr) {
	var productsNames = [];
	for (i=0; i<pictureNameArr.length; i++) {
		var capitalName ="";
		var noExtention = pictureNameArr[i].split(".")[0];
		var picName = noExtention.split("_");
		for (j=0; j<picName.length; j++) {
			if (j == (picName.length - 1)){
				capitalName = capitalName + capitalizeFirstLetter(picName[j]);
			} else {
				capitalName = capitalName + capitalizeFirstLetter(picName[j]) + " ";
			}
		};
		productsNames.push(capitalName);
	};
	console.log(productsNames);
	return productsNames;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addToBasket(productName, productPrice) {
	if (localStorage.getItem("productsInBasket") === null) {
		var emptyArr = [];
		localStorage.productsInBasket = JSON.stringify(emptyArr);
	} 

	if (localStorage.getItem("pricesInBasket") === null) {
		var emptyArr = [];
		localStorage.pricesInBasket = JSON.stringify(emptyArr);
	}
	var targetParent = $(event.target).parent();
	targetParent.html('<img src="Elements/removefromBasket.png" alt="" style="width:100%;cursor:pointer;">');
	$(targetParent).attr('onclick','removeFromBasket("'+ productName +'", "'+ productPrice +'")');

	var basketItems = JSON.parse(localStorage["productsInBasket"]);
	basketItems.push(productName);
	localStorage.productsInBasket = JSON.stringify(basketItems);

	var basketItemsPrices = JSON.parse(localStorage["pricesInBasket"]);
	basketItemsPrices.push(productPrice);
	localStorage.pricesInBasket = JSON.stringify(basketItemsPrices);

	$("#numberInBasket").text(basketItems.length);
	$("#basket").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/basket.html"
	});
}

function removeFromBasket(productName, productPrice) {
	var targetParent = $(event.target).parent();
	targetParent.html('<img src="Elements/addToBasket.png" alt="" style="width:100%;cursor:pointer;">');
	$(targetParent).attr('onclick','addToBasket("'+ productName +'", "'+ productPrice +'")');

	var basketItems = JSON.parse(localStorage["productsInBasket"]);
	var basketItemsPrices = JSON.parse(localStorage["pricesInBasket"]);

	var index = basketItems.indexOf(productName);
	if (index > -1) {
    	basketItems.splice(index, 1);
    	basketItemsPrices.splice(index, 1);
	}
	localStorage.productsInBasket = JSON.stringify(basketItems);
	localStorage.pricesInBasket = JSON.stringify(basketItemsPrices);
	if (basketItems.length > 0) {
		$("#numberInBasket").text(basketItems.length);
	} else {
		$("#numberInBasket").text("");
		$("#basket").click(function() {
		  window.location.pathname = "/D:/freeMarket/Website/index.html"
		});
	}
}

