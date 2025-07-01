package org.example.cartservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "carts")
public class Cart {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    private int userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Double totalPrice;
    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL)
    private List<CartItem>items=new ArrayList<>();
}
