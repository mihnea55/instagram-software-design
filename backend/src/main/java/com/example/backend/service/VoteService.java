package com.example.backend.service;

import com.example.backend.dto.VoteResponseDto;
import com.example.backend.entity.PostComment;
import com.example.backend.entity.User;
import com.example.backend.entity.Vote;
import com.example.backend.repository.PostCommentRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepo;
    private final UserRepository userRepo;
    private final PostCommentRepository postRepo;

    public VoteResponseDto vote(Long userId, Long postId, int value) {
        validateVoteValue(value);

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

    public List<VoteResponseDto> getAll() {
        return voteRepo.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public VoteResponseDto getById(Long id) {
        Vote vote = voteRepo.findById(id).orElseThrow();
        return toDto(vote);
    }

    public VoteResponseDto update(Long id, int value) {
        validateVoteValue(value);

        Vote vote = voteRepo.findById(id).orElseThrow();
        vote.setValue(value);

        return toDto(voteRepo.save(vote));
    }

    public VoteResponseDto delete(Long id) {
        Vote vote = voteRepo.findById(id).orElseThrow();
        VoteResponseDto response = toDto(vote);
        voteRepo.delete(vote);
        return response;
    }

    private void validateVoteValue(int value) {
        if (value != 1 && value != -1) {
            throw new RuntimeException("Invalid vote");
        }
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