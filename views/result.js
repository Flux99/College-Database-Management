$(document).ready(function() {
  $('#example').on('click', 'button.switch', function() {
    $.ajax('az.html', {
        beforeSend: function() {
          $('#sat').text('Loading..');
        }
      })
      .done(function(response) {

        $('#result').html(response);
      })
      .always(function() {
        alert("Done");
      });
  });

});
