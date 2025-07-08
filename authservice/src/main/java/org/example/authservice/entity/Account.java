package org.example.authservice.entity;

import jakarta.persistence.*;

import lombok.*;
import org.example.authservice.entity.enu.Provider;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "account")
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

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @OneToOne
    private User user;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String authCode;
    // dùng để lưu code lúc đăng kí tài khoản hoặc lúc reset password, là null nếu đăng kí hoặc đổi mật khẩu thành công

    private LocalDateTime expirationTimeResetPass;

    private LocalDateTime expirationTimeRegistry;

    private int userRequestAttemptCount = 0;
    // dùng để lưu số lần yêu cầu xác thực đăng kí tài khoản hoặc yêu cầu đổi mật khẩu

    private boolean is_Active;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + role.getRoleName());
    }

    @Override
    public String getUsername() {
        return email;
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
