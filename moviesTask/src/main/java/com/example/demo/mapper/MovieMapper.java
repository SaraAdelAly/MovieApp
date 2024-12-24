package com.example.demo.mapper;


import com.example.demo.dto.MovieDetailsDto;
import com.example.demo.dto.MovieDto;
import com.example.demo.entity.Movie;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)

public interface MovieMapper {


    Movie toEntity(MovieDto movieDto);
    MovieDto toMovieDto(Movie movie);

    Movie toEntity(MovieDetailsDto movieDto);
    MovieDetailsDto toMovieDetailsDto(Movie movie);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Movie partialUpdate(MovieDto movieDto, @MappingTarget Movie movie);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Movie partialUpdateFromDetails(MovieDetailsDto movieDetailsDto, @MappingTarget Movie movie);

}
