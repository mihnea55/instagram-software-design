package com.example.backend.dto;

import com.example.backend.model.Role;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private Long id;
    private String name;
    private String username;
    private String email;
    private String phoneNumber;
    private String passwordHash;
    private Role role;
    private boolean isBlocked;
    private int score;
    private LocalDateTime createdAt;
}