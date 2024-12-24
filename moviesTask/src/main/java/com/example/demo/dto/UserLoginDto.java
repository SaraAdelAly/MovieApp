package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Data
@NoArgsConstructor
public class UserLoginDto implements Serializable {
    @NotNull
    String email;
    @NotNull
    String password;

}
