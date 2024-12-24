package com.example.demo.util.exception;

public class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException(String message) {
        super(message);
    }
}
