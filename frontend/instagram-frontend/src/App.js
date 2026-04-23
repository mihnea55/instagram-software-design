import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const username = localStorage.getItem("username");
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;