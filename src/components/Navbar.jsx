import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import "../styles/Navbar.css";

export const Navbar = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const [inputValue, setInputValue] = useState("");
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  return (
    <div className="navbar">
      {isSignedIn && (
        <>
          <h1 className="navbar__header">Readers Blog</h1>
          <h1 style={{ marginLeft: "10px" }}>💬</h1>
          <div className="blog__search">
            <input
              type="text"
              className="search"
              placeholder="Search for a blog..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="submit" onClick={handleClick}>
              Search
            </button>
          </div>
        </>
      )}
      {isSignedIn && (
        <div className="navbar__user__data">
          <Avatar
            src={userData?.imageUrl}
            alt={userData?.name}
            className="user"
          />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="1003449145792-pt2h7t39fsksi8jl2tfgl1eov3h8s9ua.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      )}
    </div>
  );
};
