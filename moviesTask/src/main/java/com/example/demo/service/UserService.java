package com.example.demo.service;


import com.example.demo.config.JwtService;
import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.CreatedUserDto;
import com.example.demo.dto.UserLoginDto;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;





    public AuthResponse saveUser(CreatedUserDto createdUserDto) {
        User user = userMapper.toEntity(createdUserDto);

        if (createdUserDto.getIsAdmin() != null) {
            user.setIsAdmin(createdUserDto.getIsAdmin());
        } else {
            user.setIsAdmin((byte) 0x00);
        }

        user.setPassword(passwordEncoder.encode(createdUserDto.getPassword()));
        user = userRepository.save(user);

        Map<String,Object> claims = new HashMap<>();
        claims.put("isAdmin", user.getIsAdmin());
        claims.put("id", user.getId());

        String jwtToken = jwtService.generateToken(claims, user);
        return AuthResponse.builder().token(jwtToken).build();
    }


    public boolean checkEmailValid(String email){
        return userRepository.existsByEmailIgnoreCase(email);
    }

    public boolean checkUserValid(UserLoginDto user) {
        return userRepository.existsByEmailIgnoreCaseAndPassword(user.getEmail() , user.getPassword());
    }
    public AuthResponse authenticate(UserLoginDto userLoginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDto.getEmail(),
                        userLoginDto.getPassword()
                )
        );
        User user = userRepository.findByEmailIgnoreCase(userLoginDto.getEmail())
                .orElseThrow();
        Map<String,Object> claims = new HashMap<>();
        claims.put("isAdmin",user.getIsAdmin());
        claims.put("id",user.getId());
        String jwtToken = jwtService.generateToken(claims,user);
        return AuthResponse.builder().token(jwtToken).build();
    }
    public Integer getUserId(String email){
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(User::getId).orElse(null);
    }


}
