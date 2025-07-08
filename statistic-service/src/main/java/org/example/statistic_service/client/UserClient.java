package org.example.statistic_service.client;

import org.example.statistic_service.dto.RequestResponse;
import org.example.statistic_service.dto.StatisticUserRequest;
import org.example.statistic_service.dto.StatisticUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "authservice", url = "http://localhost:8585/api/user")
public interface UserClient {

    @PostMapping(value = "/statistic-user")
    RequestResponse<StatisticUserResponse> getUserStatistic(@RequestParam String label, @RequestBody StatisticUserRequest request);
}



