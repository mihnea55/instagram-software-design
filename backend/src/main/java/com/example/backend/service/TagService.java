package com.example.backend.service;

import com.example.backend.entity.Tag;
import com.example.backend.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {
    @Autowired
    private final TagRepository tagRepository;

    public Tag create(Tag tag){
        if (tagRepository.existsByName(tag.getName())) {
            throw new RuntimeException("Tag with name " + tag.getName() + " already exists");
        }
        return tagRepository.save(tag);
    }
    public List<Tag> getAll(){
        List<Tag> tags = new ArrayList<>();
        tagRepository.findAll().forEach(tags::add);
        return tags;
    }
}
