
				// SETUP VARIABLES
				// ==========================================================

				// This variable will be pre-programmed with our authentication key (the one we received when we registered)
				var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

				// These variables will hold the results we get from the user's inputs via HTML
				var queryTerm = "";
				var numResults = 0;
				var startYear = 0;
				var endYear = 0;

				// Based on the queryTerm we will create a queryURL
				//var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";
					
				$('#runSearch').on('click', function(evt) {
                    evt.preventDefault();
                    var text = $('.searchTerm').text();
                var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";
                runQuery(10, queryURLBase + text);

                // Array to hold the various article info
                var articleCounter = 0;
            });
				// Array to hold the various article info
				var articleCounter = 0;

				// FUNCTIONS
				// ==========================================================

			// This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
			function runQuery(numArticles, queryURL) {

				// The AJAX function uses the URL and Gets the JSON data associated with it. The data then gets stored in the variable called: "NYTData"
				$.ajax({url: queryURL, method: "GET"})
					.done(function (NYTData) {


						// Loop through and provide the correct number of articles
						for (var i = 0; i < numArticles; i++) {

							// Add to the Article Counter (to make sure we show the right number)
							articleCounter++;

							// Create the HTML Well (Section) and Add the Article content for each
							var wellSection = $("<div>");
							wellSection.addClass('well');
							wellSection.attr('id', 'articleWell-' + articleCounter);
							$('#wellSection').append(wellSection);

							// Confirm that the specific JSON for the article isn't missing any details
							// If the article has a headline include the headline in the HTML
							if (NYTData.response.docs[i].headline != "null") {
								$("#articleWell-" + articleCounter).append('<h3><span class="label label-primary">' + articleCounter + '</span><strong>   ' + NYTData.response.docs[i].headline.main + "</strong></h3>");

								// Log the first article's Headline to console.
								console.log(NYTData.response.docs[i].headline.main);
							}

							// If the article has a Byline include the headline in the HTML
							if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
								$("#articleWell-" + articleCounter).append('<h5>' + NYTData.response.docs[i].byline.original + "</h5>");

								// Log the first article's Author to console.
								console.log(NYTData.response.docs[i].byline.original);
							}

							// Then display the remaining fields in the HTML (Section Name, Date, URL)
							$("#articleWell-" + articleCounter).append('<h5>Section: ' + NYTData.response.docs[i].section_name + "</h5>");
							$("#articleWell-" + articleCounter).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
							$("#articleWell-" + articleCounter).append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");


						}
					})
			}
    