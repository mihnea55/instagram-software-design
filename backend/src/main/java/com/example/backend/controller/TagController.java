package com.example.backend.controller;

import com.example.backend.entity.Tag;
import com.example.backend.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tag create(@RequestBody Tag tag){
        return tagService.create(tag);
    }

    @GetMapping
    public Iterable<Tag> getAll(){
        return tagService.getAll();
    }
}
