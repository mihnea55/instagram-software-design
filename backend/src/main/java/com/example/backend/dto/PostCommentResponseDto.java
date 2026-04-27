package com.example.backend.dto;

import com.example.backend.model.Status;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostCommentResponseDto {
    private Long id;
    private String title;
    private String contentText;
    private String imageUrl;
    private Status status;
    private LocalDateTime createdAt;
    private Long parentCommentId;
    private AuthorDto author;
    private List<TagDto> tags;

    private int voteScore;
    private int commentCount;

    private List<PostCommentResponseDto> comments;
}