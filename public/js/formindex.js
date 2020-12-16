$( document ).ready(function() {

// alert("Formindex7997");
// $( "#submit" ).click(function( event ) {
//   alert( "Handler for .submit() called." );
//   console.log("Handler for .submit() called.");
//   event.preventDefault();
// });

// $("#my_form").submit(function(event){
//   e.preventDefault();
//      console.log('Submit');
//      alert("Submitted");
// });
//
//
$("#my_form").submit(function(event){
	event.preventDefault(); //prevent default action
alert("working");
	let form = document.querySelector('#my_form');
	var post_urlly="/checkaadhar";
	var post_url = $(this).attr("action"); //get form action url
	var form_datax = $(this).serialize(); //Encode form elements for submission
	var myJSON = JSON.stringify(this);
	const formdata = new FormData(this);

	console.log("working"+form_datax);

	async function postData(url = '/checkaadhar', data = {form_datax}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
       'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body:data// body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('/checkaadhar',  form_datax )
  .then(data => {
		if(data==="True"){
		 $("#form").submit(); // Submit the form
		}else if(data==="False"){
				postData(post_url,  form_datax ).then(data => {
					alert("Data saved!!");
				});
		}


    console.log("postData"+data); // JSON data parsed by `response.json()` call
  });



//let form = document.querySelector('#form');
// $('#form').on('submit', async function(e) {
//     e.preventDefault();
//    console.log('Submit');
//    alert("Submitted");
//   var form_datax = $(this).serialize();
//   console.log(form_datax);
//   console.log('Submit');
//   const response = await fetch('/checkaadhar', {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         //'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify({
//         'aadharnumber': document.querySelector('#aadharnumber').value,
//       }) // body data type must match "Content-Type" header
//     }).then(response => response.json())
//     .then(response => {
//       console.log(response)
//       if (response['userFound'] === 'true') {
//         alert("use different addhar card number");
//       } else {
//         $('#form').submit();
//       }
//     });
// });
});
});
