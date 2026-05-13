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
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
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

    @Test
    void getPosts_shouldReturnEmptyList_whenNoPosts() {
        when(postCommentService.getPosts()).thenReturn(List.of());
 
        List<PostCommentResponseDto> result = postCommentController.getPosts();
 
        assertTrue(result.isEmpty());
    }

    @Test
    void getPostsByUser_shouldReturnPostsForUser() {
        List<PostCommentResponseDto> expected = List.of(new PostCommentResponseDto());
        expected.get(0).setId(1L);

        when(postCommentService.getPostsByUser(1)).thenReturn(expected);
 
        List<PostCommentResponseDto> result = postCommentController.getPostsByUser(1);
 
        assertEquals(expected, result);
    }

    @Test
    void search_shouldReturnMatchingPosts() {
        List<PostCommentResponseDto> expected = List.of(new PostCommentResponseDto());
        expected.get(0).setId(3L);
        when(postCommentService.search("spring")).thenReturn(expected);
 
        List<PostCommentResponseDto> result = postCommentController.search("spring");
 
        assertEquals(expected, result);
    }

    @Test
    void updatePostOrComment_shouldReturnUpdatedDto() {
        Long id = 1L;

        PostComment updatedPost = new PostComment();
        PostCommentResponseDto expected = new PostCommentResponseDto();
        expected.setId(id);

        when(postCommentService.updatePostOrComment(id, updatedPost)).thenReturn(expected);
 
        PostCommentResponseDto result = postCommentController.updatePostOrComment(id, updatedPost);
 
        assertEquals(expected, result);
        verify(postCommentService, times(1)).updatePostOrComment(id, updatedPost);
    }

        @Test
    void deletePostOrComment_shouldReturnDeletedDto() {
        Long id = 1L;

        PostCommentResponseDto expected = new PostCommentResponseDto();
        expected.setId(id);
        
        when(postCommentService.deletePostOrComment(id)).thenReturn(expected);
 
        PostCommentResponseDto result = postCommentController.deletePostOrComment(id);
 
        assertEquals(expected, result);
        verify(postCommentService, times(1)).deletePostOrComment(id);
    }



}