package com.example.demo.controller;


import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.CreatedUserDto;
import com.example.demo.dto.UserLoginDto;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    private final UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> signUpUser (@RequestBody CreatedUserDto createUserDto){
        return ResponseEntity.ok(userService.saveUser(createUserDto));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody UserLoginDto request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/email/check")
    public boolean checkEmailValid(@RequestBody String email){
        return userService.checkEmailValid(email);
    }


}
