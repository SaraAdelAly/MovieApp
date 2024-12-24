package com.example.demo.dto;

import com.example.demo.entity.GenreType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class MovieDto implements Serializable {

    private Integer id;
    private String title;
    private Double imdbRating;
    private GenreType genre;
    private String description;

}
