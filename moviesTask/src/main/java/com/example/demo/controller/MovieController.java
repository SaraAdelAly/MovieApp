package com.example.demo.controller;

import com.example.demo.dto.MovieDetailsDto;
import com.example.demo.dto.MovieDto;
import com.example.demo.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/all-movies")
   public ResponseEntity<List<MovieDto>> findAllMovies (){
       return ResponseEntity.ok(movieService.findAllMovies());
   }

    @GetMapping("/movies")
    public Page<MovieDto> findAllMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ) {
        return movieService.findAllMovies(page, size);
    }

    @GetMapping("/movie-detail")
    public ResponseEntity<MovieDetailsDto> getMovieDetails (@RequestParam Integer movieId){
        return ResponseEntity.ok(movieService.getMovieDetail(movieId));
    }

}

