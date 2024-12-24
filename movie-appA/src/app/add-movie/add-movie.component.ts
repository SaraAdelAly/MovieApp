import { Component } from '@angular/core';
import { MovieDto } from '../interfaces/movie.interface';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { CreateMovieDto } from '../interfaces/create-movie-dto';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})


export class AddMovieComponent {
  addMovieForm: FormGroup;
  // movie: MovieDto = { title: '', genre: '', description: '', imdbRating: 0 };
  errorMessage: string = '';
  loading = false;  

    constructor(private apiService: ApiService, 
      private _formBuilder: FormBuilder,
      private router: Router,
      private location: Location,
      private authService: AuthService) {
        this.addMovieForm = this._formBuilder.group({
          title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          genre: ['', [Validators.required]],
          description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
          imdbRating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      });
      }

  submitForm(): void {
    const movie:CreateMovieDto = this.addMovieForm.value;
    const token = this.authService.getToken();
  if (!token) {
    console.error('No token found, user is not authenticated');
    return;
  }
  this.loading = true;

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.apiService.post<MovieDto, MovieDto>('admin/movies/add-movie', movie as MovieDto,{headers}).subscribe({
      next: (response) => {
        alert('Movie added successfully!');
      
        alert(`Movie "${response.title}" added successfully!`);

        this.router.navigate(['/admin-dashboard']);
      },
      error: (error) => {
        console.error('Error adding movie:', error);
      this.errorMessage = 'Failed to add the movie.';

      },
    });
  }

  goBack(): void {
    this.location.back(); 
  }
}

