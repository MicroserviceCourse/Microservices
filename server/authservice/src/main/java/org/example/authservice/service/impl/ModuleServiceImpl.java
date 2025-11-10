package org.example.authservice.service.impl;

import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.example.authservice.dto.request.ModuleRequest;
import org.example.authservice.dto.response.ModuleResponse;
import org.example.authservice.entity.Module;
import org.example.authservice.mapper.ModuleMapper;
import org.example.authservice.repository.ModuleRepository;
import org.example.authservice.service.ModuleService;
import org.example.commonsecurity.SecurityUtils;
import org.example.commonutils.util.SearchHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.xml.sax.ErrorHandler;

import java.util.List;

@Slf4j
@Service
public class ModuleServiceImpl implements ModuleService {
    private final ModuleRepository moduleRepository;
    private final ModuleMapper mapper;
    private static final List<String> SEARCH_FIELDS = List.of("code", "name");
    private final SecurityUtils securityUtils;
    @Autowired
    public ModuleServiceImpl(
            ModuleRepository moduleRepository,
            ModuleMapper mapper,
            SecurityUtils securityUtils
            ) {
        this.moduleRepository = moduleRepository;
        this.mapper = mapper;
        this.securityUtils = securityUtils;
    }

    @Override
    public void create(ModuleRequest module) {
        try {
            log.info("start create module");
            Module moduleEntity = mapper.toEntity(module, securityUtils.getCurrentUserId());
            moduleRepository.save(moduleEntity);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Page<ModuleResponse> findAll(Integer page, Integer size, String sort, String searchField, String SearchValue, String filter, boolean all) {
        try {
            log.info("start find all module");
            Specification<Module> sortable = RSQLJPASupport.toSort(sort);
            Specification<Module> filterable = RSQLJPASupport.toSpecification(filter);
            Specification<Module> searchable = SearchHelper.buildSearchSpec(searchField, SearchValue, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            return moduleRepository.findAll(sortable.and(filterable).and(searchable.and(filterable)), pageable).map(mapper::toResponse);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void update(ModuleRequest module,Long id) {
        try {
            log.info("start update module");
            Module moduleEntity = moduleRepository.getReferenceById(id);
            mapper.update(module,moduleEntity,securityUtils.getCurrentUserId());
            moduleRepository.save(moduleEntity);
        }catch (EntityNotFoundException e){
            log.warn("Module with id {} not found:{}",id,e.getMessage());
        }
    }

    @Override
    public void updateStatus(Long id, Boolean status) {
        try {
            log.info("start update module status");
            Module moduleEntity = moduleRepository.getReferenceById(id);
            moduleEntity.setIsActive(status);
            moduleRepository.save(moduleEntity);
        }catch (EntityNotFoundException e){
            log.warn("Module with id {} not found:{}",id,e.getMessage());
        }
    }
}
