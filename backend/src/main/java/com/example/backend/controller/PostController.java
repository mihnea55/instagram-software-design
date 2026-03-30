package com.example.backend.controller;

import com.example.backend.entity.PostComment;
import com.example.backend.service.PostCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostCommentService service;

    @PostMapping
    public PostComment create(@RequestParam Long userId, @RequestBody PostComment post) {
        return service.createPost(userId, post);
    }

    @GetMapping
    public List<PostComment> getAll() {
        return service.getPosts();
    }

    @GetMapping("/search")
    public List<PostComment> search(@RequestParam String text) {
        return service.search(text);
    }
}