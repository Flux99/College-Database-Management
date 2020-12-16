
(function($){
  $(function(){




     $(".dropdown-trigger").dropdown();
        //$('.sidenav').sidenav();

    $('.sidenav').sidenav();

  $('.datepicker').datepicker();
    $('.carousel.carousel-slider').carousel({
   fullWidth: true,
   indicators: true
  });





    $(document).ready(function(){
      $('select').formSelect();
    });

  $('#textarea1').val('');
    M.textareaAutoResize($('#textarea1'));

  $('input#input_text, input#mobile_number,input#aadhar_number').characterCounter();


//for file upload size limit
  // var uploadField = document.getElementById("file");
  //
  // uploadField.onchange = function() {
  //     if(this.files[0].size > 2097152){
  //        alert("File is too big!");
  //        this.value = "";
  //     };
  // };


  });
  // end of document ready
})(jQuery); // end of jQuery name space
