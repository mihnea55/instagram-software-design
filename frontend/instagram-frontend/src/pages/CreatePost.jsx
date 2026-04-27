import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../services/postService";
import { uploadImage } from "../services/uploadService";

function CreatePost({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [contentText, setContentText] = useState("");
    const [status, setStatus] = useState("JUST_POSTED");
    const userId = localStorage.getItem("userId");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }
        try {
            setIsUploading(true);
            const imageUrl = await uploadImage(selectedFile);

            const newPost = {
                title,
                contentText,
                imageUrl,
                status
            };
            await createPost(userId, newPost);
            navigate("/main");
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsUploading(false);
        }
    }
    return (
        <div>
            <h1>Create Post</h1>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                placeholder="Content"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
            />
            <input
                type = "file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button onClick={handleSubmit} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Create Post"}
            </button>
        </div>
    );
}

export default CreatePost;
