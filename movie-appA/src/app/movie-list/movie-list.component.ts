import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MovieDto } from '../interfaces/movie.interface';
import { HttpParams } from '@angular/common/http';


@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
    movies: MovieDto[] = [];
    currentPage: number = 0;
    pageSize: number = 4;
    totalPages: number = 0;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.fetchMovies();
    }
    fetchMovies() {
        let params = new HttpParams();
        params = params.set('page', this.currentPage);
        params = params.set('size', this.pageSize);

        this.apiService.get<any>('admin/movies/movies',{params}).subscribe(
            (response) => {
               this.movies = response.content;
                this.totalPages = response.totalPages;
            },
            (error) => {
                console.error('Error fetching movies', error);
            }
        );
    }
    
    onPageChange(newPage: number): void {
      if(newPage >= 0 && newPage < this.totalPages) {
            this.currentPage = newPage;
             this.fetchMovies();
        }
    }

    
    getPages(): number[] {
     return Array(this.totalPages).fill(0).map((x, i) => i);
    }
}