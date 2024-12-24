package com.example.demo.entity;


import lombok.Getter;

@Getter
public enum GenreType {
    UNKNOWN("Unknown"),
    ACTION("Action"),
    ADVENTURE("Adventure"),
    SPORTS("Sports"),
    DRAMA("drama"),
    HORROR("Horror"),
    THRILLER("Thriller"),
    SHOOTER("Shooter"),
    COMEDY("Comedy"),
    NARRATION("Narration"),
    ROMANCE("Romance"),
    ANIMATION("ANIMATION");
    private final String genre;


    GenreType(String genre){
        this.genre = genre;
    }

    public static GenreType fromString(String genreString) {
        if (genreString == null || genreString.isEmpty()) {
            return UNKNOWN;
        }
        for (GenreType type : values()) {
            if (type.genre.equalsIgnoreCase(genreString.trim())) {
                return type;
            }
        }
        return UNKNOWN;
    }
}
