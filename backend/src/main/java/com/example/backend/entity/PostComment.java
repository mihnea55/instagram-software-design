package com.example.backend.entity;

import com.example.backend.model.Status;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "post_and_comment")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private PostComment parent;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private String title;
    private String contentText;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "parent")
    private List<PostComment> comments;

    @ManyToMany
    @JoinTable(
            name = "post_comment_tags",
            joinColumns = @JoinColumn(name = "post_comment_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;
    @OneToMany(mappedBy = "postComment")
    private List<Vote> votes;
}