# Movie Application - Frontend & Backend

This project consists of a frontend application built with Angular and a backend API built with Spring Boot.

## Technologies Used

### Frontend

*   **Angular:**  A framework for building web applications.
*  **TypeScript:** A superset of JavaScript that adds strong typing features.
*   **Angular CLI:**  A command-line interface for Angular development.
*  **Bootstrap**: A CSS framework for styling components

### Backend

*   **Spring Boot:**  A framework for building Java applications.
*   **Java:** The programming language for the backend.
*   **Spring Security:** For handling security, authentication and authorization.
*   **Lombok**: To generate boilerplate code.
*   **JJWT:** For JWT management.
*   **JPA**: For database access

## Project Structure

### Frontend (Angular)


![image](https://github.com/user-attachments/assets/b5eabc0b-5725-427c-be8e-2532d0213341)



### Backend (Spring Boot)

![image](https://github.com/user-attachments/assets/15339e63-04d7-4871-bc2e-9ab030871c4f)



## API Endpoints

Here's a list of the key API endpoints:

### Authentication (`/auth`):

*   **`POST /auth/register`**: Creates a new user account.
*   **`POST /auth/authenticate`**: Authenticates a user and returns a JWT.
*  **`POST /auth/email/check`**: Checks if email is valid

### User Endpoints (`/api/user/movies`):

*   **`GET /api/user/movies/all-movies`**: Returns a list of all movies.
*   **`GET /api/user/movies/movies?page={page}&size={size}`**: Returns a paginated list of movies.
*  **`GET /api/user/movies/movie-detail?movieId={id}`**: Returns details for a specific movie.

### Admin Endpoints (`/api/admin/movies`):

*   **`POST /api/admin/movies/add-movie`**: Adds a new movie to the database.
*    **`POST /api/admin/movies/get-OMDB-Movies`**: Gets a list of movies from OMDB by their Imdb ids
*  **`GET /api/admin/movies/search?keyWord={keyword}`**: Searches movies on OMDB by keyword.
*   **`GET /api/admin/movies/search/title?title={title}`**: Searches a movie from OMDB by title.
*    **`GET /api/admin/movies/search/imdbID?imdbID={imdbID}`**: Searches a movie from OMDB by its IMDB id
*   **`GET /api/admin/movies/movies?page={page}&size={size}`**: Returns a paginated list of movies in the database.
*   **`GET /api/admin/movies/all`**: Returns all the movies
*   **`DELETE /api/admin/movies/{id}`**: Deletes a movie from the database with the specified ID.

## Usage

1.  Start the backend server (Spring Boot).
2.  Start the frontend application (Angular).
3.  Access the application through `http://localhost:4200`.
4.  Use the available endpoints by clicking on their respective actions.



