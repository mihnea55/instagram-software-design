CREATE TABLE content_tags (
    content_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,

    PRIMARY KEY (content_id, tag_id),
    CONSTRAINT fk_content_tags_content
        FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE,

    CONSTRAINT fk_content_tags_tag
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE INDEX idx_content_tags_tag_id ON content_tags(tag_id);