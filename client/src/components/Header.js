import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";
import "./Header.css";

const Header = () => {
  const { userData } = useUser();
  const navigator = useNavigate();
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-user">Create Account</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/uploads">File Upload</Link>
          </li>
          <li>
            <Link to="/view-files">View Uploaded Files</Link>
          </li>
        </ul>
        <div>
          {userData ? (
            <button
              onClick={() => {
                signOut(getAuth());
              }}>
              {" "}
              Log-Out
            </button>
          ) : (
            <button
              onClick={() => {
                navigator("/login");
              }}>
              Log-In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
