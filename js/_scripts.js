(function ($) {

  var hasTouch = false;

  if (("ontouchstart" in document.documentElement)) {
      document.documentElement.className += " touch";
      hasTouch = true;
  }

  function updateSidebar() {
    var docWidth = document.documentElement.clientWidth,
        docHeight = document.documentElement.clientHeight,
        main = $('main[role=main]').height();

    if(docWidth > 768){
      if(main > docHeight) {
        $('.sidebar').css({'min-height': main});
      } else {
        $('.sidebar').css({'min-height': docHeight});
      }
    }else{
      $('.sidebar').removeAttr('style');
    }
  }



  var kollab = {

    init: function(){

      updateSidebar();

      // $('.work-sample').on('click', '.work', function(event){
      //   event.preventDefault();
      //   $('.description, .work').removeClass('active');

      //   $(this).addClass('active');
      //   var curWork = $(this).attr('id');
      //   var curDescription = '.' + curWork;
      //   kollab.log(curDescription);

      //   $(curDescription).addClass("active");
      //   updateSidebar();

      // });
      $('.close').on('click', this, function(event){
        event.preventDefault();

        $('.description, .work').removeClass('active');
        updateSidebar();
      });
    },
    log: function (data){
      if( typeof console !== 'undefined'){
         console.log(data);
      }
    }
  };

  $(document).ready(function() {
    kollab.init();
  });

  $(window).load(function() {
    updateSidebar();
  }).resize(function(){
    updateSidebar();
  });

})(jQuery);
