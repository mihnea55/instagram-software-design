package com.example.backend.service;

import com.example.backend.dto.TagDto;
import com.example.backend.entity.Tag;
import com.example.backend.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

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

    public TagDto update(Long id, Tag updatedTag) {
        Tag existingTag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag with id " + id + " not found"));

        if (!existingTag.getName().equals(updatedTag.getName())
                && tagRepository.existsByName(updatedTag.getName())) {
            throw new RuntimeException("Tag with name " + updatedTag.getName() + " already exists");
        }

        existingTag.setName(updatedTag.getName());
        return toDto(tagRepository.save(existingTag));
    }

    public TagDto delete(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag with id " + id + " not found"));

        tagRepository.delete(tag);
        return toDto(tag);
    }

    private TagDto toDto(Tag tag) {
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }
}