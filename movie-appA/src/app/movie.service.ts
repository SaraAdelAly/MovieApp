import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDetailsDto } from './interfaces/movie-details-dto';
import { MovieDto } from './interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'http://localhost:8081/api/user/movies';

  constructor(private http: HttpClient) {}


  // Fetch all movies (paginated)
  getMovies(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movies`, {
      params: { page: page.toString(), size: size.toString() },
    });
  }

  // Fetch all movies (non-paginated)
  getAllMovies(): Observable<MovieDto[]> {
    return this.http.get<MovieDto[]>(`${this.baseUrl}/all-movies`);
  }

  // Fetch movie details by ID
  getMovieDetails(movieId: number): Observable<MovieDetailsDto> {
    return this.http.get<MovieDetailsDto>(`${this.baseUrl}/movie-detail`, {
      params: { movieId: movieId.toString() },
    });
  }
}