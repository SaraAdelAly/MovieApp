import { Component, OnInit } from '@angular/core';
import { AdminMovieService } from '../services/admin-movie.service';
import { MovieDto } from '../interfaces/movie.interface';
import { MovieListOMDBDto } from '../interfaces/movie-list-omdbdto';
import { MovieMovieOMDBDto } from '../interfaces/movie-movie-omdbdto';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  databaseMovies: MovieDto[] = [];
  omdbMovies: MovieListOMDBDto[] = [];
  searchKeyword: string = '';
  currentPage: number = 0;
  errorMessage: string = '';
  showAllMovies = false;


  constructor(
    // private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadDatabaseMovies();
  }

  redirectToAddMovie(): void {
    this.router.navigate(['/add-movie']);
  }

  redirectToSearchOMDB(): void {
    this.router.navigate(['/search-omdb']);
  }


  loadDatabaseMovies(): void {
    this.showAllMovies = true; // set the value to true
    const token = this.authService.getToken();
      if (!token) {
        console.error('No token found, user is not authenticated');
        return;  
      }
    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.apiService.get<MovieDto[]>('admin/movies/all',{headers}).subscribe({
      next: (response) => {
        this.databaseMovies = response;
        console.log('Database Movies:', response);
      },
      error: (error) => {
        console.error('Error fetching database movies:', error);
        this.errorMessage = 'Failed to load movies from the database.';
      },
    });
  }


  searchOMDBMovies(keyWord: string): void {
    if (!this.searchKeyword.trim()) {
      this.errorMessage = 'Please enter a search keyword.';
      return;
    }
    const token = this.authService.getToken();
      if (!token) {
        console.error('No token found, user is not authenticated');
        return;  
      }
    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('keyWord', keyWord);
  this.apiService.get<MovieListOMDBDto[]>(`/search-OMDB-Movies`, {params,headers }).subscribe({
      next: (response) => {
        this.omdbMovies = response;
        console.log('OMDB Movies:', response);
      },
      error: (error) => {
        console.error('Error searching OMDB movies:', error);
        this.errorMessage = 'Failed to search movies from OMDB.';
      },
    });
  }


  fetchMovieFromOMDBByImdbID(imdbID: string): void {
    if (!imdbID.trim()) {
      this.errorMessage = 'Please provide a valid IMDb ID.';
      return;
    }
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found, user is not authenticated');
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('imdbID', imdbID);
    this.apiService.get<MovieMovieOMDBDto>(`/search/imdbID`,{ params,  headers }).subscribe({
      next: (movie) => {
        console.log('OMDB Movie Details:', movie);
        alert(`Title: ${movie.title}\nPlot: ${movie.plot}\nDirector: ${movie.director}`);
      },
      error: (error) => {
        console.error('Error fetching movie by IMDb ID:', error);
        this.errorMessage = 'Failed to fetch the movie details.';
      },
    });
  }
  deleteMovie(movieId: number): void {
    if (!movieId) {
      this.errorMessage = 'Invalid movie ID.';
      return;
    }
    const token = this.authService.getToken();
      if (!token) {
        console.error('No token found, user is not authenticated');
        return;
      }
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.authService.getToken()}`
      );
      console.log('Headers being sent', headers);
      this.apiService.delete<void>('admin/movies', movieId, {headers}).subscribe({
        next: () => {

        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        this.databaseMovies = this.databaseMovies.filter((movie) => movie.id !== movieId);


        console.log(`Movie with ID ${movieId} deleted successfully.`);
      },
      error: (error) => {
        console.error('Error deleting movie:', error);
        this.errorMessage = 'Failed to delete the movie.';
      },
    });
  }
  
  loadMoreMovies(): void {
    this.currentPage++;
    this.loadDatabaseMovies();
  }
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/admin-login']);
  }
}