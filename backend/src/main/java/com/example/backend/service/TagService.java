package com.example.backend.service;

import com.example.backend.dto.TagDto;
import com.example.backend.entity.Tag;
import com.example.backend.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    @Autowired
    private final TagRepository tagRepository;

    public TagDto create(Tag tag) {
        if (tagRepository.existsByName(tag.getName())) {
            throw new RuntimeException("Tag with name " + tag.getName() + " already exists");
        }
        return toDto(tagRepository.save(tag));
    }

    public List<TagDto> getAll() {
        return tagRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    private TagDto toDto(Tag tag) {
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }
}