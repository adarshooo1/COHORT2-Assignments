# User Login and Registration with Profile Access

This is a simple Node.js application that provides APIs for user registration, user login, and accessing user profiles.

## Setup Instructions

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.
5. The server will be running on `http://localhost:3000`.

## API Endpoints

### 1. Register a New User

- Endpoint: `POST /register`
- Request Body: JSON object containing user details (`name`, `username`, `password`)
- Response: JSON object containing a JWT token for the registered user

### 2. User Login

- Endpoint: `POST /login`
- Request Body: JSON object containing user credentials (`username`, `password`)
- Response: JSON object containing a JWT token for the logged-in user

### 3. Get User Profile

- Endpoint: `GET /:username/about`
- Authorization: Requires a valid JWT token in the `Authorization` header
- Response: JSON object containing profile information for the specified username

## Sample Data

The application uses an in-memory array of user objects for demonstration purposes. You can customize this data or integrate it with a database as needed.

## Dependencies

- Express.js: Web framework for Node.js
- body-parser: Middleware to parse JSON request bodies
- zod: Runtime type checking for JavaScript
- jsonwebtoken: JSON Web Token implementation for Node.js
