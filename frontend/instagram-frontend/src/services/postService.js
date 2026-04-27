const API_BASE_URL = "http://localhost:8080/api/posts";

export function getPostsByUserId(userId) {
    return fetch(`${API_BASE_URL}/${userId}`).then((response) => response.json());
}

export function createPost(userId, newPost) {
    return fetch(`${API_BASE_URL}?userId=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
    });
}

export function getCommentsByPostId(postId) {
    return fetch(`${API_BASE_URL}/${postId}/comments`).then((response) => response.json());
}

export function createComment(postId, userId, newComment) {
    return fetch(`${API_BASE_URL}/${postId}/comments?userId=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
    }).then((response) => response.json());
}
export function getPostById(postId) {
    return fetch(`${API_BASE_URL}/post/${postId}`).then((response) => response.json());
}

export function deletePost(postId) {
    return getPostById(postId).then((post) => {
        if (localStorage.getItem("userId") === String(post.author.id)) {
            return fetch(`${API_BASE_URL}/${postId}`, {
                method: "DELETE",
            });
        } else {
            return Promise.reject(new Error("Unauthorized: You can only delete your own posts."));
        }
    });
}
