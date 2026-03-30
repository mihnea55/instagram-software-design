package com.example.backend.controller;

import com.example.backend.dto.TagDto;
import com.example.backend.entity.Tag;
import com.example.backend.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @PostMapping
    public TagDto create(@RequestBody Tag tag) {
        return tagService.create(tag);
    }

    @GetMapping
    public List<TagDto> getAll() {
        return tagService.getAll();
    }
}