import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { getUserById } from "./services/userService";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const refreshCurrentUser = () => {
    const userId = localStorage.getItem("userId");
    getUserById(userId)
      .then((data) => {
        setUsername(data.username);
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      const userId = localStorage.getItem("userId");
      getUserById(userId)
        .then((data) => {
          setUsername(data.username);
        }
        )
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/main" /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/main"
          element={
            isLoggedIn ? <Main /> : <Navigate to="/" />
          }
        />
        <Route 
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/create-post"
          element={
            isLoggedIn ? <CreatePost /> : <Navigate to="/" />
          }
        />
        <Route
          path="/profile/:userId"
          element={
            isLoggedIn ? <Profile /> : <Navigate to="/" />
          }
        />
        <Route
          path="/edit-profile"
          element={
            isLoggedIn ? <EditProfile refreshUsername={refreshCurrentUser}/> : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;