import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        fetch("http://localhost:8080/api/users")
            .then((response) => response.json())
            .then((data) => {
                const user = data.find((user) => user.username === username);

                if (user) {
                    if (user.passwordHash === password) {
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("username", user.username);
                        localStorage.setItem("userId", user.id);
                        setIsLoggedIn(true);
                        navigate("/main");
                    } else {
                        alert("Incorrect password");
                    }
                } else {
                    alert("User not found");
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
}

export default Login;