package com.example.demo.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class MovieListOMDBDto implements Serializable {

    private String title;
    private String year;
    private String imdbID;
    private String type;
    private String poster;

}
