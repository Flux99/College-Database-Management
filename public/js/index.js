$( document ).ready(function() {

//alert("Formindex7997");

   //var frm = document.body.querySelector("#studentform");

  $("#target").submit(function(event) {
  //  $( "#studentregister" ).submit();
  event.preventDefault();
  alert("target");

  var post_emp_id= $( "#emp_id" ).serialize();

  	var post_urlly="/teachercheckaadhar";
  	var post_url = $("form").attr("action"); //get form action url
  	var form_datax = $("form").serialize(); //Encode form elements for submission
  	//var myJSON = JSON.stringify(this);
  	//const formdata = new FormData(this);

  	console.log("working=="+form_datax);

    //alert( "Form Submitted" );

    async function postData(url = '/teachercheckaadhar', data = {post_emp_id}) {
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

  postData('/teachercheckaadhar',  post_emp_id )
    .then(data => {
  		if(data==="True"){
        postData(post_url,  form_datax ).then(data => {
          alert("Data saved!!");
        });
  		}else if(data==="False"){
          alert("Employment ID already exist ");
  		}

  //End of other tag
  });
});


    $( ".myclass" ).click(function() {
      alert("myclass was pressed ");
      console.log("myclass was pressed ");
    //alert( "Handler for .click() called." );
    $.get( "/att", function( data ) {
      console.log(data);
     //$( ".full" ).html( data.Month);
    alert( "Load was performed." );
    // Each Loop
  // half and half
  var content =  '<table class="striped responsive-table">';
  content +=       '<thead>';
      content +=         '<tr>';
        content +=         '<th>ID</th>';
        content +=         '<th>Name</th>';
      content +=           '  <th>Month</th>';
    content +=               '<th>Attendance</th>';
  content +=             '</tr>';
  content +=             '<tbody id="half">';
    content +=             '</tbody>';
  content +=         '</thead>';
  content +=       '</table>';
$(".myclassx").append(content);

    $.each(data, function(index,data) {
      console.log("ajax==="+data.id);
    var  con =             '<tr class "goal">';
        con +=               '<td class="id">'+data.id+'</td>';
        con +=               '<td class="name">'+data.fullname+'</td>';
        con +=               '<td class="month">'+data.Month+'</td>';
        con +=               '<td class="attendance">'+data.Attendance+'%</td>';
        con +=           '</tr>';
       $("#half").append(con);
       // var fetch  data.Month;
       // $(".full").html(fetch);
});



    });


  });

// findatt
$( "#findatt" ).click(function() {
  alert("find was pressed ");
    event.preventDefault();
    var form_datax = $("form").serialize(); //Encode form elements for submission
    console.log("Find"+form_datax);

    async function getData(url = '/postatt') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body:data// body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
    }

    getData('/postatt' )
    .then(data => {
      if(data==="True"){

      }else if(data==="False"){
          alert("Aadharcard already exist");
      }



    });
});






//start of getting marks
$( ".mysub" ).click(function() {


  alert("myclass was pressed ");
  console.log("myclass was pressed ");
//alert( "Handler for .click() called." );
$.get( "/sub", function( data ) {
  console.log(data);
 //$( ".full" ).html( data.Month);
alert( "Load was performed." );
// Each Loop
// half and half
var content =  '<table class="striped responsive-table">';
content +=       '<thead>';
  content +=         '<tr>';
    content +=         '<th>ID</th>';
    content +=         '<th>Name</th>';
  content +=           '  <th>Month</th>';
content +=               '<th>Attendance</th>';
content +=             '</tr>';
content +=             '<tbody id="half">';
content +=             '</tbody>';
content +=         '</thead>';
content +=       '</table>';
$(".myclassx").append(content);

$.each(data, function(index,data) {
  console.log("ajax==="+data.id);
 var myJSON = JSON.stringify(data);
  console.log(myJSON);
var  con =             '<tr class "goal">';
    con +=               '<td class="id">'+data.id+'</td>';
    con +=               '<td class="name">'+data.fullname+'</td>';
    con +=               '<td class="month">'+data.Month+'</td>';
    con +=               '<td class="attendance">'+data.Attendance+'%</td>';
    con +=           '</tr>';
   $("#half").append(con);
   // var fetch  data.Month;
   // $(".full").html(fetch);
});



});



});



//end of getting marks





  $( "#studentform" ).submit(function( event ) {
    alert( "Handler for studentform" );
    event.preventDefault();
    var post_aadharnumber= $( "#aadharnumber" ).serialize();

var post_urlly="/checkaadhar";
var post_url = $("form").attr("action"); //get form action url
var form_datax = $("form").serialize(); //Encode form elements for submission
//var myJSON = JSON.stringify(this);
//const formdata = new FormData(this);

console.log("working=="+form_datax);

//alert( "Form Submitted" );

async function postData(url = '/checkaadhar', data = {post_aadharnumber}) {
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

postData('/checkaadhar',  post_aadharnumber )
.then(data => {
  if(data==="True"){
    postData('/register',  form_datax ).then(data => {
      alert("Data saved!!");
    });
  }else if(data==="False"){
      alert("Aadharcard already exist");
  }



});


//End of student regi

  });

//Start of DELETE




// $( "#delete" ).click(function( event ) {
//   alert( "delete was pressed" );
//   event.preventDefault();
// var post_aadharnumber= $( "#aadharnumber" ).serialize();
// var post_urlly="/checkaadhar";
// var post_url = $("form").attr("action"); //get form action url
// var form_datax = $("form").serialize(); //Encode form elements for submission
// //var myJSON = JSON.stringify(this);
// //const formdata = new FormData(this);
//
// console.log("working=="+form_datax);
//
// //alert( "Form Submitted" );
//
// async function postData(url = '/checkaadhar', data = {post_aadharnumber}) {
// // Default options are marked with *
// const response = await fetch(url, {
// method: 'POST', // *GET, POST, PUT, DELETE, etc.
// mode: 'cors', // no-cors, *cors, same-origin
// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
// credentials: 'same-origin', // include, *same-origin, omit
// headers: {
//   'Content-Type': 'application/json',
//    'Content-Type': 'application/x-www-form-urlencoded'
// },
// redirect: 'follow', // manual, *follow, error
// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// body:data// body data type must match "Content-Type" header
// });
// return response.json(); // parses JSON response into native JavaScript objects
// }
//
// postData('/checkaadhar',  post_aadharnumber )
// .then(data => {
// if(data==="True"){
//   postData(post_url,  form_datax ).then(data => {
//     alert("Data saved!!");
//   });
// }else if(data==="False"){
//     alert("Aadharcard already exist");
// }
//
//
//
// });
////End of DELETE
// });

$( ".delete" ).click(function( event ) {
var abc=$( ".delete" ).val();
alert(ab)
  });





//End of docuemnt ready
});
