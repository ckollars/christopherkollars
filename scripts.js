
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



var chris = {

  skills: [
    'web developer',
    'front-end developer',
    'designer',
    'Subaru lover',
    'bike enthusiast',
    'local music lover',
    'besnonite',
    'beer enthusiast'
  ],

  log: function(data) {
    if(typeof console != 'undefined'){
       console.log(data);
    }
  },

  swap: function(descrip) {
    var min = 0;
    var max = chris.skills.length;
    var rand = Math.floor(Math.random() * (max - min + 1)) + min;
    $(descrip).fadeOut(200, function(){
      $(descrip).fadeIn(200).text(chris.skills[rand]);
    });
  }

};




$(function(){
  $('body').on('click', 'h1 span', function(){ chris.swap(this); });
});

$(window).load(function() {
  twitComment.init();
});
