import React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "./images/logo.jpg"

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <img
                alt=""
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                id="nav_logo"
            />{' '}
          <Link class="navbar-brand" to="/">
            ElderAid
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
                  props.location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);