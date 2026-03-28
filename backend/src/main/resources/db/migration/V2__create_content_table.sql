CREATE TABLE content (
    id BIGINT PRIMARY KEY,
    parent_id BIGINT NULL,
    author_id BIGINT NOT NULL,
    type VARCHAR(20) NOT NULL,
    title VARCHAR(200) NULL,
    content_text TEXT NOT NULL,
    image_url VARCHAR(500),
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_content_parent
        FOREIGN KEY (parent_id) REFERENCES content(id) ON DELETE CASCADE,

    CONSTRAINT fk_content_author
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,

    CONSTRAINT chk_content_type
        CHECK (type IN ('POST', 'COMMENT')),

    CONSTRAINT chk_content_status
         CHECK (status IN ('JUST_POSTED', 'EARLY_REACTIONS', 'EXPIRED', 'HIDDEN', 'DELETED')),

    CONSTRAINT chk_content_post_comment_rules
        CHECK (
            (type = 'POST' AND parent_id IS NULL AND title IS NOT NULL)
        OR
            (type = 'COMMENT' AND parent_id IS NOT NULL AND title IS NULL)
        )
);

CREATE INDEX idx_content_parent_id ON content(parent_id);
CREATE INDEX idx_content_author_id ON content(author_id);
CREATE INDEX idx_content_type ON content(type);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_created_at ON content(created_at);