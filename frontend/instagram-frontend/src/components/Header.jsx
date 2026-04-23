import instagram_logo from "../images/logo.png";
import { useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
export default  function Header({ isLoggedIn, username }) {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";
    const navigate = useNavigate();
    const [showSignOut, setShowSignOut] = useState(false);
    const handleAccountClick = () => {
        if (!isLoggedIn) {
            navigate("/");
        } else {
            navigate("/profile/" + localStorage.getItem("userId"));
        }
    };
    const handleMenuClick = () => {
        setShowSignOut((prev) => !prev);
    };
    const handleSignOut = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        window.location.href = "/";
    };

    return (
        <header>
            <img src={instagram_logo} alt="Instagram Logo" 
            onClick={() => navigate("/main")}
            />
            <h1>Instagram</h1>

            {!isLoginPage && (
                <div className="header-actions">
                    <button className="header-button" onClick={handleAccountClick}>
                        {isLoggedIn ? username : "Sign in"}
                    </button>

                    {isLoggedIn && (
                        <>
                            <button className="header-button" onClick={handleMenuClick}>
                                Menu
                            </button>
                        </>
                    )}

                    {isLoggedIn && showSignOut && (
                        <>
                            <button className="header-button" onClick={() => navigate("/create-post")}>
                                Create Post
                            </button>
                            <button className="header-button" onClick={handleSignOut}>
                                Sign out
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}
