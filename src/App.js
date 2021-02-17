import { useSelector } from "react-redux";
import "./App.css";
import { Blogs } from "./components/Blogs";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { selectSignedIn } from "./features/userSlice";

export const App = () => {
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="app">
      <HomePage />
      {isSignedIn && (
        <>
          <Navbar />
          <Blogs />
        </>
      )}
    </div>
  );
};
