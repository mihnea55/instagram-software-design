package com.example.backend.controller;

import com.example.backend.dto.PostCommentResponseDto;
import com.example.backend.entity.PostComment;
import com.example.backend.service.PostCommentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostCommentControllerTest {

    @Mock
    private PostCommentService postCommentService;

    @InjectMocks
    private PostCommentController postCommentController;

    @Test
    void createPost_shouldReturnCreatedPost() {
        Long userId = 1L;
        PostComment post = new PostComment();

        PostCommentResponseDto expected = new PostCommentResponseDto();
        expected.setId(100L);

        when(postCommentService.createPost(userId, post)).thenReturn(expected);

        PostCommentResponseDto result = postCommentController.createPost(userId, post);

        assertEquals(expected, result);
    }

    @Test
    void getPosts_shouldReturnPostsList() {
        PostCommentResponseDto post1 = new PostCommentResponseDto();
        post1.setId(1L);

        PostCommentResponseDto post2 = new PostCommentResponseDto();
        post2.setId(2L);

        List<PostCommentResponseDto> expected = List.of(post1, post2);

        when(postCommentService.getPosts()).thenReturn(expected);

        List<PostCommentResponseDto> result = postCommentController.getPosts();

        assertEquals(expected, result);
    }
}