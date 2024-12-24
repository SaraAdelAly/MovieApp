package com.example.demo.service;

import com.example.demo.dto.MovieDetailsDto;
import com.example.demo.dto.MovieDto;
import com.example.demo.dto.MovieListOMDBDto;
import com.example.demo.dto.MovieOMDBDto;
import com.example.demo.entity.Movie;
import com.example.demo.mapper.MovieMapper;
import com.example.demo.repository.MovieRepository;
import com.example.demo.util.exception.MovieNotFoundException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;

    @Value("${omdb.api.key}")
    private String omdbApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public MovieOMDBDto fetchMovieFromOMDBBYImdbId(String imdbId) {
        String url = "http://www.omdbapi.com/?i=" + imdbId + "&apikey=" + omdbApiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject movieJson = new JSONObject(response.getBody());
        return mapToMovieOMDBDto(movieJson);
    }

    public MovieOMDBDto fetchMovieFromOMDBByTitle(String title) {
        String url = "http://www.omdbapi.com/?t=" + title + "&apikey=" + omdbApiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject movieJson = new JSONObject(response.getBody());
        return mapToMovieOMDBDto(movieJson);
    }

    public MovieListOMDBDto fetchMovieFromOMDBBYImdbIds(String imdbId) {
        String url = "http://www.omdbapi.com/?i=" + imdbId + "&apikey=" + omdbApiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject movieJson = new JSONObject(response.getBody());
        return mapToMovieDto(movieJson);
    }


    public List<MovieListOMDBDto> searchMoviesFromOMDBByKeyWord(String keyword) {
        String url = "http://www.omdbapi.com/?s=" + keyword + "&apikey=" + omdbApiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject jsonResponse = new JSONObject(response.getBody());
        if (!jsonResponse.has("Search")) {
            throw new MovieNotFoundException("No movies found for the keyword: " + keyword);
        }

        return jsonResponse.getJSONArray("Search").toList().stream()
                .map(movieObj -> mapToMovieDto(new JSONObject((Map<?, ?>) movieObj)))
                .collect(Collectors.toList());
    }

    private MovieOMDBDto mapToMovieOMDBDto(JSONObject movieJson) {
        return MovieOMDBDto.builder()
                .title(movieJson.optString("Title", "Unknown Title"))
                .year(movieJson.optString("Year"))
                .genre(movieJson.getString("Genre"))
                .poster(movieJson.optString("Poster", "No poster available"))
                .director(movieJson.getString("Director"))
                .actors(movieJson.getString("Actors"))
                .plot(movieJson.getString("Plot"))
                .imdbRating(movieJson.getString("imdbRating"))
                .boxOffice(movieJson.optString("BoxOffice"))
                .build();
    }

    private MovieListOMDBDto mapToMovieDto(JSONObject movieJson) {
        return MovieListOMDBDto.builder()
                .title(movieJson.optString("Title", "Unknown Title"))
                .year(movieJson.optString("Year"))
                .type(movieJson.getString("Type"))
                .poster(movieJson.optString("Poster", "No poster available"))
                .imdbID(movieJson.optString("imdbID", "00"))
                .build();
    }


    public List<MovieListOMDBDto> fetchMoviesFromOMDBBYImdbId(List<String> imdbIds) {
        return imdbIds.stream()
                .map(this::fetchMovieFromOMDBBYImdbIds)
                .collect(Collectors.toList());
    }

    public MovieDto addMovie(MovieDto movieDto) {
        Movie movie = movieRepository.save(movieMapper.toEntity(movieDto));
        return movieMapper.toMovieDto(movie);
    }

    public void deleteMovie(Integer id) {
        movieRepository.deleteById(id);
    }

    public List<MovieDto> findAllMovies() {
        List<Movie> movies = movieRepository.findAll();

        if (movies.isEmpty()) {
            throw new MovieNotFoundException("No movies found.");
        }

        return movies.stream()
                .map(movieMapper::toMovieDto)
                .collect(Collectors.toList());

    }

    public Page<MovieDto> findAllMovies(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> moviePage = movieRepository.findAll(pageable);
        if (moviePage.isEmpty()) {
            throw new MovieNotFoundException("No movies found.");
        }
        return moviePage.map(movieMapper::toMovieDto);
    }

    public MovieDetailsDto getMovieDetail(Integer movieId) {
        return movieMapper.toMovieDetailsDto(movieRepository.findById(movieId).orElseThrow(() -> new MovieNotFoundException("No Movie found")));
    }


//    public List<Movie> getAllMovies(int page, int size) {
//        Pageable pageable = (Pageable) PageRequest.of(page, size);
//        return movieRepository.findAll((Sort) pageable).getContent();
//    }

//    private GenreType parseGenre(String genreString) {
//        return GenreType.fromString(genreString.split(",")[0].trim());
//    }

    //    private Integer parseYear(String yearString) {
//        try {
//            return Integer.parseInt(yearString);
//        } catch (NumberFormatException e) {
//            return null;
//        }
//    }

//    private Double parseDouble(String doubleString) {
//        try {
//            return Double.parseDouble(doubleString);
//        } catch (NumberFormatException e) {
//            return null;
//        }
//    }


}


