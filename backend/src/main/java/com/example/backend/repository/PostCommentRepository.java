package com.example.backend.repository;

import com.example.backend.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    List<PostComment> findByParentIsNullOrderByCreatedAtDesc();
    List<PostComment> findByParentId(Long parentId);
    List<PostComment> findByTitleContaining(String text);
    List<PostComment> findByAuthorId(Long authorId);
}