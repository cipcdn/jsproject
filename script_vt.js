/**
 * Task 1 : On desktop and on tablet (768px and up) the grid should display 3 products in the row (as opposed to 4 and 2)
 * Time: 15 min
 */
function productGridUpdate() {
	var $ = jQuery;
/**
 * step 1: remove first and last class for the products
 * step 2: add first class to first product and last to the third one for every row
 */
	$(".products .product").removeClass("first").removeClass("last");
	$('.products .product').each( function(index){
		// using mod we can decide if the product is first or last on the row
		if ( index % 3 == 0 ) { 
			$(this).addClass("first");
		} else if ( index % 3 == 2 ) {
			$(this).addClass("last");
		}
	});
}

/**
 * Task 2 : The drop down in the search bar currently defaults to “All categories”, make it default to “Accessories” instead.
 * Time: 10 min
 */
function setSelectDefault() {
	var defaultValue = "accessories";
	var $ = jQuery;
/**
 * Steps: Parse all options from the select and set selected true for accessories
 */
	$('select[name="product_cat"] > option').each( function(){
		var optionValue = $(this).val();
		if ( optionValue == defaultValue ) {
			$(this).attr("selected", true);
		}
	});
	
}

/**
 * Task 3: Create a simple popup to welcome the customer after 5 seconds from the page load.
 * Time :30 min
 */
function displayPopUp() {
	var $ = jQuery;
	var popUpBody = "";
/**
 * step 1: use ipify to get the user ip
 * step 2: get city and country from ipstack
 * step 3: if received values for city and country will generate the popup.
 */
	$.getJSON("https://api.ipify.org/?format=json", function (data) {
		var ip = data.ip;
		var access_key = '332a8f6324e712ffeadebb3fdb644f31';

			// get the API result via jQuery.ajax
			$.ajax({
				url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key,   
				dataType: 'jsonp',
				success: function(json) {
									
					if ( json.city ) {
						popUpBody =  json.city ;
					} else if ( json.country_name ) {
						popUpBody = json.country_name;
					} 
					if ( popUpBody ) {
						popUpBody = '<div id="lightBox">' +
										'<div id="lightBoxWrap">' +
											'<div id="lightBoxHead">' + 
												'<a href="#" id="lightboxBtnClose" title="close button">' + 
													'<i class="fa fa-times"></i>' + 
												'</a>'+
											'</div>' +
										'<div id="lightBoxContent">' + 
											'<p>Hello, dear visitor from ' + popUpBody +'!</p>' + 
										'</div>' +
									'</div>';
						$("body").append(popUpBody);	
					}
					
				}
			});
	});
}
/**
 * remove popup when press x or overlay.
 */
function removePopUp() {
	var $ = jQuery;
	if ( $("#lightBox").length ) {
		$("#lightBox").remove();
	}
}


/**
 * Task 4: If there are any items in the cart make the cart icon more prominent
 * Time :15 min
 */

function updateItems() {
	var $ = jQuery;
	var itemsCart = $(".cart-contents .count").text();
/**
 * step 1: read number of products from the count div / can be used other solutions to be sure the number is right, maybe a small backend script which will return the right number.
 * step 2: if number of products is > 0 will change color and add button
 * step 3: if number is <= 0  will remove color and button
 */
	if ( parseInt(itemsCart) > 0 ) {
		$(".header-cart").addClass("header-cart-green");	
		if ( !$("#btnPayNow").length ) {
			$("body").append('<a href="http://consumer-friend.com/checkout/" id="btnPayNow">Pay now</a>');
		}
		
	} else {
		if ( $("#btnPayNow").length ) {
			$("#btnPayNow").remove();
		}
		$(".header-cart").removeClass("header-cart-green");		
	}
}


// we will run task 1,2 and 4 when page is loading.
jQuery(window).load(function() {
	// task one
	productGridUpdate();
	//task two
	setSelectDefault();
	//task four
	updateItems();
});

// we will run task 3 after page was loaded.
jQuery(document).ready(function() {
	var $ = jQuery;

	// because the website is using ajax to add/delete products from cart will check after every ajax request if are or not products in the cart
	$(document).ajaxStop(function(){
		updateItems();
	});

	// set delay 5 seconds to display the popup
	setTimeout(displayPopUp, 5000);

	// close the popup
	$(document).on("click", "#lightboxBtnClose", function()  {
		removePopUp();
		return false;
	});

	// closeup when click on overlay
	$(document).on('click', function(e) {
		if ( $(e.target).closest("#lightBoxWrap").length === 0 ) {
			removePopUp();
		}
	});


});