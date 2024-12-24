package com.example.demo.controller;

import com.example.demo.dto.MovieDto;
import com.example.demo.dto.MovieListOMDBDto;
import com.example.demo.dto.MovieOMDBDto;
import com.example.demo.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/admin/movies")
public class MovieAdminController {

    private final MovieService movieService;


    @PostMapping("/add-movie")
    public ResponseEntity<MovieDto> addMovie (@RequestBody MovieDto movieDto){
        return ResponseEntity.ok(movieService.addMovie(movieDto));
    }

//    @PostMapping("/get-OMDB-Movies")
//    public ResponseEntity<List<MovieListOMDBDto>> getMoviesFromOMDBBYImdbId (@RequestBody List<String> imdbIds){
//        return ResponseEntity.ok(movieService.fetchMoviesFromOMDBBYImdbId(imdbIds));
//    }

    @GetMapping("/search-OMDB-Movies")
    public ResponseEntity<List<MovieListOMDBDto>> searchMoviesFromOMDBByKeyWord (@RequestParam String keyWord) {
        return ResponseEntity.ok(movieService.searchMoviesFromOMDBByKeyWord(keyWord));
    }

    @GetMapping("/search/title")
    public ResponseEntity<MovieOMDBDto> searchMovieFromOMDBByTitle(@RequestParam String title){
        return ResponseEntity.ok(movieService.fetchMovieFromOMDBByTitle(title));
    }

    @GetMapping("/search/imdbID")
    public ResponseEntity<MovieOMDBDto> searchMovieFromOMDBByImdbID(@RequestParam String imdbID){
        return ResponseEntity.ok(movieService.fetchMovieFromOMDBBYImdbId(imdbID));
    }
    @GetMapping("/movies")
    public Page<MovieDto> findAllMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ) {
        return movieService.findAllMovies(page, size);
    }
    @GetMapping("/all")
    public ResponseEntity<List<MovieDto>> findAllMovies (){
        return ResponseEntity.ok(movieService.findAllMovies());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Integer id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

}


//    @PostMapping("/add")
//    public ResponseEntity<MovieDto> addMovie(@RequestBody Map<String, String> payload) {
//        MovieDto movieDto = movieService.fetchMovieFromOMDB(payload.get("imdbId"));
//        return ResponseEntity.ok(movieService.addMovie(movieDto));
//    }
