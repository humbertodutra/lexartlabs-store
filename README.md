# lexartlabs-store

You can see it alive at:

https://lexartlabs-store-client.vercel.app/ (FRONT)
https://lexartlabs-store-server.vercel.app/ (API)

## BACKEND

### 1. Description
A brief description of what the application does and the problem it solves. This backend serves as the core of the `lexartlabs-store`, handling user authentication, product management, and more, providing a robust API for the frontend to interact with.

### 2. Technologies Used
- Node.js
- Express
- Vercel Postgres
- Sequelize
- JWT for authentication
- bcrypt

### 3. Setup Instructions

Clone the repository:

```bat
git clone git@github.com:humbertodutra/lexartlabs-store.git
cd lexartlabs-store
cd server
npm install
```

#### Database Configuration
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=your_host
POSTGRES_DATABASE="verceldb"

#### JWT Token Secret
MY_SECRET=your_jwt_secret


## 4. Starting the Server

Inside the server (backend) folder, start the server with:

```bat
npm start
```


## 5. How to Use

### 5.1 -  Authentication:: 

Use this endpoint to register a new account.

POST - /api/users/register

Request Body:
{
  "email": "example@example.com",
  "password": "example123"
}

Successful Response (Status: 201):

{
    "id": 12,
    "email": "example@example.com",
    "password": "$2b$10$I7hswiWbOf8hp5TpuOwnEejxVS8hCrqUKpRak1XwLtMc4kVbW0GGK",
    "updatedAt": "2024-03-06T16:55:05.128Z",
    "createdAt": "2024-03-06T16:55:05.128Z"
}

### 5.2 - Login:

POST - /api/users/login

Request Body:


{
  "email": "example@example.com",
  "password": "example123"
}

Successful Response (Status: 200):

{
    "email": "example@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MDk3NDQxNzQsImV4cCI6MTcwOTc1MTM3NH0.sTrxQM7emrZJUv2QxEc7WvyXfhblQLq2T6KpYiR-q4I"
}

### 5.3 - Working with Product Routes:


Add the following field to your request header, using the token received above: 

authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MDk3NDQxNzQsImV4cCI6MTcwOTc1MTM3NH0.sTrxQM7emrZJUv2QxEc7WvyXfhblQLq2T6KpYiR-q4

#### 5.3.1 - List All Products:

GET - /api/products

#### 5.3.2 - Find Products by ID:

GET - /api/products/:id'

#### 5.3.3 - Adding Products:

POST - /products/add

Request Body Examples:

Format 1:

{
   "name": "Xiaomi Redmi 9",
   "brand": "Xiaomi",
   "model": "Redmi 9",
   "price": 10000,
   "color": "red"
}


Format 2: 

{
   "name": "Xiaomi Redmi 9",
   "details": {
       "brand": "Xiaomi",
       "model": "Redmi 9",
       "color": "red"
   },
   "price": 10000
}

Format 3:

[
   {
      "name": "Xiaomi Redmi 9",
      "brand": "Xiaomi",
      "model": "Redmi 9",
      "data": [
         {
            "price": 10000,
            "color": "red"
         },
         {
            "price": 10000,
            "color": "blue"
         }
      ]
   },
   {
      "name": "Iphone 14 Pro",
      "brand": "Iphone",
      "model": "14 Pro",
      "data": [
         {
            "price": 30000,
            "color": "silver"
         },
         {
            "price": 30100,
            "color": "gold"
         }
      ]
   }
]

#### 5.3.4 - Editing Products:

PUT - /api/products/:id

*You can get the product ID from item 5.3.1.

Request Body Examples:

{
   "name": "Xiaomi Redmi 9",
   "details": {
       "brand": "Xiaomi",
       "model": "Redmi 9",
       "color": "red"
   },
   "price": 10000
}

or 

{
   "name": "Xiaomi Redmi 9",
   "brand": "Xiaomi",
   "model": "Redmi 9",
   "price": 10000,
   "color": "red"
}


#### 5.3.5 - Deleting a Product:

DELETE - /api/products/:id
Successful Response:
{
    "message": "Product deleted successfully"
}




# FRONTEND


### 1. Technologies Used
- React.js
- JS

### 2. Setup Instructions

Clone the repository:

```bat
git clone git@github.com:humbertodutra/lexartlabs-store.git
cd lexartlabs-store
cd client
npm install
```
### 3. Start the server

```bat
npm start
```
