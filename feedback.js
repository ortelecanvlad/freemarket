$( document ).ready(function() {
	$("#productMenu").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/index.html"
	});

	$("#goToStats").click(function() {
	  window.location.pathname = "/D:/freeMarket/Website/stats.html"
	});

	var feedbackItems = JSON.parse(localStorage["ordered"]);
    getOrderedForFeedback(feedbackItems);
});

var feedbackQuestions = ["We are pleased the you decided to try" , "How do you like"];
var feedbackAnswers = [{key: "text" , content: "On the following rows we will ask in detail to share your experience with the product. It takes about 3-4 minutes to complete the assignment. We look forward to hearing about your oppinion."}, 
						{key: "single choice", content: ["Awful", "Below expectations", "Nothing special", "Interesting", "Awesome"]}];

function getOrderedForFeedback(feedbackItems) {
	
	if (feedbackItems.length == 0) {
		$("#topRow").text("NO PRODUCTS TO REVIEW");
	} else {
		$("#topRow").text("PRODUCTS TO REVIEW");
		$("#containerBody").append('<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"></div>');

		for (i=0; i<feedbackItems.length; i++) {
			var unevenClass = "";
			if(i % 2 == 1) {
				unevenClass = "unevenBackground";
			}
			var picturePath = getPictureFromName(feedbackItems[i]);
			$("#accordion").append('<div class="panel">' +
								    '<div class="panel-heading ' + unevenClass +'" data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '">' +
								          feedbackItems[i] +
								    '<div class="orderNumber">#' + i + '</div>' +
								    '</div>' +
								    '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
								      '<div class="panel-body">' +
								      '<div class="topHalfFeedback">' +
								      	'<div class="feedbackPicture">' +
								      	'<img src="' + picturePath + '" alt="" style="width:100%;">' +
								      	'</div>' +
								      	'<div class="actualFeedback">' +
									      	'<div class="feedbackTitle" id="feedbackTitle_' + i + '">' +
									      	'</div>' +
									      	'<div class="feedbackBody" id="feedbackBody_' + i + '">' +
								      		'</div>' +
								      	'</div>' +
								      '</div>' +
								      '<div class="dividerFeedback"></div>' +
								      '<div class="bottomHalfFeedback">' +
								      	'<div class="buttonsRow">' +
								          '<button type="button" class="feedbackBack" id="backButton_' + i + '">Back</button>' +
								          '<button type="button" class="feedbackNext" onclick="onNext(' + i + ')" id="nextButton_' + i + '">Next</button>' +
								        '</div>' +
								      '</div>' +
								    '</div>' +
								  '</div>');

			for (j=0; j<feedbackQuestions.length; j++) {
				var noShow = "";
				if (j != 0) {
					noShow = "noShow";
				}
				$("#feedbackTitle_" + i).append('<div id="questionTitle_' + i + '_' + j + '" class="questionTitle ' + noShow + '">' + feedbackQuestions[j] + ' ' + feedbackItems[i] +'</div>');

				if (feedbackAnswers[j].key == "text") {
					$("#feedbackBody_" + i).append('<div id="answers_' + i + '" class="answers ' + noShow + '">' + feedbackAnswers[j].content + '</div>');
				} else if (feedbackAnswers[j].key == "single choice") {

					$("#feedbackBody_" + i).append('<div class="singleChoice ' + noShow + '" id="feedbackBody_' + i +'_radio"></div>');

					for (h=0; h<feedbackAnswers[j].content.length; h++) {
						var choices = feedbackAnswers[j].content;
						$("#feedbackBody_" + i + "_radio").append('<div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">' +
														'<div class="input-group">' +
															'<input class="radioButton" name="options" type="radio" aria-label="Radio">' +
															 choices[h] +
															'</div>' +
														'</div>');
					}
				}
			}
	
		};
	}	
}

function onNext(prductIndex) {
	$("#backButton_" + prductIndex).show();
	$("#questionTitle_" + prductIndex + "_0").addClass("noShow");
	$("#questionTitle_" + prductIndex + "_1").removeClass("noShow");
	$("#answers_" + prductIndex).addClass("noShow");
	$("#feedbackBody_" + prductIndex + "_radio").removeClass("noShow");
	$("#nextButton_" + prductIndex).text("Finish");
}

function getPictureFromName(productName) {
	var pictureURL = "Products/";
	var pictureFullName = createPictureFullName(productName);
	pictureURL = pictureURL + pictureFullName;
	return pictureURL;
}

function createPictureFullName(string) {
	var lowerCase = string.toLowerCase();
	var withSeparator = lowerCase.replace(/ /g,"_");
	var withExtension = withSeparator + ".png";
    return withExtension;
}