import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCommentsByPostId, getPostsByUserId, createComment } from "../services/postService";
import { getUserById } from "../services/userService";
import { deletePost } from "../services/postService";
export default function Profile() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userLoggedInId = localStorage.getItem("userId");

    const [userData, setUserData] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [postCommentEnabled, setPostCommentEnabled] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [expandedComments, setExpandedComments] = useState({});
    const [repliesByCommentId, setRepliesByCommentId] = useState({});
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [ownProfile, setOwnProfile] = useState(false);
    useEffect (() => {
        console.log("userId:", userId);
        console.log("userLoggedInId:", userLoggedInId);
        if (userId === userLoggedInId) {
            setOwnProfile(true);
        }
    }, [userId, userLoggedInId]);
    const handleToggleReplies = async (commentId) => {
        if (expandedComments[commentId]) {
            setExpandedComments((prev) => ({ ...prev, [commentId]: false }));
            return;
        }

        if (!repliesByCommentId[commentId]) {
            getCommentsByPostId(commentId)
                .then((data) => {
                    setRepliesByCommentId((prev) => ({
                        ...prev,
                        [commentId]: data,
                    }));
                    setExpandedComments((prev) => ({
                        ...prev,
                        [commentId]: true,
                    }));
                })
                .catch((error) => {
                    console.error("Error fetching replies:", error);
                });
            return;
        }

        setExpandedComments((prev) => ({ ...prev, [commentId]: true }));
    };

    const postComment = (postId, text) => {
        const newComment = {
            contentText: text,
            title: "comment",
            status: "JUST_POSTED",
            imageUrl: null,
        };

        createComment(postId, userLoggedInId, newComment)
            .then((data) => {
                if (selectedPost && postId === selectedPost.id) {
                    setComments((prevComments) => [...prevComments, data]);
                } else {
                    setRepliesByCommentId((prev) => ({
                        ...prev,
                        [postId]: [...(prev[postId] || []), data],
                    }));
                    setExpandedComments((prev) => ({
                        ...prev,
                        [postId]: true,
                    }));
                }
            })
            .catch((error) => {
                console.error("Error posting comment:", error);
            });
    };

    const handleComments = (postId) => {
        getCommentsByPostId(postId)
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });
    };

    useEffect(() => {
        getUserById(userId)
            .then((data) => setUserData(data))
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [userId]);

    useEffect(() => {
        getPostsByUserId(userId)
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, [userId]);

    const hasChildren = (comment) => {
        return (
            (comment.comments && comment.comments.length > 0) ||
            (repliesByCommentId[comment.id] && repliesByCommentId[comment.id].length > 0)
        );
    };

    const renderComment = (comment, level = 0) => {
        return (
            <div
                key={comment.id}
                className={level === 0 ? "comment" : "child-comment"}
                style={{ marginLeft: `${level * 20}px` }}
            >
                <p>
                    <strong>{comment.author.username}:</strong> {comment.contentText}
                </p>

                <button onClick={() => setReplyingToCommentId(comment.id)}>reply</button>
                {isLoggedIn && String(comment.author.id) === userLoggedInId &&
                    (
                        <button
                        onClick={() =>
                            deletePost(comment.id)
                                .then(() => {
                                    if (level === 0 || comment.parentCommentId === selectedPost?.id) {
                                        setComments((prev) => prev.filter((c) => c.id !== comment.id));
                                    } else {
                                        setRepliesByCommentId((prev) => ({
                                            ...prev,
                                            [comment.parentCommentId]: (prev[comment.parentCommentId] || []).filter(
                                                (c) => c.id !== comment.id
                                            ),
                                        }));
                                    }
                                })
                                .catch((error) => {
                                    console.error("Error deleting comment:", error);
                                })
                        }
                    >
                        Delete Comment
                    </button>

                    )
                }
                {replyingToCommentId === comment.id && (
                    <div>
                        <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                postComment(comment.id, replyText);
                                setReplyingToCommentId(null);
                                setReplyText("");
                            }}
                        >
                            Submit
                        </button>
                    </div>
                )}

                {hasChildren(comment) && (
                    <button onClick={() => handleToggleReplies(comment.id)}>
                        {expandedComments[comment.id] ? "Hide comments" : "Show more comments"}
                    </button>
                )}

                {expandedComments[comment.id] &&
                    repliesByCommentId[comment.id]?.map((reply) =>
                        renderComment(reply, level + 1)
                    )}
            </div>
        );
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-details">
                    <div className="profile-top-row">
                        <h1>{userData.username}</h1>
                        <h2>{userData.name}</h2>
                        {ownProfile && <button onClick={() => navigate("/edit-profile")}>Edit profile</button>}
                    </div>

                    <div className="profile-stats">
                        <span>{userData.score} likes</span>
                    </div>
                </div>
            </section>

            <section className="profile-posts">
                <h2>Posts</h2>
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="post"
                        onClick={() => {
                            setSelectedPost(post);
                            handleComments(post.id);
                        }}
                    >
                        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
                    </div>
                ))}
            </section>

            {selectedPost && (
                <div
                    className="post-modal-backdrop"
                    onClick={() => {
                        setSelectedPost(null);
                        setPostCommentEnabled(false);
                        setComments([]);
                        setExpandedComments({});
                        setRepliesByCommentId({});
                        setReplyingToCommentId(null);
                        setReplyText("");
                        setCommentText("");
                    }}
                >
                    <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="post-modal-image">
                            <img src={selectedPost.imageUrl} alt={selectedPost.title} />
                        </div>

                        <div className="post-modal-sidebar">
                            <h2>{selectedPost.title}</h2>
                            <p>{selectedPost.contentText}</p>
                            {isLoggedIn && ownProfile && (
                                <button onClick={() => deletePost(selectedPost.id).then(() => {
                                    setSelectedPost(null);
                                    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== selectedPost.id));
                                }).catch((error) => {
                                    console.error("Error deleting post:", error);
                                })}>
                                    Delete Post
                                </button>
                            )}
                            <button onClick={() => setPostCommentEnabled(!postCommentEnabled)}>
                                post comment
                            </button>

                            {postCommentEnabled && isLoggedIn && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            postComment(selectedPost.id, commentText);
                                            setCommentText("");
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}

                            <section className ="comments-section">
                                <p>comments :</p>
                                {comments.map((comment) => renderComment(comment))}
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
