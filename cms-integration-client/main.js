//   BASE VARIABLES:
const baseUrl = "https://p2-c1-branded-things.herokuapp.com";

$(document).ready(function () {
    checkToken();

    $("#login-form").submit((event) => {
        event.preventDefault();
        const email = $("#login-email").val();
        const password = $("#login-password").val();
        $.ajax({
            method: "post",
            url: `${baseUrl}/login`,
            data: { email, password },
        })
            .done((response) => {
                console.log(response);
                localStorage.setItem("access_token", response.access_token);
                localStorage.setItem("email", response.email);
                localStorage.setItem("role", response.role);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                showProducts();
            })
            .fail((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.responseJSON.message,
                    showCloseButton: true,
                    showConfirmButton: false,
                });
            })
            .always(() => {
                $("#login-email").val("");
                $("#login-password").val("");
            });
    });

    $("#logout-btn").click((event) => {
        event.preventDefault();
        signOutGoogle()
        localStorage.clear();
        checkToken();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have been logged out",
            showConfirmButton: false,
            timer: 1500,
        });
    });

    $("#add-form").submit((event) => {
        event.preventDefault();
        const name = $("#add-name").val();
        const description = $("#add-description").val();
        const price = $("#add-price").val();
        const imgUrl = $("#add-image").prop("files")[0];
        const categoryId = $("#add-category").val();

        let form = new FormData();
        form.append("name", name);
        form.append("description", description);
        form.append("price", price);
        form.append("imgUrl", imgUrl);
        form.append("categoryId", categoryId);

        $.ajax({
            method: "POST",
            url: `${baseUrl}/products`,
            headers: {
                access_token: localStorage.access_token,
            },
            data: form,
            processData: false,
            contentType: false,
        })
            .done((response) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                resetAddForm()
                showProducts();
            })
            .fail((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.responseJSON.message,
                    showCloseButton: true,
                    showConfirmButton: false,
                });
            });
    });

    $("#edit-form").submit((event) => {
        event.preventDefault();
        const id = $("#edit-id").val()
        const name = $("#edit-name").val();
        const description = $("#edit-description").val();
        const price = $("#edit-price").val();
        const imgUrl = ($("#edit-image").val() == "") ? "keep" : $("#edit-image").prop("files")[0]
        const categoryId = ($("#edit-category").val() == "") ? $("#current-category").val() : $("#edit-category").val()

        // console.log(id, 'dari edit')
        // console.log(name, 'dari edit')
        // console.log(description, 'dari edit')
        // console.log(price, 'dari edit')
        // console.log(imgUrl, 'dari edit')
        // console.log(categoryId, 'dari edit')

        let form = new FormData();
        form.append("name", name);
        form.append("description", description);
        form.append("price", price);
        if (imgUrl != 'keep') {
            form.append("imgUrl", imgUrl)
        }
        form.append("categoryId", categoryId);

        $.ajax({
            method: "PUT",
            url: `${baseUrl}/products/${id}`,
            headers: {
                access_token: localStorage.access_token,
            },
            data: form,
            processData: false,
            contentType: false,
        })
            .done((response) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                resetAddForm()
                showProducts();
            })
            .fail((error) => {
                console.log(error.responseJSON);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.responseJSON.message,
                    showCloseButton: true,
                    showConfirmButton: false,
                });
            });
    });

    $("#add-category-form").submit((event) => {
        event.preventDefault();
        const name = $("#add-category-name").val();
        $.ajax({
            method: "POST",
            url: `${baseUrl}/categories`,
            headers: {
                access_token: localStorage.access_token,
            },
            data: { name },
        })
            .done((response) => {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                showCategories();
            })
            .fail((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.responseJSON.message,
                    showCloseButton: true,
                    showConfirmButton: false,
                });
            })
            .always($("#add-category-name").val(""));
    });

    $("#register-form").submit((event) => {
        event.preventDefault();
        const email = $("#register-email").val();
        const password = $("#register-password").val();
        $.ajax({
            method: "post",
            url: `${baseUrl}/register`,
            data: { email, password },
        })
            .done((response) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.message,
                    text: response.email,
                    showConfirmButton: false,
                    timer: 1500,
                });
                showLogin();
                $("#sidebar").toggle();
            })
            .fail((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.responseJSON.message,
                    showCloseButton: true,
                    showConfirmButton: false,
                });
            })
            .always(() => {
                $("#register-email").val("");
                $("#register-password").val("");
            });
    });
});
//  FUNCTIONS
// Utilities
function checkToken() {
    if (localStorage.access_token) {
        $.ajax({
            method: "get",
            url: `${baseUrl}/checkToken`,
            headers: { access_token: localStorage.access_token },
        })
            .done((response) => {
                console.log(response);
                showProducts();
            })
            .fail((error) => {
                console.log(error.responseJSON.message);
            });
    } else showLogin();
}

function deleteProduct(id) {
    console.log(id);
    $.ajax({
        method: "delete",
        url: `${baseUrl}/products/${id}`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            console.log(response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500,
            });
            fetchProducts();
        })
        .fail((error) => {
            console.log(error.responseJSON.message);
        });
}

function deleteCategory(id) {
    console.log(id);
    $.ajax({
        method: "delete",
        url: `${baseUrl}/categories/${id}`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            console.log(response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500,
            });
            fetchCategories();
        })
        .fail((error) => {
            console.log(error);
        });
}

function currencyConverter(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
}

function editProduct(id) {
    console.log(id);
    $.ajax({
        method: "get",
        url: `${baseUrl}/products/${id}`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            console.log(response);
        })
        .fail((error) => {
            console.log(error);
        });
}

function dateFormatter(inputDate) {
    inputDate = new Date(inputDate);
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
    };
    return inputDate.toLocaleDateString("en-US", options);
}

function fetchProducts() {
    $.ajax({
        method: "get",
        url: `${baseUrl}/products`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            let activeUser = response.activeUser;
            $("#product-table").empty();
            response.products.forEach((product) => {
                let authorId = product.authorId;
                $("#product-table").append(
                    `<tr>
                    <td>${product.name}</td>
                    <td>${currencyConverter(product.price)}</td>
                    <td>
                        <img style="display:block; width: 5rem;" class="card-img mx-auto" src="${product.imgUrl}" alt="product picture">
                    </td>
                    <td>${product.Category.name}</td>
                    <td>
                      <div class="d-grid gap-2 col-12 mx-auto">
                        <span onclick="showDetail(${product.id})"class="btn badge bg-secondary">Details</span>
                        <span onclick="showEdit(${product.id})" id="edit-item-${product.id}" class="btn badge bg-primary disabled hidden">Edit</span>
                        <span onclick="deleteProduct(${product.id})" id="delete-item-${product.id}" class=" btn badge bg-indigo disabled hidden">Delete</span>
                      </div>
                    </td>
                  </tr>`
                );
                $(`#edit-item-${product.id}`).hide();
                $(`#delete-item-${product.id}`).hide();
                if (activeUser.role == "admin" || (activeUser.role == "staff" && activeUser.id == authorId)
                ) {
                    $(`#edit-item-${product.id}`).show().removeClass('disabled hidden');
                    $(`#delete-item-${product.id}`).show().removeClass('disabled hidden');
                }
            });
        })
        .fail((error) => {
            console.log(error.responseJSON.message);
        });
}

function fetchProductDetail(id) {
    console.log(id);
    $.ajax({
        method: "get",
        url: `${baseUrl}/products/${id}`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            $("#detail-table").empty();
            $("#detail-table").append(
                `<tr>
        <th>Product ID</th>
        <td>${response.id}</td>
        </tr>
        <tr>
        <th>Product Name</th>
        <td>${response.name}</td>
        </tr> 
        <tr>
          <th>Product Description</th>
          <td>${response.description}</td>
        </tr> 
        <tr>
          <th>Product Price</th>
          <td>${currencyConverter(response.price)}</td>
        </tr> 
        <tr>
          <th>Product Category</th>
          <td>${response.Category.name}</td>
        </tr> 
        <tr>
          <th>Created By</th>
          <td>${response.User.email}</td>
        </tr> 
        <tr>
          <th>Created At</th>
          <td>${dateFormatter(response.createdAt)}</td>
        </tr> 
        <tr>
          <th>Updated At</th>
          <td>${dateFormatter(response.updatedAt)}</td>
        </tr> `
            );
            $("#product-main-img").empty();
            $("#product-main-img").append(
                `<img src="${response.imgUrl}" class="figure-img img-fluid rounded" alt="product pictur">
        <figcaption class="figure-caption text-start">Image of ${response.name}</figcaption>`
            );
        })
        .fail((error) => {
            console.log(error);
        });
}

function fetchCategoriesForm() {
    $.ajax({
        method: "get",
        url: `${baseUrl}/categories`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            $(".form-select").empty();
            $(".form-select").append(
                `<option class="hidden selected" value="" >Select Product Category</option>`
            );
            response.categories.forEach((category) => {
                $(".form-select").append(
                    `<option value="${category.id}">${category.name}</option>`
                );
            });
        })
        .fail((error) => {
            console.log(error);
        });
}

function fetchUsers() {
    $.ajax({
        method: "get",
        url: `${baseUrl}/users`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            $("#user-table").empty();
            response.users.forEach((user) => {
                $("#user-table").append(
                    `<tr>
              <td>${user.id}</td>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>${user.phoneNumber}</td>
              <td>${user.address}</td>
          </tr>`
                );
            });
        })
        .fail((error) => {
            console.log(error.responseJSON.message);
        });
}

function fetchCategories() {
    $.ajax({
        method: "get",
        url: `${baseUrl}/categories`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            let activeUser = response.activeUser;
            $("#category-table").empty();
            response.categories.forEach((category) => {
                $("#category-table").append(
                    `<tr>
              <td>${category.id}</td>
              <td>${category.name}</td>
              <td>
                <div class="d-grid gap-2 col-6 mx-auto">
                  <span onclick="deleteCategory(${category.id})" id="delete-category-${category.id}" class=" btn badge bg-indigo disabled">Delete</span>
                </div>
              </td>
          </tr>`
                );
                $(`#delete-category-${category.id}`).hide()
                if (activeUser.role == "admin") {
                    $(`#delete-category-${category.id}`).show().removeClass('disabled hidden');
                }
            });
        })
        .fail((error) => {
            console.log(error.responseJSON.message);
        });
}

function fetchProductforEdit(id) {
    $.ajax({
        method: "get",
        url: `${baseUrl}/products/${id}`,
        headers: { access_token: localStorage.access_token },
    })
        .done((response) => {
            $('#edit-form').empty()
            $('#edit-form').append(
                `
      <div hidden class="mb-3">
        <label for="edit-id"  class="form-label ">Product ID</label>
        <input type="text" class="form-control" disabled id="edit-id" name="id" value="${response.id}">
      </div>
      <div class="mb-3">
        <label for="edit-name" class="form-label">Product Name</label>
        <input type="text" class="form-control" id="edit-name" name="name" value="${response.name}">
      </div>
      <div class="mb-3">
        <label for="edit-description" class="form-label">Product Desctription</label>
        <input type="text" class="form-control" id="edit-description" name="description" value="${response.description}">
      </div>
      <div class="mb-3">
        <label for="edit-price" class="form-label">Product Price</label>
        <input type="number" class="form-control" min="0" id="edit-price" name="price" value="${response.price}">
      </div>
        <label for="current-product-image" class="form-label">Current Product Image</label>
        <img style="display:block; width: 10rem;" class="card-img mx-auto"
        src="${response.imgUrl}" alt="product picture">
        <div class="mb-3">
          <label for="edit-image" class="form-label">Change Image <br>(Leave blank if you do not want to change) </label>
          <input class="form-control" type="file" id="edit-image" name="imgUrl">
      </div>
      <div hidden class="mb-3">
        <label for="current-category"  class="form-label">Current Category: ${response.Category.name}</label>
        <input type="text" class="form-control" disabled  id="current-category" name="current-category" value="${response.categoryId}">
      </div>
      <div class="mb-3">
        <label for="edit-category" class="form-label">Change Category (Current: ${response.Category.name})<br>(Leave blank if you do not want to change) </label>
        <select id='edit-category' name='categoryId' class="form-select" aria-label="Product Category">
        </select>
      </div>
    
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
      `
            )
            fetchCategoriesForm()

        })
        .fail((error) => {
            console.log(error);
        })
}

function userAvatar() {
    $("#user-credentials").empty();
    $("#greetings").empty();
    $("#user-credentials").append(
        `
    <h6  class="mb-0 text-gray-600">${localStorage.email}</h6>
    <p id="user-role" class="mb-0 text-sm text-gray-600">${localStorage.role}</p>
    `
    );
    $("#greetings").append(
        `<h6  class="dropdown-header">Hello, ${localStorage.email}!</h6>`
    );
    if (localStorage.googleProfPic) {
        $("#user-avatar").empty();
        $("#user-avatar").append(
            `
      <img src="${localStorage.googleProfPic}" />
      `
        );
    }
}

function resetAddForm() {
    $("#add-form")[0].reset()
}


//Show Pages
function showLogin() {
    $(".section").hide();
    $("#login-page").show();
    $("#sidebar").toggle();
}

function showRegister() {
    $(".section").hide();
    $("#register-page").show();
}

function showProducts() {
    userAvatar();
    fetchProducts();
    $(".section").hide();
    $("#sidebar").show();
    $("#nav-bar").show();
    $("#product-page").show();
    $(".nav-item").show();
}

function showDetail(id) {
    userAvatar();
    fetchProductDetail(id);
    $(".section").hide();
    $("#sidebar").show();
    $("#nav-bar").show();
    $("#product-detail").show();
}

function showEdit(id) {
    fetchProductforEdit(id)
    userAvatar();
    $(".section").hide();
    $("#sidebar").show();
    $("#nav-bar").show();
    $("#edit-page").show();
}

function showAdd() {
    userAvatar();
    resetAddForm()
    fetchCategoriesForm();
    $(".section").hide();
    $("#sidebar").show();
    $("#nav-bar").show();
    $("#add-page").show();
}

function showCategories() {
    fetchCategories();
    $(".section").hide();
    $("#sidebar").show();
    $("#nav-bar").show();
    $("#category-page").show();
    $(".nav-item").show();
}

function showAddCategories() {
    fetchCategories();
    $(".section").hide();
    $("#sidebar").show();
    $("#nav-bar").show();
    $("#add-category-page").show();
    $(".nav-item").show();
}

function showUsers() {
    fetchUsers();
    $(".section").hide();
    $("#sidebar").show();
    $("#nav-bar").show();
    $("#user-page").show();
    $(".nav-item").show();
}

//Google Sign In Pages
function onSignInGoogle(googleUser) {
    var profile = googleUser.getBasicProfile();
    var profilePic = profile.getImageUrl()
    var google_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "post",
        url: `${baseUrl}/googleSignIn`,
        data: { google_token },
    })
        .done((response) => {
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("email", response.email);
            localStorage.setItem("role", response.role);
            localStorage.setItem("googleProfPic", profilePic);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500,
            });
            showProducts();
        })
        .fail((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.responseJSON.message,
                showCloseButton: true,
                showConfirmButton: false,
            });
        });
}

function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
