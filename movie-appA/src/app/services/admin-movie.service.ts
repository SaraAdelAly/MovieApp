import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MovieDto } from "../interfaces/movie.interface";
import { MovieListOMDBDto } from "../interfaces/movie-list-omdbdto";
import { MovieMovieOMDBDto } from "../interfaces/movie-movie-omdbdto";

@Injectable({
  providedIn: 'root',
})
export class AdminMovieService {
  private baseUrl = 'http://localhost:8081/api/admin/movies';

  constructor(private http: HttpClient) {}



    addMovie(movie: MovieDto): Observable<MovieDto> {
      return this.http.post<MovieDto>(`${this.baseUrl}/add-movie`, movie);
    }

  searchMoviesFromOMDBByKeyWord(keyWord: string): Observable<MovieListOMDBDto[]> {
    const params = new HttpParams().set('keyWord', keyWord);
    return this.http.get<MovieListOMDBDto[]>(`${this.baseUrl}/search-OMDB-Movies`, { params });
  }

  fetchMovieFromOMDBByImdbID(imdbID: string): Observable<MovieMovieOMDBDto> {
    const params = new HttpParams().set('imdbID', imdbID);
    return this.http.get<MovieMovieOMDBDto>(`${this.baseUrl}/search/imdbID`, { params });
  }

  fetchMovieFromOMDBByTitle(title: string): Observable<MovieMovieOMDBDto> {
    const params = new HttpParams().set('title', title);
    return this.http.get<MovieMovieOMDBDto>(`${this.baseUrl}/search/title`, { params });
  }

  getAllMovies(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/movies`, { params });
  }

  findAllMovies(): Observable<MovieDto[]> {
    return this.http.get<MovieDto[]>(`${this.baseUrl}/all`);
  }

  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${movieId}`);
  }

}
