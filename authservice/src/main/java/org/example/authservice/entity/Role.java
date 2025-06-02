package org.example.authservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
public class Role {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_role",nullable = false)
    private int id_role;
    @Basic
    @Column(name = "role_name", nullable = false, length = 45)
    private String roleName;
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<Account> accounts;
}
