package org.example.authservice.entity;

import jakarta.persistence.*;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class Account  implements UserDetails{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_account",nullable = false)
    private int id;
    @Basic
    @Column(name = "email",nullable = false,length = 255,unique = true)
    private String email;
    @Basic
    @Column(name = "password")
    private String password;
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + role.getRoleName());
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
