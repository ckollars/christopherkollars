
var popup = {

  init: function(url, height) {
    var width = 840;
    var popupName = 'popup_' + width + 'x' + height;

    var left = (screen.width-width)/2;
    var top = 100;
    var params = 'width=' + width + ',height=' + height + ',location=no,menubar=no,scrollbars=yes,status=no,toolbar=no,left=' + left + ',top=' + top;

    window[popupName] = window.open(url, popupName, params);
    if(window.focus) {
      window[popupName].focus();
    }
    return true;
  }
};

var twitComment = {
  init: function() {
    $('.twitter').click(function(e) {
      e.preventDefault();
      var link = $(this).attr("href");
      popup.init(link, 364);
    });
  }
};

// var about = {

//   var specialties = [
//     'Front-end architect',
//     'Subaru fanatic',
//     'local music lover',
//     'Instagram user',
//     'new to static site philosophy'
//   ]

//   init: function() {

//   }
// };

$(function(){
  // $('#top-header').waypoint('sticky');
});

$(window).load(function() {
  twitComment.init();
});
