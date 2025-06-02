package com.phucnghia.user.service.Impl;

import com.phucnghia.user.dto.request.UserRequest;
import com.phucnghia.user.entity.User;
import com.phucnghia.user.repository.UserRepository;
import com.phucnghia.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với ID: " + id));
    }

    @Override
    public User createUser(UserRequest request) {
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(Long id, UserRequest request) {
        User existingUser = userRepository.findById(id).orElseThrow(()-> new RuntimeException("Khong tim thay user"+ id));

        existingUser.setName(request.getName());
        existingUser.setEmail(request.getEmail());
        existingUser.setPassword(request.getPassword());

        return userRepository.save(existingUser);
    }
}
