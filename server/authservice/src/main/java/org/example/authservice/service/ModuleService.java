package org.example.authservice.service;

import org.example.authservice.dto.request.ModuleRequest;
import org.example.authservice.dto.response.ModuleResponse;
import org.example.authservice.entity.Module;
import org.springframework.data.domain.Page;

public interface ModuleService {
    void create(ModuleRequest module);

    Page<ModuleResponse> findAll(Integer page, Integer size, String sort, String searchField, String SearchValue, String filter, boolean all);

    void update(ModuleRequest module, Long id);

    void updateStatus(Long id,Boolean status);
}
