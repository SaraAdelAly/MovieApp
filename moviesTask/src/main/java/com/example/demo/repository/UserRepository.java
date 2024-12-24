package com.example.demo.repository;

import com.example.demo.entity.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmailIgnoreCase(@NonNull String email);
    Optional<User> findByEmail( String email);
    boolean existsByEmailIgnoreCase(@NonNull String email);
    boolean existsByEmailIgnoreCaseAndPassword(@NonNull String email, @NonNull String password);
}
