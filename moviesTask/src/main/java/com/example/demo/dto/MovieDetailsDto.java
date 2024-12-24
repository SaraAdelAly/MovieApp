package com.example.demo.dto;

import com.example.demo.entity.GenreType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class MovieDetailsDto implements Serializable {

    private String title;
    private String description;

    private Double imdbRating;
    private GenreType genre;


}
