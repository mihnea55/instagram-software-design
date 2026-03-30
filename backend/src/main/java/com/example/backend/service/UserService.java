package com.example.backend.service;

import com.example.backend.dto.UserResponseDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public UserResponseDto create(User user) {
        user.setPasswordHash(user.getPasswordHash());
        user.setCreatedAt(LocalDateTime.now());
        return toDto(userRepo.save(user));
    }

    public UserResponseDto getById(Long id) {
        return toDto(userRepo.findById(id).orElseThrow());
    }

    public List<UserResponseDto> getAll() {
        return userRepo.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public UserResponseDto update(Long id, User updated) {
        User user = userRepo.findById(id).orElseThrow();
        user.setName(updated.getName());
        user.setEmail(updated.getEmail());
        user.setUsername(updated.getUsername());
        user.setPhoneNumber(updated.getPhoneNumber());
        user.setRole(updated.getRole());
        user.setBlocked(updated.isBlocked());
        user.setScore(updated.getScore());
        return toDto(userRepo.save(user));
    }

    public void delete(Long id) {
        userRepo.deleteById(id);
    }

    private UserResponseDto toDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .blocked(user.isBlocked())
                .score(user.getScore())
                .createdAt(user.getCreatedAt())
                .build();
    }
}