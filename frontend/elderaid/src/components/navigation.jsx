import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Logo from "./images/Clipboard01.jpg"
import "./styling/navigation.css";
import { Button } from 'react-bootstrap';

function Navigation(props) {
  
  function handleSubmit(event) {
    event.preventDefault();
  }

  const history = useHistory();  
  function SignOut() {
    const user_id = localStorage.getItem("userId")
    localStorage.clear(user_id)
    let path = "./";
    history.push(path);
  }
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <img
                alt=""
                src={Logo}
                width="161"
                height="53"
                id="nav_logo"
            />{' '}
          <Link class="navbar-brand" to="/">
            
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Dashboard" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Dashboard">
                  Dashboard
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Signup" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Signup">
                  Signup
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Login" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Login">
                  Login
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/Contact" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Contact">
                  Contact
                </Link>
              </li>
              <Button id="signout_button" size="sm" onClick={SignOut}>Sign Out</Button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);