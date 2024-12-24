package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
//@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User implements Serializable, UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Size(max = 45)
    @NotNull
    @Column(name = "email", nullable = false, length = 45)
    private String email;

    @Size(max = 250)
    @NotNull
    @Column(name = "password", nullable = false, length = 250)
    private String password;


    @NotNull
    @Column(name = "is_admin" ,nullable = false ,columnDefinition="default '0'")
    private Byte isAdmin;

    public Integer getId() {
        return id;
    }

    public void setIsAdmin(Byte isAdmin) {
        this.isAdmin = isAdmin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public Byte getIsAdmin() {
        return isAdmin;
    }

    public String getPassword() {
        return password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(isAdmin == 1 ? "ROLE_ADMIN" : "ROLE_USER"));
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}

