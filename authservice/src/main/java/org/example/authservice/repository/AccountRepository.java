package org.example.authservice.repository;
import org.example.authservice.dto.response.StatisticUserResponse;
import org.example.authservice.entity.Account;
import org.example.authservice.generic.IRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
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
}
