import { useState, useEffect} from "react";

export default function EditProfile() {
    const [userData, setUserData] = useState({});
    const userId = localStorage.getItem("userId");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [role, setRole] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    const [score, setScore] = useState(0);
    const handleSubmit = () => {
        const updatedUser = {
            name,
            username,
            email,
            phoneNumber,
            passwordHash,
            role,
            isBlocked,
            score
        };
        console.log('http://localhost:8080/api/users/' + userId);
        fetch(`http://localhost:8080/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Profile updated successfully");
                } else {
                    alert("Failed to update profile");
            }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while updating profile");
            });
    };
        
    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
                setName(data.name);
                setUsername(data.username);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setPasswordHash(data.passwordHash);
                setRole(data.role);
                setIsBlocked(data.blocked);
                setScore(data.score);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [userId]);
    return (
        <div>
            <h1>Edit Profile</h1>
            <p>Name</p>
            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>Username</p>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <p>Email</p>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p>Phone Number</p>
            <input

                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSubmit}>Update Profile</button>
        </div>
    );
}