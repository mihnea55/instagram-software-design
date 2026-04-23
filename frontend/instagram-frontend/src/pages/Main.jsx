
import { useNavigate } from "react-router-dom";
import search_icon from "../images/search.png";
import {useEffect, useState } from "react";
export default function Main() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    function fetchPosts(userId) {
        fetch(`http://localhost:8080/api/posts/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }
    useEffect(() => {
        if (query === "") {
            fetch("http://localhost:8080/api/users")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUsers(data);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
            return;
        }
        fetch(`http://localhost:8080/api/users/username/${query}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, [query]);
    return (
        <main>  
            <form className="search-bar">
                <input 
                    type="text"
                    placeholder="e.g. vnccrstn"
                    aria-label="Search" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

            </form>
            <div>   
                {users.map((user) => (
                    <button key={user.id} 
                    className="search-result"
                    onClick={() => navigate("/profile/" + user.id)}
                    >
                        {user.username}
                    </button>
                ))}

            </div>
            <div> 
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <img src={post.imageUrl} alt={post.caption} />
                    </div>
                ))}

            </div>
        </main>
    );
}