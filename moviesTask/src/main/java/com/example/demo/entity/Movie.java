package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
@Getter
@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Size(max = 250)
    @Column(name = "title", nullable = false)
    private String title;

//    @NotNull
    @Transient
    @Column(name = "year_of_creation", nullable = false)
    private Integer yearOfCreation= 2023;

    @Size(max = 10)
    @Column(name = "rated")
    private String rated;


    @Size(max = 1000)
    @Column(name = "description")
    private String description;

    @Column(name = "imdb_rating")
    private Double imdbRating;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "genre", nullable = false)
    private GenreType genre;
}


