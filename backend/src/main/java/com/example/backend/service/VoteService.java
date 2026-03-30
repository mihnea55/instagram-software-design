package com.example.backend.service;

import com.example.backend.dto.VoteResponseDto;
import com.example.backend.entity.PostComment;
import com.example.backend.entity.User;
import com.example.backend.entity.Vote;
import com.example.backend.repository.PostCommentRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PostCommentRepository postRepo;

    public VoteResponseDto vote(Long userId, Long postId, int value) {
        if (value != 1 && value != -1) {
            throw new RuntimeException("Invalid vote");
        }

        if (voteRepo.findByUserIdAndPostCommentId(userId, postId).isPresent()) {
            throw new RuntimeException("Already voted");
        }

        User user = userRepo.findById(userId).orElseThrow();
        PostComment post = postRepo.findById(postId).orElseThrow();

        if (post.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("Cannot vote own post");
        }

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setPostComment(post);
        vote.setValue(value);

        return toDto(voteRepo.save(vote));
    }

    private VoteResponseDto toDto(Vote vote) {
        return VoteResponseDto.builder()
                .id(vote.getId())
                .value(vote.getValue())
                .userId(vote.getUser().getId())
                .postCommentId(vote.getPostComment().getId())
                .build();
    }
}