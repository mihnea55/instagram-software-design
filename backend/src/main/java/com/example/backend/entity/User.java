package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.*;

import javax.management.relation.Role;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String username;
    private String email;
    private String phoneNumber;
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean isBlocked;
    private int score;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "author")
    private List<PostComment> posts;

    @OneToMany(mappedBy = "user")
    private List<Vote> votes;
}