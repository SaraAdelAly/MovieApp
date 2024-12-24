package com.example.demo.mapper;


import com.example.demo.dto.CreatedUserDto;
import com.example.demo.entity.User;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User toEntity(CreatedUserDto createdUserDto);
    CreatedUserDto toDto(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User partialUpdate(CreatedUserDto createUserDto, @MappingTarget User user);
}