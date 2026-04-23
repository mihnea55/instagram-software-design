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
@CrossOrigin(origins = "http://localhost:3000")
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

    @PutMapping("/{id}")
    public TagDto update(@PathVariable Long id, @RequestBody Tag tag) {
        return tagService.update(id, tag);
    }

    @DeleteMapping("/{id}")
    public TagDto delete(@PathVariable Long id) {
        return tagService.delete(id);
    }
}