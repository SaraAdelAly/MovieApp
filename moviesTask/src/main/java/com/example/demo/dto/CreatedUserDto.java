package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;


@Setter
@Getter
@Data
@NoArgsConstructor
@ToString
public class CreatedUserDto implements Serializable {

    @NotNull
    private String name;
    @NotNull
    private String password;
    @NotNull
    private String email;
    @NotNull
    private String phone;
    private Byte isAdmin;
}
