import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Profile() {
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
    const handleToggleReplies = async (commentId) => {
        if (expandedComments[commentId]) {
            setExpandedComments((prev) => ({ ...prev, [commentId]: false }));
            return;
        }
        if (!repliesByCommentId[commentId]) {
            fetch(`http://localhost:8080/api/posts/${commentId}/comments`)
                .then((response) => response.json())
                .then((data) => {
                    setRepliesByCommentId((prev) => ({ ...prev, [commentId]: data }));
                    setExpandedComments((prev) => ({ ...prev, [commentId]: true }));
                })
                .catch((error) => {
                    console.error("Error fetching replies:", error);
                });
        }
        setExpandedComments((prev) => ({ ...prev, [commentId]: true }));
    };

    const postComment = (postId, commentText) => {
        const newComment = {
            contentText: commentText,
            title : "comment",
            status : "JUST_POSTED",
            imageUrl : null
        }
        console.log(`http://localhost:8080/api/posts/${postId}/comments?userId=${userLoggedInId}`)
        fetch(`http://localhost:8080/api/posts/${postId}/comments?userId=${userLoggedInId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => response.json())
            .then((data) => {
                setComments((prevComments) => [...prevComments, data]);
            })
            .catch((error) => {
                console.error("Error posting comment:", error);
            });
    };
    const handleComments = (postId) => {
        console.log(`http://localhost:8080/api/posts/${postId}/comments`)
        fetch(`http://localhost:8080/api/posts/${postId}/comments`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            }
        );
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}`)
            .then(response => response.json())
            .then(data => setUserData(data))
    }, [userId]);
    useEffect(() => {
       
        fetch(`http://localhost:8080/api/posts/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, [userId]);
    if (!userData) {
        return <div>Loading...</div>;
    }
    return (
        <main className="profile-page">
            <section className="profile-header">

                <div className="profile-details">
                <div className="profile-top-row">
                    <h1>{userData.username}</h1>
                    <h2>{userData.name} </h2>
                    <button>Edit profile</button>
                </div>

                <div className="profile-stats">
                    <span>{userData.score} likes</span>
                </div>

                </div>
            </section>


            <section className="profile-posts">
                <h2>Posts</h2>
                {posts.map((post) => (
                    <div key={post.id} className="post" onClick={() => { setSelectedPost(post); handleComments(post.id); }}>
                        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
                    </div>
                    
                ))}
            </section>
            {selectedPost && (
                <div className="post-modal-backdrop" onClick={() => { setSelectedPost(null); setPostCommentEnabled(false); setComments ([]); }}>
                    <div className="post-modal" onClick={(e) => e.stopPropagation()}>
                        
                                <div className="post-modal-image">
                                <img src={selectedPost.imageUrl} alt={selectedPost.title} />
                                </div>

                                <div className="post-modal-sidebar">
                                <h2>{selectedPost.title}</h2>
                                <p>{selectedPost.contentText}</p>
                                <button onClick={() => setPostCommentEnabled(!postCommentEnabled)}>  post comment</button>
                                {postCommentEnabled && isLoggedIn &&  (
                                    <div>
                                        <input type="text" placeholder="Write a comment..." onChange={(e) => setCommentText(e.target.value)} />
                                        <button
                                            onClick={() => postComment(selectedPost.id, commentText)}
                                        >
                                            Submit</button>
                                    </div>
                                )}
                                <section>
                                    <p> comments :</p>
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="comment">
                                            <p><strong>{comment.author.username}:</strong> {comment.contentText}</p>
                                            <button onClick={() => setReplyingToCommentId(comment.id)}> reply</button>
                                            {replyingToCommentId != null
                                                && replyingToCommentId === comment.id && (
                                                    <div>
                                                    <input type="text" placeholder="Write a reply..." onChange={(e) => setReplyText(e.target.value)} />
                                                    <button onClick={() => { postComment(comment.id, replyText); setReplyingToCommentId(null); setReplyText(""); }}>Submit</button>
                                                </div>
                                            )}

                                            {comment.comments?.length > 0 && (
                                                
                                                <button onClick={() => handleToggleReplies(comment.id)}>
                                                    {expandedComments[comment.id] ? "Hide comments" : "Show more comments"}
                                                </button>
                                            )}
                                            {expandedComments[comment.id] &&
                                                repliesByCommentId[comment.id]?.map((reply) => (
                                                    <div key={reply.id} className="child-comment">
                                                        <p><strong>{reply.author.username}:</strong> {reply.contentText}</p>
                                                        <button 
                                                        onClick={() => setReplyingToCommentId(reply.id)}
                                                        > 
                                                        Reply </button>
                                                        {replyingToCommentId != null
                                                        && replyingToCommentId === reply.id && (
                                                            <div>
                                                            <input type="text" placeholder="Write a reply..." onChange={(e) => setReplyText(e.target.value)} />
                                                            <button onClick={() => { postComment(reply.id, replyText); setReplyingToCommentId(null); setReplyText(""); }}>Submit</button>
                                                        </div>
                                                        )}
                                                    </div>
                
                                                ))
                                            }
                                        </div>
                                    ))}

                                </section>
                                </div>
                            </div>
                        </div>
                )}
            </main>

            );
}
