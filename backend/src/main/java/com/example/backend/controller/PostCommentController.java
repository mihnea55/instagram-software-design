package com.example.backend.controller;

import com.example.backend.dto.PostCommentResponseDto;
import com.example.backend.entity.PostComment;
import com.example.backend.service.PostCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostCommentController {

    private final PostCommentService postCommentService;

    @PostMapping
    public PostCommentResponseDto createPost(
            @RequestParam Long userId,
            @RequestBody PostComment post
    ) {
        return postCommentService.createPost(userId, post);
    }

    @PostMapping("/{parentId}/comments")
    public PostCommentResponseDto createComment(
            @RequestParam Long userId,
            @PathVariable Long parentId,
            @RequestBody PostComment comment
    ) {
        return postCommentService.createComment(userId, parentId, comment);
    }

    @GetMapping
    public List<PostCommentResponseDto> getPosts() {
        return postCommentService.getPosts();
    }

    @GetMapping("/{postId}/comments")
    public List<PostCommentResponseDto> getComments(@PathVariable Long postId) {
        return postCommentService.getComments(postId);
    }

    @GetMapping("/search")
    public List<PostCommentResponseDto> search(@RequestParam String text) {
        return postCommentService.search(text);
    }
}