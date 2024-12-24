import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MovieDto } from '../interfaces/movie.interface';
import { Page } from '../interfaces/page';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  // imports: [CommonModule, HttpClientModule],
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  movies: any[] = []; 
  paginatedMovies: any[] = []; 
  movieDetails: any = null; 
  currentPage: number = 0; 
  pageSize: number = 4; 
  totalPages: number = 0; 


  constructor(
    // private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
      this.getAllMovies(); 
      this.getPaginatedMovies(); 
    }

    getAllMovies() {
      this.apiService.get<any[]>('user/movies/all-movies').subscribe({
        next: (response) => {
          this.movies = response;
          // console.log(response);
        },
        error: (error) => {
          console.error('Error fetching all movies:', error);
        },
      });
    }

    getPaginatedMovies() {
  const token = this.authService.getToken();
  if (!token) {
    console.error('No token found, user is not authenticated');
    return;  
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const params = new HttpParams()
    .set('page', this.currentPage.toString())
    .set('size', this.pageSize.toString());

  const apiUrl = 'user/movies/movies';
  console.log(`Calling API with URL: ${apiUrl} and parameters page: ${this.currentPage}, size: ${this.pageSize}`);

  this.apiService.get<Page<MovieDto>>(apiUrl, {params, headers}).subscribe({
    next: (response) => {
      this.paginatedMovies = response.content;
      this.totalPages = response.totalPages;
    },
    error: (error) => {
      if (error.status === 401) {
        console.error('Unauthorized access - Token might be expired or invalid');
      } else {
        console.error('Error fetching paginated movies:', error);
      }
    }
  });
}

    

    getMovieDetails(movieId: number) {

      const token = this.authService.getToken();
      if (!token) {
        console.error('No token found, user is not authenticated');
        return;  
      }
    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    

      const params = new HttpParams().set('movieId', movieId.toString());
      this.apiService.get<any>('user/movies/movie-detail', {params,headers}).subscribe({
        next: (response) => {
          this.movieDetails = response;
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
        },
      });
    }

    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.getPaginatedMovies();
      }
    }

    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.getPaginatedMovies();
      }
    }

    logout() {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }



}
