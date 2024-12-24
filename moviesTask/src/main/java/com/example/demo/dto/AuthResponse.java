package com.example.demo.dto;

import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse implements Serializable {

    String token;

}