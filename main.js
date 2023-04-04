$(document).ready(function () {
  $("#nav").load("navbar.txt");
  $("#modal").load("login-register.txt")
  $("#alert-login").hide()
 if (localStorage.getItem("access_token")) {
   setTimeout(function() { 
     $("#log-out").show();   
     $("#log").hide();   
     $("#reg").hide();   
 }, 100);  
 }else{
  setTimeout(function() { 
    $("#log-out").hide();   
    $("#log").show();   
     $("#reg").show(); 
}, 100);
 }
});
const baseUrl = "http://localhost:8000/api";

//logout
function proccesslogout() {
  const token =localStorage.getItem("access_token")
  $.ajax({
    method: "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
  },
    url: `${baseUrl}/user/logout`,
    // headers: { access_token: localStorage.token },
  }).done((result) => {
    console.log(result, "INI hasil response dengan ajax logout");
    localStorage.clear();
    // afterLogin()
  })
}
//register
function proccessregister(e) {
  e.preventDefault()
  const email = $("#regemail").val()
  const name = $("#name").val()
  const password = $("#regpassword").val()
  
  $.ajax({
    method: "POST",
    url: `${baseUrl}/user/register`,
    data: { email: email, password: password,name:name },
  })
    .done((result) => {
      console.log(result, "INI hasil response dengan ajax regis");
      // afterLogin()
    }).fail((err) => {
      const errors = err.responseJSON.error
      $("#alert-login").show()
      $("#alert-login").text(JSON.stringify(errors))
      console.log(errors, "INI ERROR DI regis");
    });
}


// login
function proccesslogin(e) {
  e.preventDefault()
  const email = $("#loginemail").val()
  const password = $("#loginpassword").val()
  $.ajax({
    method: "POST",
    url: `${baseUrl}/user/login`,
    data: { email: email, password: password },
  })
    .done((result) => {
      console.log(result.access_token, "INI hasil response dengan ajax login");
      localStorage.setItem("access_token",result.access_token)
      // afterLogin()
    }).fail((err) => {
      const errors = err.responseJSON.error
      $("#alert-login").show()
      $("#alert-login").text(JSON.stringify(errors))
      console.log(errors, "INI ERROR DI LOGIN");
    });
}

function articleShow() {
  $("#content").load("article.txt");
}
function categoryShow(params) {
  $("#content").load("category.txt");
  showCategory();
}

function showCategory() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/article-category/list`,
    // headers: { access_token: localStorage.token },
  }).done((categories) => {
    let data = categories.messages
    $.each(data,(index,category) => {
      console.log(category)
      $("#category-data").append(
        `
        <tr>
                <th scope="row">${index+1}</th>
                <td>${category.categoryname}</td>
                <td>
                      <button class="btn btn-primary">detail</button>
                      <button class="btn btn-warning">update</button>
                      <button class="btn btn-danger">delete</button>
                    </td>
        </tr>
        `
      )      
    })
    // category.messages.forEach();
    console.log(JSON.stringify(categories.messages[0].id));
  });
}
