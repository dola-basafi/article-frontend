$(document).ready(function () {
  $("#nav").load("navbar.txt");
  $("#modal").load("login-register.txt")
});
const baseUrl = "http://localhost:8000/api";

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
