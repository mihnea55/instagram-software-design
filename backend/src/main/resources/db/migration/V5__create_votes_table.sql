CREATE TABLE votes (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content_id BIGINT NOT NULL,
    value SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_votes_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    CONSTRAINT fk_votes_content
        FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE,

    CONSTRAINT chk_votes_value
        CHECK (value IN (-1, 1)),

    CONSTRAINT uq_votes_user_content
        UNIQUE (user_id, content_id)
);

CREATE INDEX idx_votes_user_id ON votes(user_id);
CREATE INDEX idx_votes_content_id ON votes(content_id);