package org.example.orderservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.orderservice.Enum.PaymentStatus;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderPayment {
    @Id
    @GeneratedValue
    private int id;
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private String transactionId;
    private LocalDateTime paidAt;
}
