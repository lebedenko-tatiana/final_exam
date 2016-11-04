
$(function () {

  var $modal, $parent, $elem;
  var $body = $('body');


  function callAPI(inputValue) {
    $.ajax({
      url: 'https://pixabay.com/api/?key=3270070-e448714d3a5efe7670c473a3a&q=' + inputValue + '&image_type=photo&callback=callbackFunc&context=?',
      dataType: 'jsonp'
    });
  }


  var $input = $('.search__input');
  
//  $input.focus();
  $input.on('keypress', function(e) {
  		  	   if (e.keyCode == 13) {
			     e.preventDefault();
                             $('.main__gallery').empty();
                    	     callAPI($input.val());
		  	   };
  });


  var $submit = $('.search__submit');
  $submit.on('click', function(e) {
		        e.preventDefault();
                        $('.main__gallery').empty();
			callAPI($input.val());
  });


  callAPI(' ');

 

});




function callbackFunc(data) {
  var width = $('div.wrapper')[0].offsetWidth;
  var height = 240;
  if (width === 320) {width = 320;}
  if (width === 748) {width = 240;}
  if (width === 940) {width = 300;}

  $.each(data.hits, function(i, hit) {
                      $parent = $('.main__gallery');
                      $elem = $('<div class="main__gallery-item"></div>');
                      $parent.last().append($elem);   

                      $parent = $('.main__gallery-item');
                      $elem = $('<div class="main__gallery-wrapper"></div>');
                      $parent.last().append($elem);   

                      $parent = $('.main__gallery-wrapper');              
                      $elem = $('<img class="img-item" src="' + hit.webformatURL + '" alt="' + hit.tags + '">');
                      $parent.last().append($elem);

                      $elem = $('<div class="main__gallery-coverimg"></div>');
                      $parent.last().append($elem);
                      $elem = $('<a class="" href="/">' + hit.tags + '</a>');
                      $parent.last().append($elem);
  	            });

  $('.main__gallery').imagesLoaded(function() {
    $('.main__gallery').masonry({
      itemSelector: '.main__gallery-item'
    });
  });


}







