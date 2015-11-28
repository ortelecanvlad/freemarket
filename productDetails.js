$( document ).ready(function() {
    getProductDetails();
    $("#basket").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/basket.html"
	});
	$("#productMenu").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/index.html"
	});
});

var numberOfOther = 4;

function getProductDetails() {
	var productDetailsJSON = JSON.parse(localStorage["productDetails"]);
	$("#prodAndName").text(productDetailsJSON.productName);
	$("#productTitle").text(productDetailsJSON.productName);
	$("#productImageSrc").attr("src", "Products/" + productDetailsJSON.productPicture);
	$("#sufflePic1").attr("src", "Products/" + productDetailsJSON.productPicture);
	$("#sufflePic2").attr("src", "Products/" + productDetailsJSON.productPicture);

	if (localStorage.getItem("productsInBasket") !== null) {
		var productsInLocalstorage = JSON.parse(localStorage["productsInBasket"]);
	}

	var productFunction = "addToBasket";
	var productPicture = "inCartRectangle.png";
	var index = productsInLocalstorage.indexOf(productDetailsJSON.productName);
	if (index > -1) {
    	productFunction = "removeFromBasket";
    	$("#basketImageSrc").attr("src", "Elements/outCartRectangle.png");
    	$("#basketImageSrc").attr('onclick','removeFromBasket("'+ productDetailsJSON.productName +'")');
    	productPicture = "outCartRectangle.png";
	} else {
		$("#basketImageSrc").attr("src", "Elements/inCartRectangle.png");
    	$("#basketImageSrc").attr('onclick','addToBasket("'+ productDetailsJSON.productName +'")');
	}

	for (i=0; i<numberOfOther; i++) {
		$("#otherProducts").append('<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 templateProd">' +
									'<div class="productThumbnail">' +
									'<div class="productImageOther"><img src="Products/' + productDetailsJSON.productPicture + '" alt="" style="max-height:100%;max-width:100%;margin:auto;"></div>' +
									'<div class="productNameOther">' + productDetailsJSON.productName + '</div>' +
									'</div></div>');
	} 	
}

