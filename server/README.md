# QuickNotes

QuickNotes is a simple note-taking application built with Node.js, Express, MongoDB, and Mongoose. It allows users to register, log in, create, read, update, and delete notes. The application uses JWT for authentication and bcrypt for password hashing.

## Project Structure

```
.
├── .env
├── .gitignore
├── app.js
├── controllers
│   ├── notesController.js
│   └── userController.js
├── middleware
│   └── authmiddleware.js
├── models
│   ├── notesModel.js
│   └── userModel.js
├── package.json
├── routes
│   ├── notesRoute.js
│   └── userRoute.js
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/zedd1721/QuickNotes.git
   cd keepnotes
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_DB=your_mongodb_connection_string
   JWT=your_jwt_secret
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### User Routes

- **Register User**
  - **URL:** `/api/user/register`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User created",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "token": "jwt_token"
    }
    ```

- **Login User**
  - **URL:** `/api/user/login`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Login successful",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "token": "jwt_token"
    }
    ```

### Notes Routes

- **Create Note**
  - **URL:** `/api/notes`
  - **Method:** `POST`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Body:**
    ```json
    {
      "title": "Note Title",
      "content": "Note Content",
      "pinned": false
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Note created",
      "note": {
        "title": "Note Title",
        "content": "Note Content",
        "pinned": false,
        "owner": "user_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "__v": 0
      }
    }
    ```

- **Get Notes**
  - **URL:** `/api/notes`
  - **Method:** `GET`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Response:**
    ```json
    {
      "notes": [
        {
          "title": "Note Title",
          "content": "Note Content",
          "pinned": false,
          "owner": "user_id",
          "createdAt": "timestamp",
          "updatedAt": "timestamp",
          "__v": 0
        }
      ]
    }
    ```

- **Update Note**
  - **URL:** `/api/notes/:noteId`
  - **Method:** `PUT`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Body:**
    ```json
    {
      "title": "Updated Note Title",
      "content": "Updated Note Content",
      "pinned": true
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Notes updated Successfully",
      "note": {
        "title": "Updated Note Title",
        "content": "Updated Note Content",
        "pinned": true,
        "owner": "user_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "__v": 0
      }
    }
    ```

- **Delete Note**
  - **URL:** `/api/notes/:noteId`
  - **Method:** `DELETE`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer jwt_token"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Deleted",
      "success": true
    }
    ```

## Middleware

### Auth Middleware

- **File:** authmiddleware.js
- **Description:** This middleware checks for a valid JWT token in the `Authorization` header and attaches the user to the request object.

## Models

### User Model

- **File:** userModel.js
- **Description:** Defines the schema for the User model, including fields for `name`, `email`, `password`, and `notes`.

### Notes Model

- **File:** notesModel.js
- **Description:** Defines the schema for the Notes model, including fields for `title`, `content`, `pinned`, and `owner`.

## Controllers

### User Controller

- **File:** userController.js
- **Description:** Contains functions for registering and logging in users, including password hashing and JWT token generation.

### Notes Controller

- **File:** notesController.js
- **Description:** Contains functions for creating, reading, updating, and deleting notes.

## Routes

### User Routes

- **File:** userRoute.js
- **Description:** Defines the routes for user registration and login.

### Notes Routes

- **File:** notesRoute.js
- **Description:** Defines the routes for creating, reading, updating, and deleting notes.

## Environment Variables

- **MONGO_DB:** Your MongoDB connection string.
- **JWT:** Your JWT secret key.

## License

This project is licensed under the MIT License.
```