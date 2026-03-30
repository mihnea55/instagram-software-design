package com.example.backend.repository;

import com.example.backend.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserIdAndPostCommentId(Long userId, Long postId);
}