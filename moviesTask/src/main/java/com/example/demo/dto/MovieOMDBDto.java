package com.example.demo.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Builder
public class MovieOMDBDto implements Serializable {

    private String title;
    private String year;
    private String genre;
    private String director;
    private String actors;
    private String plot;
    private String poster;
    private String imdbRating;
    private String boxOffice;

}
