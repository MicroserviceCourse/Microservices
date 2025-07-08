package org.example.orderservice.repository;

import org.example.orderservice.entity.Order;
import org.example.orderservice.generic.IRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends IRepository<Order,Integer> {
    @Query(value = """
            SELECT DISTINCT o.*
               FROM orders o
               JOIN order_items i ON o.id = i.order_id
               WHERE o.user_id = :userId
                 AND i.product_id = :productId
               """, nativeQuery = true)
    List<Order> findOrder(int userId, int productId);

    @Query(value = """
    SELECT DATE(o.created_at) AS label,
           SUM(oi.quantity) AS totalQuantity,
           SUM(oi.total_price) AS totalRevenue
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.order_status = :orderStatus
      AND o.created_at BETWEEN :start AND :end
    GROUP BY DATE(o.created_at)
    ORDER BY label
""", nativeQuery = true)
    List<Object[]> getOrderStatsByDay(@Param("orderStatus") String orderStatus,
                                      @Param("start") LocalDateTime start,
                                      @Param("end") LocalDateTime end);

    @Query(value = """
    SELECT DATE_FORMAT(o.created_at, '%Y-%m') AS label,
           SUM(oi.quantity) AS totalQuantity,
           SUM(oi.total_price) AS totalRevenue
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.order_status = :orderStatus
      AND o.created_at BETWEEN :start AND :end
    GROUP BY DATE_FORMAT(o.created_at, '%Y-%m')
    ORDER BY label
""", nativeQuery = true)
    List<Object[]> getOrderStatsByMonth(@Param("orderStatus") String orderStatus,
                                        @Param("start") LocalDateTime start,
                                        @Param("end") LocalDateTime end);

    @Query(value = """
    SELECT DATE_FORMAT(o.created_at, '%Y') AS label,
           SUM(oi.quantity) AS totalQuantity,
           SUM(oi.total_price) AS totalRevenue
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.order_status = :orderStatus
      AND o.created_at BETWEEN :start AND :end
    GROUP BY DATE_FORMAT(o.created_at, '%Y')
    ORDER BY label
""", nativeQuery = true)
    List<Object[]> getOrderStatsByYear(@Param("orderStatus") String orderStatus,
                                       @Param("start") LocalDateTime start,
                                       @Param("end") LocalDateTime end);


    @Query(value = """
    SELECT 
        oi.product_id,
        SUM(oi.quantity) AS total_sold,
        SUM(oi.total_price) AS total_revenue
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE o.order_status = 'SHIPPED'
      AND o.created_at BETWEEN :timeStart AND :timeEnd
    GROUP BY oi.product_id
    ORDER BY total_revenue DESC
    LIMIT :top
""", nativeQuery = true)
    List<Object[]> findTopBestSellingProductsByTimeRange(
            @Param("timeStart") LocalDateTime timeStart,
            @Param("timeEnd") LocalDateTime timeEnd,
            @Param("top") int top
    );
    @Query("SELECT o FROM Order o WHERE o.userId = :userId")
    Page<Order> findByUserId(@Param("userId") int userId, Pageable pageable);
}