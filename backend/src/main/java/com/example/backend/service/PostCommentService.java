package com.example.backend.service;

import com.example.backend.dto.AuthorDto;
import com.example.backend.dto.PostCommentResponseDto;
import com.example.backend.dto.TagDto;
import com.example.backend.entity.PostComment;
import com.example.backend.entity.Tag;
import com.example.backend.entity.User;
import com.example.backend.entity.Vote;
import com.example.backend.model.Status;
import com.example.backend.repository.PostCommentRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class PostCommentService {

    @Autowired
    private PostCommentRepository repo;

    @Autowired
    private UserRepository userRepo;

    public PostCommentResponseDto createPost(Long userId, PostComment post) {
        User user = userRepo.findById(userId).orElseThrow();
        post.setAuthor(user);
        post.setCreatedAt(LocalDateTime.now());
        post.setStatus(Status.JUST_POSTED);

        PostComment saved = repo.save(post);
        return toDto(saved, true);
    }

    public PostCommentResponseDto createComment(Long userId, Long parentId, PostComment comment) {
        User user = userRepo.findById(userId).orElseThrow();
        PostComment parent = repo.findById(parentId).orElseThrow();

        comment.setAuthor(user);
        comment.setParent(parent);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setStatus(Status.JUST_POSTED);

        PostComment saved = repo.save(comment);
        return toDto(saved, true);
    }

    public List<PostCommentResponseDto> getPosts() {
        return repo.findByParentIsNullOrderByCreatedAtDesc().stream()
                .map(post -> toDto(post, true))
                .toList();
    }
    public List<PostCommentResponseDto> getPostsByUser(int userId) {
        return repo.findByParentIsNullOrderByCreatedAtDesc().stream()
                .filter(post -> post.getAuthor().getId() == userId)
                .map(post -> toDto(post, true))
                .toList();
    }
    public List<PostCommentResponseDto> getComments(Long postId) {
        return repo.findByParentId(postId).stream()
                .map(comment -> toDto(comment, true))
                .toList();
    }
    public List<PostCommentResponseDto> search(String text) {
        return repo.findByTitleContaining(text).stream()
                .map(post -> toDto(post, true))
                .toList();
    }

    public PostCommentResponseDto updatePostOrComment(Long id, PostComment updatedPostComment) {
        PostComment existing = repo.findById(id).orElseThrow();

        existing.setTitle(updatedPostComment.getTitle());
        existing.setContentText(updatedPostComment.getContentText());
        existing.setImageUrl(updatedPostComment.getImageUrl());
        existing.setTags(updatedPostComment.getTags());
        existing.setStatus(updatedPostComment.getStatus());

        PostComment saved = repo.save(existing);
        return toDto(saved, true);
    }

    public PostCommentResponseDto deletePostOrComment(Long id) {
        PostComment existing = repo.findById(id).orElseThrow();
        PostCommentResponseDto response = toDto(existing, true);
        repo.delete(existing);
        return response;
    }

    private PostCommentResponseDto toDto(PostComment postComment, boolean includeComments) {
        List<PostCommentResponseDto> commentDtos = Collections.emptyList();

        if (includeComments && postComment.getComments() != null) {
            commentDtos = postComment.getComments().stream()
                    .map(comment -> toDto(comment, true))
                    .toList();
        }

        return PostCommentResponseDto.builder()
                .id(postComment.getId())
                .title(postComment.getTitle())
                .contentText(postComment.getContentText())
                .imageUrl(postComment.getImageUrl())
                .status(postComment.getStatus())
                .createdAt(postComment.getCreatedAt())
                .author(toAuthorDto(postComment.getAuthor()))
                .tags(toTagDtoList(postComment.getTags()))
                .voteScore(calculateVoteScore(postComment.getVotes()))
                .commentCount(postComment.getComments() == null ? 0 : postComment.getComments().size())
                .comments(commentDtos)
                .build();
    }

    private AuthorDto toAuthorDto(User user) {
        if (user == null) {
            return null;
        }

        return AuthorDto.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .score(user.getScore())
                .build();
    }

    private List<TagDto> toTagDtoList(List<Tag> tags) {
        if (tags == null) {
            return Collections.emptyList();
        }

        return tags.stream()
                .map(this::toTagDto)
                .toList();
    }

    private TagDto toTagDto(Tag tag) {
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .build();
    }

    private int calculateVoteScore(List<Vote> votes) {
        if (votes == null) {
            return 0;
        }

        return votes.stream()
                .mapToInt(Vote::getValue)
                .sum();
    }
}