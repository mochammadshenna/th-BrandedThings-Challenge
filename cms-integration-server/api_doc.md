# BrandedThings API Documentation

## Endpoints :

List of available endpoints:

1. `POST /register`
2. `POST /login`
3. `POST /googleSignIn`
4. `GET /checkToken`

5. `POST /products`
6. `GET /products`
7. `GET /products/:id`
8. `PUT /products/:id`
9. `DELETE /products/:id`
10. `PATCH /products/:id`

11. `GET /users`

12. `POST /categories`
13. `GET /categories`
14. `DELETE /categories/:id`

15. `GET /histories/`

&nbsp;

## 1. POST /register

Description:

- Create new user as admin

Request:

- body:

```json
{
    "email": <string>,
    "password": <string>
}
```

_Response (201 - Created)_

```json
{
    "message": "New admin has been created as below.",
    "id": <integer>,
    "email": <string>
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "Input Validation Error",
    "message": "Please input email."
}
OR
{
    "name": "Input Unique Constraint Error",
    "message": "email must be unique"
}
OR
{
    "name": "Input Validation Error",
    "message": "Please input a valid email."
}
OR
{
    "name": "Input Validation Error",
    "message": "Please input Password"
}
OR
{
    "name": "Input Validation Error",
    "message": "Password length must be at least 5 characters."
}
```

&nbsp;

## 2. POST /login

Description:

- User Login

Request:

- body:

```json
{
    "email": <string>,
    "password": <string>
}
```

_Response (200 - OK)_

```json
{
    "message": "Login Success.",
    "access_token": <string>,
    "email": <string>,
    "role": "staff" OR "admin"
}
```

_Response (401 - Unauthorized)_

```json
{
    "name": "Invalid Login Error",
    "message": "Invalid email or password"
}
```
_Response (403 - Forbidden)_

```json
{
    "name": "Forbiddenr Error",
    "message": "You are not authorized"
}
```

&nbsp;

## 3. POST /googleSignIn

Description:

- Register or Sign In with Google Account as staff 

Request:

- body:

```json
{
    "google_token": "string"
}
```

_Response (200 - OK)_

```json
{ 
    "message": "Login with Google success.", 
    "access_token" : <string>, 
    "email": <string>, 
    "role": "staff" 
}
```

_Response (201 - Created)_

```json
{ 
    "message": "New user created and login with Google success.", 
    "access_token" : <string>, 
    "email": <string>, 
    "role": "staff" 
}
```
&nbsp;

## 4. GET /checkToken

Description:

- Check token availability and validity 

Request:

- headers:

```json
{
    "access_token": <string>
}
```

_Response (200 - OK)_

```json
{ 
    "message": "Token is valid."
}
```

_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are note authorized"
}
```
&nbsp;
## 5. POST /products

Description:

- Create new product in database
- Default product status is 'active'

Request:
- headers:

```json
{
    "access_token": <string>
}
```

- body:

_(all fields, except imgUrl, are required. price cannot be lower than 10,000)_

```json
{
    "name": <string>,
    "product_code": <string>,
    "stock": <integer>,
    "product_image": <file>,
    "categoryId": <integer>,
}
```


_Response (201 - Created)_

```json
{
    "newProduct": {
        "status": "active",
        "id": <integer>,
        "name": <string>,
        "product_code": <string>,
        "stock": <integer>,
        "product_image": <string>,
        "categoryId": <integer>,
        "authorId": <integer>,
        "updatedAt": <date>,
        "createdAt": <date>
    },
    "message": "New product a with id 23 created"
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "Input Validation Error",
    "message": "Please input Product Name."
}
OR
{
    "name": "Input Validation Error",
    "message": "Please input Description."
}
OR
{
    "name": "Input Validation Error",
    "message": "Please input Price."
}
OR
{
    "name": "Input Validation Error",
    "message": "Price cannot be lower than 10,000."
}
OR
{
    "name": "Input Validation Error",
    "message": "Please select Category."
}
OR
{
    "name": "File Type Error",
    "message": "Please upload an image file."
}
OR
{
    "name": "File Size Error",
    "message": "Max file size is 255kb."
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are note authorized"
}
```

&nbsp;

## 6. GET /products

Description:

- Get all products from database

Request:
- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "activeUser": {
        "id": 2,
        "email": "staff@mail.com",
        "role": "staff"
    },
    "products": [
        {
            "id": 23,
            "name": "a",
            "product_code": "a",
            "stock": 50000,
            "product_image": "https://ik.imagekit.io/bicin142/images_gTRXuVf5l.jpeg",
            "categoryId": 1,
            "authorId": 2,
            "status": "active",
            "createdAt": "2021-11-05T20:28:27.438Z",
            "updatedAt": "2021-11-05T20:28:27.438Z",
            "Category": {
                "id": 1,
                "name": "Men Shoes",
                "createdAt": "2021-11-01T14:36:35.309Z",
                "updatedAt": "2021-11-01T14:36:35.309Z"
            },
            "User": {
                "id": 2,
                "username": "staff",
                "email": "staff@mail.com",
                "password": "$2a$08$FBNeavRlPGI44hWCBDJWxewjsf.KTYxup9tlUgFx/qCFWoR5bDlii",
                "role": "staff",
                "phoneNumber": "+6282233445566",
                "address": "staff house",
                "createdAt": "2021-11-01T14:36:35.302Z",
                "updatedAt": "2021-11-01T14:36:35.302Z"
            }
        },
        {
            "id": 22,
            "name": "Men's Running ganti",
            "product_code": "Running shoes for men",
            "stock": 999999,
            "product_image": "https://ik.imagekit.io/bicin142/images_2kIuhcP01.jpeg",
            "categoryId": 2,
            "authorId": 14,
            "status": "active",
            "createdAt": "2021-11-05T19:31:05.849Z",
            "updatedAt": "2021-11-05T19:48:18.152Z",
            "Category": {
                "id": 2,
                "name": "Women Shoes",
                "createdAt": "2021-11-01T14:36:35.309Z",
                "updatedAt": "2021-11-01T14:36:35.309Z"
            },
            "User": {
                "id": 14,
                "username": null,
                "email": "andhikamietra@gmail.com",
                "password": "$2a$08$lWq9M7fWY8a3VquWTTlQUuDFjPTPx9Og2WGzsxSh0pI9qDEgNTNJe",
                "role": "staff",
                "phoneNumber": null,
                "address": null,
                "createdAt": "2021-11-04T20:06:11.184Z",
                "updatedAt": "2021-11-04T20:06:11.184Z"
            }
        },
        ...
    ]
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are note authorized"
}
```

&nbsp;

## 7. GET /products/:id

Description:

- Get product by id

Request:

- headers:

```json
{
    "access_token": <string>
}
```

- params:

```json
{
    "id": <integer> (required)
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "test",
    "product_code": "a",
    "stock": 3,
    "product_image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    "categoryId": 1,
    "authorId": 2,
    "status": "archived",
    "createdAt": "2021-11-01T14:46:14.372Z",
    "updatedAt": "2021-11-05T10:37:46.432Z",
    "Category": {
        "id": 1,
        "name": "Men Shoes",
        "createdAt": "2021-11-01T14:36:35.309Z",
        "updatedAt": "2021-11-01T14:36:35.309Z"
    },
    "User": {
        "id": 2,
        "username": "staff",
        "email": "staff@mail.com",
        "password": "$2a$08$FBNeavRlPGI44hWCBDJWxewjsf.KTYxup9tlUgFx/qCFWoR5bDlii",
        "role": "staff",
        "phoneNumber": "+6282233445566",
        "address": "staff house",
        "createdAt": "2021-11-01T14:36:35.302Z",
        "updatedAt": "2021-11-01T14:36:35.302Z"
    }
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are not authorized"
}
```
_Response (404 - Not Found)_

```json
{
    "name": "Not Found Error",
    "message": "Product id 0 not found"
}
```

&nbsp;

## 8. PUT /products/:id

Description:

- Update product by id
- Admin or creator only

Request:

- params:

```json
{
  "id": <integer> (required)
}
```

- headers:

```json
{
  "access_token": <string>
}
```

- body:

_(all fields, except imgUrl, are required. price cannot be lower than 10,000)_

```json
{
    "name": <string>,
    "description": <string>,
    "price": <integer>,
    "imgUrl": <file>,
    "categoryId": <integer>,
}
```

_Response (200 - OK)_

_(response will show final result of update)_

```json
{
    "message": "Product with id 1 updated.",
    "updatedProduct": {
        "id": 1,
        "name": "a",
        "product_code": "s",
        "stock": 2,
        "product_image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
        "categoryId": 1,
        "authorId": 2,
        "status": "archived",
        "createdAt": "2021-11-01T14:46:14.372Z",
        "updatedAt": "2021-11-05T20:45:17.263Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "Input Validation Error",
    "message": "Please input Product Name."
}
OR
{
    "name": "Input Validation Error",
    "message": "Please input Description."
}
OR
{
    "name": "Input Validation Error",
    "message": "Please input Price."
}
OR
{
    "name": "Input Validation Error",
    "message": "Price cannot be lower than 10,000."
}
OR
{
    "name": "Input Validation Error",
    "message": "Please select Category."
}
OR
{
    "name": "File Type Error",
    "message": "Please upload an image file."
}
OR
{
    "name": "File Size Error",
    "message": "Max file size is 255kb."
}
```
_Response (403 - Forbidden)_

```json
{
    "name": "Forbiddenr Error",
    "message": "You are not authorized"
}
```
_Response (404 - Not Found)_

```json
{
    "name": "Not Found Error",
    "message": "Product id 0 not found"
}
```

&nbsp;

## 9. DELETE /products/:id

Description:

- Delete product by id
- Admin or creator only

Request:

- headers:

```json
{
    "access_token": <integer>
}
```

- params:

```json
{
    "id": <integer> (required)
}
```

_Response (200 - OK)_

```json
{
    "message": "Men's Running ganti has been successfully deleted",
    "deletedEntry": {
        "id": 11,
        "name": "Men's Running ganti",
        "product_code": "asdasdasd",
        "stock": 5,
        "product_image": "https://ik.imagekit.io/bicin142/images_BPVqzCipb.jpeg",
        "categoryId": 5,
        "authorId": 2,
        "status": "active",
        "createdAt": "2021-11-05T13:51:16.997Z",
        "updatedAt": "2021-11-05T13:51:16.997Z"
    }
}
```
_Response (403 - Forbidden)_

```json
{
    "name": "Forbiddenr Error",
    "message": "You are not authorized"
}
```
_Response (404 - Not Found)_

```json
{
    "name": "Not Found Error",
    "message": "Product id 0 not found"
}
```
&nbsp;

## 10. PATCH /products/:id

Description:

- Update product status by id
- Admin only
- Status is "archived" OR "active" OR "inactive"

Request:
- headers:

```json
{
    "access_token": <string>
}
```

- body:

```json
{
    "status": <string>
}
```
- params:

```json
{
    "id": <integer> (required)
}
```

_Response (200 - OK)_

```json
{
    "message": "Product with id 20 status has been updated from active to archived.",
    "updatedProduct": {
        "id": 20,
        "name": "Men's Running ganti",
        "description": "Running shoes for men",
        "price": 50000,
        "imgUrl": "https://ik.imagekit.io/bicin142/images_UFXsUz8-HX3.jpeg",
        "categoryId": 4,
        "authorId": 14,
        "status": "archived",
        "createdAt": "2021-11-05T17:55:07.862Z",
        "updatedAt": "2021-11-05T21:08:03.986Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "Bad Request",
    "message": "Status can only be 'active', 'inactive', or 'archived'"
}
```
_Response (403 - Forbidden)_

```json
{
    "name": "Forbiddenr Error",
    "message": "You are not authorized"
}
```
_Response (404 - Not Found)_
```json
{
    "name": "Not Found Error",
    "message": "Product id 1 not found"
}
```

&nbsp;

## 11. GET /users

Description:

- Get all users from database

Request:
- headers:

```json
{
    "access_token": <string>
}
```

_Response (200 - OK)_

```json
{
    "activeUser": {
        "id": 2,
        "email": "staff@mail.com",
        "role": "staff"
    },
    "users": [
         {
            "id": 1,
            "username": "admin",
            "email": "admin@mail.com",
            "password": "$2a$08$r8yrhd9UU8uB.YCQdO/Fy..JjS8e6kB/PcakkEjtfPpC9h60O1zn.",
            "role": "admin",
            "phoneNumber": "+6281122334455",
            "address": "admin house",
            "createdAt": "2021-11-01T14:36:35.284Z",
            "updatedAt": "2021-11-01T14:36:35.284Z"
        },
        {
            "id": 2,
            "username": "staff",
            "email": "staff@mail.com",
            "password": "$2a$08$FBNeavRlPGI44hWCBDJWxewjsf.KTYxup9tlUgFx/qCFWoR5bDlii",
            "role": "staff",
            "phoneNumber": "+6282233445566",
            "address": "staff house",
            "createdAt": "2021-11-01T14:36:35.302Z",
            "updatedAt": "2021-11-01T14:36:35.302Z"
        },
        ...
    ]
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are note authorized"
}
```

&nbsp;
## 12. POST /categories

Description:

- Create new category in database

Request:
- headers:

```json
{
    "access_token": <string>
}
```

- body:

```json
{
    "name": <string>,
}
```


_Response (201 - Created)_

```json
{
    "newCategory": {
        "id": 8,
        "name": "Women's Running 2",
        "updatedAt": "2021-10-29T20:22:13.671Z",
        "createdAt": "2021-10-29T20:22:13.671Z"
    },
    "message": "Women's Running 2 has been addedd successfully"
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "Input Validation Error",
    "message": "Please input Category Name."
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are note authorized"
}
```

&nbsp;

## 13. GET /categories

Description:

- Get all products from database

Request:
- headers:

```json
{
  "access_token": <string>
}
```

_Response (200 - OK)_

```json
{
    "activeUser": {
        "id": 1,
        "email": "admin@mail.com",
        "role": "admin"
    },
    "categories": [
        {
            "id": 1,
            "name": "Men Shoes",
            "createdAt": "2021-11-01T14:36:35.309Z",
            "updatedAt": "2021-11-01T14:36:35.309Z"
        },
        {
            "id": 2,
            "name": "Women Shoes",
            "createdAt": "2021-11-01T14:36:35.309Z",
            "updatedAt": "2021-11-01T14:36:35.309Z"
        },
        ...
    ]
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are note authorized"
}
```
&nbsp;
## 14. DELETE /categories/:id

Description:

- Delete product by id
- Admin only

Request:

- headers:

```json
{
    "access_token": <string>
}
```

- params:

```json
{
    "id": <integer> (required)
}
```

_Response (200 - OK)_

```json
{
    "message": "Women Casual has been successfully deleted",
    "deletedEntry": {
        "id": 6,
        "name": "Women Casual",
        "createdAt": "2021-11-05T12:04:03.146Z",
        "updatedAt": "2021-11-05T12:04:03.146Z"
    }
}
```
_Response (403 - Forbidden)_

```json
{
    "name": "Forbidden Error",
    "message": "You are not authorized"
}
```
_Response (404 - Not Found)_

```json
{
    "name": "Not Found Error",
    "message": "Category id 0 not found"
}
```
&nbsp;
## 15. GET /histories

Description:

- Get all products from database

Request:
- headers:

```json
{
  "access_token": <string>
}
```

_Response (200 - OK)_

```json
 "histories": [
        {
            "id": 171,
            "productId": 7,
            "name": "a",
            "description": "Product with id 7 status has been updated from active to inactive.",
            "updatedBy": "admin@mail.com",
            "createdAt": "2021-11-05T11:13:59.908Z",
            "updatedAt": "2021-11-05T11:13:59.908Z"
        },
        {
            "id": 172,
            "productId": 6,
            "name": "a",
            "description": "Product with id 6 status has been updated from active to inactive.",
            "updatedBy": "admin@mail.com",
            "createdAt": "2021-11-05T11:29:27.168Z",
            "updatedAt": "2021-11-05T11:29:27.168Z"
        },
        ...
    ]
}
```
_Response (401 - Unauthorized)_

```json
{
    "name": "Authentication Error",
    "message": "You are note authorized"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "name": "Internal server error",
  "message": <string>
}
```
