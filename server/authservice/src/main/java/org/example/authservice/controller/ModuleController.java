package org.example.authservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.authservice.dto.request.ModuleRequest;
import org.example.authservice.dto.response.ModuleResponse;
import org.example.authservice.entity.Module;
import org.example.authservice.service.ModuleService;
import org.example.commonutils.api.ApiResponse;
import org.example.commonutils.api.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/api/modules")
public class ModuleController {
    @Autowired
    private ModuleService  moduleService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Void>>create(@RequestBody ModuleRequest module){
        try {
            moduleService.create(module);
            return ResponseEntity.ok(ApiResponse.success("Create module successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(e.getMessage()));
        }
    }
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<PageResponse<ModuleResponse>>>getAll(@RequestParam(defaultValue = "1") int page,
                                                                           @RequestParam(defaultValue = "5") int size,
                                                                           @RequestParam(defaultValue = "id,desc") String sort,
                                                                           @RequestParam(required = false) String filter,
                                                                           @RequestParam(required = false) String searchField,
                                                                           @RequestParam(required = false) String searchValue,
                                                                           @RequestParam(required = false) boolean all){
        try {
            return ResponseEntity.ok(ApiResponse.success(new PageResponse<>(moduleService.findAll(page,size,sort,searchField,searchValue,filter,all))));
        }catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Get all modules failed: " + e.getMessage()));
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>>update(@PathVariable Long id,@RequestBody ModuleRequest module){
        try {
            moduleService.update(module,id);
            return ResponseEntity.ok(ApiResponse.success("Update module successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(e.getMessage()));
        }
    }
    @PatchMapping("/updateStatus/{id}")
    public ResponseEntity<ApiResponse<Void>>updateStatus(@PathVariable Long id,@RequestParam Boolean status){
        try {
            moduleService.updateStatus(id,status);
            return ResponseEntity.ok(ApiResponse.success("Update module status successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(e.getMessage()));
        }
    }
}
