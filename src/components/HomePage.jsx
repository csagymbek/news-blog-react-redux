import { render } from "@testing-library/react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import "../styles/HomePage.css";

export const HomePage = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const dispatch = useDispatch();

  const login = (response) => {
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };

  return (
    <div className="home__page" style={{ display: isSignedIn && "none" }}>
      {!isSignedIn ? (
        <div className="login__message">
          <h2>📚</h2>
          <h1>A readers favorite place!</h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <GoogleLogin
            clientId="1003449145792-pt2h7t39fsksi8jl2tfgl1eov3h8s9ua.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button"
              >
                Login with Google
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : null}
    </div>
  );
};
