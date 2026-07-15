# JWT Lab

A Node.js, Express, MongoDB, and JWT authentication project for user signup, login, protected routes, and basic user CRUD operations.

## Features

- Express.js server setup
- MongoDB connection using Mongoose
- Environment variable configuration using dotenv
- User model with name, email, and password fields
- Password hashing using bcrypt
- User signup with required field validation
- Duplicate email check during signup
- User login with password verification
- JWT token generation on successful login
- JWT authentication middleware for protected routes
- Token expiry handling
- Get all users
- Get single user by id
- Update user by id
- Delete user by id
- JSON request and response handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt
- dotenv

## Project Structure

```txt
jwt-lab/
|-- configs/
|   |-- database.js
|   `-- envConfig.js
|-- controllers/
|   `-- user.controller.js
|-- middlewares/
|   `-- auth.js
|-- models/
|   `-- User.js
|-- routers/
|   `-- user.route.js
|-- .env
|-- package.json
|-- README.md
`-- server.js
```

## Installation

Install project dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and add these values:

```env
PORT=200
MONGODB_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
```

Example local MongoDB URL:

```env
MONGODB_URL=mongodb://127.0.0.1:27017/jwt-lab
```

## Run The Project

Start the server:

```bash
npm start
```

If nodemon is installed, you can run:

```bash
npm run dev
```

Server URL:

```txt
http://localhost:200
```

## API Base URL

```txt
http://localhost:200/api/user
```

Use your own `PORT` value if you changed it in `.env`.

## Authentication Flow

1. Create a user with the signup API.
2. Login with email and password.
3. Copy the JWT token from the login response.
4. Send the token in the `Authorization` header for protected routes.

Authorization header format:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

## API Routes

| Method | Route | Auth Required | Description |
| --- | --- | --- | --- |
| GET | `/` | No | Check server response |
| POST | `/api/user` | No | Create user directly |
| POST | `/api/user/signup` | No | Signup/register new user |
| POST | `/api/user/login` | No | Login user and get JWT token |
| GET | `/api/user` | Yes | Get all users |
| GET | `/api/user/:id` | Yes | Get one user by id |
| PATCH | `/api/user/:id` | Yes | Update user by id |
| DELETE | `/api/user/:id` | Yes | Delete user by id |

## Signup User

Recommended route for creating a new account:

```txt
POST /api/user/signup
```

Request body:

```json
{
  "name": "manan",
  "email": "manan@gmail.com",
  "password": "1234"
}
```

Success response:

```json
{
  "success": true,
  "message": "Signup Successfull",
  "user": {
    "name": "manan",
    "email": "manan@gmail.com",
    "password": "hashed_password"
  }
}
```

## Login User

```txt
POST /api/user/login
```

Request body:

```json
{
  "email": "manan@gmail.com",
  "password": "1234"
}
```

Success response:

```json
{
  "success": true,
  "message": "User Information",
  "user": {
    "name": "manan",
    "email": "manan@gmail.com",
    "password": "hashed_password"
  },
  "token": "jwt_token_here"
}
```

## Create User Directly

```txt
POST /api/user
```

Request body:

```json
{
  "name": "rahul",
  "email": "rahul@gmail.com",
  "password": "1234"
}
```

This route creates a user and hashes the password, but signup is better for normal registration because signup also checks required fields and duplicate email.

## Get All Users

Protected route:

```txt
GET /api/user
```

Headers:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

## Get One User

Protected route:

```txt
GET /api/user/:id
```

Example:

```txt
GET /api/user/USER_ID_HERE
```

Headers:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

## Update User

Protected route:

```txt
PATCH /api/user/:id
```

Request body example:

```json
{
  "name": "updated name",
  "email": "updated@gmail.com"
}
```

Headers:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

## Delete User

Protected route:

```txt
DELETE /api/user/:id
```

Headers:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

## Error Responses

Common error response examples:

```json
{
  "success": false,
  "message": "All fields are required.."
}
```

```json
{
  "success": false,
  "message": "User Exists.."
}
```

```json
{
  "success": false,
  "message": "Wrong Password"
}
```

```json
{
  "success": false,
  "message": "Please Login again"
}
```

## Important Notes

- Use `/api/user/signup`, not `/api/user/sinup`.
- Signup and login do not need a token.
- Get, update, and delete routes need a JWT token.
- Passwords are stored as bcrypt hashed values.
- Login tokens expire in 1 day.
- Keep `SECRET_KEY` private and do not share your `.env` file.

## Scripts

```bash
npm start
```

Runs the server using Node.js.

```bash
npm run dev
```

Runs the server using nodemon if nodemon is available.
