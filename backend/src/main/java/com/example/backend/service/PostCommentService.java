package com.example.backend.service;

import com.example.backend.entity.PostComment;
import com.example.backend.entity.User;
import com.example.backend.model.Status;
import com.example.backend.repository.PostCommentRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostCommentService {

    @Autowired
    private PostCommentRepository repo;

    @Autowired
    private UserRepository userRepo;

    public PostComment createPost(Long userId, PostComment post) {
        User user = userRepo.findById(userId).orElseThrow();
        post.setAuthor(user);
        post.setCreatedAt(LocalDateTime.now());
        post.setStatus(Status.JUST_POSTED);
        return repo.save(post);
    }

    public PostComment createComment(Long userId, Long parentId, PostComment comment) {
        User user = userRepo.findById(userId).orElseThrow();
        PostComment parent = repo.findById(parentId).orElseThrow();
        comment.setAuthor(user);
        comment.setParent(parent);
        comment.setCreatedAt(LocalDateTime.now());
        return repo.save(comment);
    }

    public List<PostComment> getPosts() {
        return repo.findByParentIsNullOrderByCreatedAtDesc();
    }

    public List<PostComment> getComments(Long postId) {
        return repo.findByParentId(postId);
    }

    public List<PostComment> search(String text) {
        return repo.findByTitleContaining(text);
    }
}