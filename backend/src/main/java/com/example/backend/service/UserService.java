package com.example.backend.service;

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

    public User create(User user) {
        user.setPasswordHash(user.getPasswordHash());
        user.setCreatedAt(LocalDateTime.now());
        return userRepo.save(user);
    }

    public User getById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

    public User update(Long id, User updated) {
        User user = userRepo.findById(id).orElseThrow();
        user.setName(updated.getName());
        user.setEmail(updated.getEmail());
        return userRepo.save(user);
    }

    public void delete(Long id) {
        userRepo.deleteById(id);
    }
}