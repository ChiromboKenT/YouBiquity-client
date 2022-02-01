import React, { useContext, useState } from "react";
import "./styles/app.scss";
import ApiContextProvider from "./Context/ApiContext";
import { GiHamburgerMenu } from "react-icons/gi";
import Login from "./app/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Listings from "./app/Listings";
import RequireAuth from "./app/RequireAuth";
import { AuthContext } from "./app/AppAuthContext";
import Message from "./app/Message";
import Success from "./app/success";
import Role from "./app/Role";

function App() {
  const [menuState, showMenuState] = useState(false);
  const { error, logged, messageLogged, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleMenu = () => {
    showMenuState(() => !menuState);
  };
  const handleNavigate = (destination: string) => {
    handleMenu();
    navigate(destination);
  };
  const handleLogout = (destination: string) => {
    handleMenu();
    dispatch({
      type: "SIGNOUT",
      payload: {
        username: undefined,
      },
    });
    navigate(destination);
  };
  return (
    <div className="App">
      {error && (
        <Message>
          <span>Login Failed</span>
        </Message>
      )}
      {messageLogged && (
        <Success>
          <span>Log In Succesfull</span>
        </Success>
      )}
      <header className="App-header">
        <span>Admin panel </span>
        {logged && (
          <div className="App-header-menu" onClick={handleMenu}>
            <GiHamburgerMenu />
          </div>
        )}
        {menuState && (
          <div className="headerMenu">
            <div
              onClick={() => handleNavigate("/role")}
              className="headerMenu-item"
            >
              User Role
            </div>
            <div
              onClick={() => handleNavigate("/listings")}
              className="headerMenu-item"
            >
              Listings
            </div>
            <div onClick={() => handleLogout("/")} className="headerMenu-item">
              Logout
            </div>
          </div>
        )}
      </header>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/role"
          element={
            <RequireAuth>
              <section className="section">
                <Role />
              </section>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/listings"
          element={
            <RequireAuth>
              <section className="section">
                <Listings />
              </section>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
