package com.example.backend.controller;

import com.example.backend.dto.VoteResponseDto;
import com.example.backend.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping
    public List<VoteResponseDto> getAll() {
        return voteService.getAll();
    }

    @GetMapping("/{id}")
    public VoteResponseDto getById(@PathVariable Long id) {
        return voteService.getById(id);
    }

    @PutMapping("/{id}")
    public VoteResponseDto update(
            @PathVariable Long id,
            @RequestParam int value
    ) {
        return voteService.update(id, value);
    }

    @DeleteMapping("/{id}")
    public VoteResponseDto delete(@PathVariable Long id) {
        return voteService.delete(id);
    }
}