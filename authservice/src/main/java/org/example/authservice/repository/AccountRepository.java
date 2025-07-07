package org.example.authservice.repository;
import org.example.authservice.dto.response.StatisticUserResponse;
import org.example.authservice.entity.Account;
import org.example.authservice.generic.IRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AccountRepository extends IRepository<Account,Integer> {
    Optional<Account>findByEmail(String email);

    @Query(value = "SELECT\n" +
            "    (SELECT COUNT(*)\n" +
            "     FROM account\n" +
            "     WHERE DATE(created_at) BETWEEN DATE(:timeStart) AND DATE(:timeEnd)\n" +
            "    ) AS users_on_input,\n" +
            "\n" +
            "    (SELECT COUNT(*) FROM account) AS total_users;\n", nativeQuery = true)
    StatisticUserResponse getStatisticUser(LocalDateTime timeStart, LocalDateTime timeEnd);

    @Query(value = """
        SELECT DATE(created_at) AS label, COUNT(*) AS count
        FROM account
        WHERE created_at BETWEEN :start AND :end
        GROUP BY DATE(created_at)
        ORDER BY label
    """, nativeQuery = true)
    List<Object[]> getByDay(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query(value = """
        SELECT DATE_FORMAT(created_at, '%Y-%m') AS label, COUNT(*) AS count
        FROM account
        WHERE created_at BETWEEN :start AND :end
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY label
    """, nativeQuery = true)
    List<Object[]> getByMonth(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query(value = """
        SELECT DATE_FORMAT(created_at, '%Y') AS label, COUNT(*) AS count
        FROM account
        WHERE created_at BETWEEN :start AND :end
        GROUP BY DATE_FORMAT(created_at, '%Y')
        ORDER BY label
    """, nativeQuery = true)
    List<Object[]> getByYear(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
