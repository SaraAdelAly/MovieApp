import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MovieDetailsDto } from '../interfaces/movie-details-dto';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number | null = null;
  // movie: MovieDetailsDto | null = null;
  movieDetails: any = null; 
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id']; 
      if (this.movieId) {
        this.fetchMovieDetails(this.movieId); 
      } else {
        this.errorMessage = 'Movie ID is missing in the URL.';
      }
    });
  }

  fetchMovieDetails(movieId: number): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found, user is not authenticated.');
      this.errorMessage = 'User is not authenticated. Please log in.';
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('movieId', movieId.toString());

    this.apiService.get<MovieDetailsDto>('user/movies/movie-detail',{ params,  headers }).subscribe({
      next: (response) => {
        console.log('API Response:', response); 
        this.movieDetails = response;
      },
      error: (error) => {
        console.error('Error fetching movie details:', error);
        this.errorMessage = "Can't fetch movie details. Please try again later.";
      },
    });
  }

  goBack(): void {
    this.location.back(); 
  }
}
