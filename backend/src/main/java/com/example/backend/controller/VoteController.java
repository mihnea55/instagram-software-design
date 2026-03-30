package com.example.backend.controller;

import com.example.backend.entity.Vote;
import com.example.backend.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    private VoteService service;

    @PostMapping
    public Vote vote(
            @RequestParam Long userId,
            @RequestParam Long postId,
            @RequestParam int value) {
        return service.vote(userId, postId, value);
    }
}