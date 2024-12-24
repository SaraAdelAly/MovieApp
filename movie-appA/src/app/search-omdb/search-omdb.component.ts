import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { MovieListOMDBDto } from '../interfaces/movie-list-omdbdto';
import { FormsModule } from '@angular/forms';
import { CommonModule,Location } from '@angular/common';

@Component({
  selector: 'app-search-omdb',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './search-omdb.component.html',
  styleUrl: './search-omdb.component.css'
})
export class SearchOmdbComponent {

  searchKeyword: string = '';
  errorMessage: string = '';

  omdbMovies: MovieListOMDBDto[] = [];



  constructor(private apiService: ApiService, 
    private authService:AuthService,
    private location: Location,

  ) {}

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
  this.apiService.get<MovieListOMDBDto[]>(`admin/movies/search-OMDB-Movies`, {params, headers }).subscribe({
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
  goBack(): void {
    this.location.back(); 
  }
  //
}
