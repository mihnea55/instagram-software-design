import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../services/userService";

function Register({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("USER");
    const [isBlocked, setIsBlocked] = useState(false);
    const [score, setScore] = useState(0);
    const [name, setName] = useState("");

    const handleRegister = () => {
        const newUser = {
            username,
            passwordHash: password,
            email,
            phoneNumber,
            role,
            isBlocked,
            score,
            name
        };
        createUser(newUser)
            .then((response) => {
                if (response.ok) {;
                    navigate("/");
                } else {
                    alert("Registration failed");
                }          
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred during registration");
            });
    };
    return (
        <div>
            <h1>Register</h1>
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

            <input
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
