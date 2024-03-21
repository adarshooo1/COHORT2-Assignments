# User Authentication API with Express, Mongoose, MongoDB, Zod, JSON Web Tokens (JWT), dotenv, and Nodemon

This is a Node.js application that provides API endpoints for user authentication using Express.js, Mongoose, MongoDB, Zod for validation, JSON Web Tokens (JWT) for session management, dotenv for environment variables, and Nodemon for automatic server restarting during development.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible remotely
- Basic understanding of JavaScript, Express.js, and MongoDB

## Installation

1. Clone this repository to your local machine:
   git clone <repository-url>

2. Navigate to the project directory:
   cd <project-directory>

3. Install dependencies using npm:
   npm install

4. Create a `.env` file in the root directory of the project and add the following environment variables:
   MONGO_URL=your-mongodb-connection-string
   PORT=3000
   JWT_SECRET=your-secret-key

## Project Structure

The project structure is organized as follows:

- `model/Users.js`: Defines the user schema and exports the User model.
- `middleware/auth.js`: Middleware for protecting routes with JWT authentication.
- `index.js`: Main entry point of the application. Defines the Express app, sets up routes for signup, login, and accessing user data, connects to MongoDB, and starts the server.
- `README.md`: Markdown file containing project documentation.

## User Schema

The user schema defines the structure of user documents in the MongoDB database. It includes fields for `username`, `email`, and `password`. The schema is defined using Mongoose's `Schema` class.

## API Endpoints

### 1. Signup

- Endpoint: `POST /signup`
- Request Body: JSON object containing user details (`username`, `email`, `password`)
- Response: JSON object with a success message if the user is created successfully, or an error message if the email is already in use.

### 2. Login

- Endpoint: `POST /login`
- Request Body: JSON object containing user login credentials (`email`, `password`)
- Response: Sets a JWT as an authorization header if the login is successful, or returns an error message if the credentials are invalid or the user does not exist.

### 3. Access User Data

- Endpoint: `GET /:email/data`
- Middleware: `auth` (JWT authentication)
- Request Parameters: `email` (user email)
- Response: Returns the user email if the JWT is valid and the user exists.

## Running the Application

To run the application, execute the following command in the terminal:
npm start

The server will start on the port specified in the `.env` file (default is port 3000). You can now access the API endpoints using a tool like Postman or by making HTTP requests from your frontend application.

## Development

During development, you can use Nodemon to automatically restart the server when changes are made to the code. Run the following command:
npm run dev

## Conclusion

This project provides a basic implementation of user authentication using Express.js and MongoDB. You can extend it further by adding features like password hashing, user roles, email verification, and more.

Feel free to explore the code and customize it according to your requirements!
