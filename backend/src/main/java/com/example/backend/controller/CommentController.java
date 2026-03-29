package com.example.backend.controller;

import com.example.backend.entity.PostComment;
import com.example.backend.service.PostCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private PostCommentService service;

    @PostMapping
    public PostComment create(
            @RequestParam Long userId,
            @RequestParam Long postId,
            @RequestBody PostComment comment) {
        return service.createComment(userId, postId, comment);
    }

    @GetMapping("/{postId}")
    public List<PostComment> getComments(@PathVariable Long postId) {
        return service.getComments(postId);
    }
}