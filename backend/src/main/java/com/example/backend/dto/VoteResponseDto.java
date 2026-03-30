package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VoteResponseDto {
    private Long id;
    private int value;
    private Long userId;
    private Long postCommentId;
}