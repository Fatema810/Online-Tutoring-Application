import React, { Component } from "react";
import tutor from "./assets/tutor-asium.png";
import { Link, BrowserRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="topnav container-fluid">
          <div className="logo">
            <img src={tutor} alt="TUTOR-ASIUM copy.png" />
          </div>

          <Link
            to="/Favorites"
            style={{
              fontSize: "120%",
              paddingRight: "50px",
              paddingRight: "50px",
            }}
          >
            Favorites
            <i class="bi bi-heart-fill"></i>
          </Link>

          <Link to="/home" style={{ fontSize: "120%", paddingRight: "100px" }}>
            <i class="bi bi-house-door-fill"></i>
            Home
          </Link>

          <Link
            to="/ShowAppointments"
            style={{
              fontSize: "120%",
              paddingTop: "20px",
              paddingRight: "100px",
            }}
          >
            <i className="bi bi-person-fill "></i>
            Appointments
          </Link>
          <Link
            to="/Addtutor"
            style={{ fontSize: "120%", paddingRight: "120px" }}
          >
            <i className="bi bi-plus"></i>
            Add Tutor
          </Link>
          <Link
            to="/AddUser"
            style={{ fontSize: "120%", paddingRight: "120px" }}
          >
            <i class="bi bi-pencil-fill"></i>
            Register
          </Link>

          <Link to="/Login" style={{ fontSize: "120%", paddingRight: "120px" }}>
            <i class="bi bi-person-fill"></i>
            Login
          </Link>

          {/* <form id="form" role="search">
            <div className="input-group">
              <input
                type="search"
                id="query"
                name="q"
                placeholder="Search for Categories ..."
                aria-label="Search through site content"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-default btn-vlg btn-lg bi-search"
                  style={{ color: "white" }}
                  type="button"
                ></button>
              </span>
            </div>
          </form> */}
        </div>
      </div>
    );
  }
}

export default Navbar;
