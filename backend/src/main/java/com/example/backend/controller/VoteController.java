package com.example.backend.controller;

import com.example.backend.dto.VoteResponseDto;
import com.example.backend.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    @PostMapping
    public VoteResponseDto vote(
            @RequestParam Long userId,
            @RequestParam Long postId,
            @RequestParam int value
    ) {
        return voteService.vote(userId, postId, value);
    }
}