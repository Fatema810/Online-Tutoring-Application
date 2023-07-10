import { timers } from "jquery";
import React, { Component } from "react";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      res1: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    fetch("http://localhost:3000/users/register", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      // Converting received data to JSON
      .then((response) => response.json())
      .then((data) => {
        this.setState({ response: data });
        console.log(this.state.response);
        alert("Register successfull");
      })
      .catch(console.log);

    // console.log(this.state.response);

    fetch(
      "http://localhost:3000/users/encrpytion/" + this.state.response.password,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ res1: data });
        console.log(this.state.res1);
        console.log("hashed password second call" + this.state.res1.password);
      })
      .then(
        fetch("http://localhost:3000/users/updatepass", {
          method: "POST",
          body: JSON.stringify({
            email: this.state.res1.email,
            password: this.state.res1.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          // Converting received data to JSON
          .then((response) => response.json())
          .then((data) => {
            console.log("hello" + data);
          })
          .catch(console.log)
      );
  };

  render() {
    return (
      <div>
        <div
          className="card shadow-8-strong"
          style={{
            marginTop: "20px",
            marginBottom: "50px",
            marginLeft: "450px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
            height: "400px",
            width: "450px",
            backgroundColor: "black",
          }}
        >
          <div className="card-body p-md-3">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2
                  className="fw-bold mb-8"
                  style={{ color: "white", marginTop: "10px" }}
                >
                  Register User
                </h2>
                <form>
                  <div className="row">
                    <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                      <div className="form-outline">
                        <input
                          type="text"
                          placeholder="Full Name"
                          id="name"
                          className="form-control-lg"
                          style={{ width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                      <div className="form-outline">
                        <input
                          type="email"
                          placeholder="Email"
                          id="email"
                          className="form-control-lg"
                          style={{ width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                      <div className="form-outline">
                        <input
                          type="password"
                          placeholder="Password"
                          id="password"
                          className="form-control-lg"
                          style={{ width: "300px" }}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    id="add"
                    className="Add"
                    onClick={this.handleClick}
                    style={{
                      size: "15px",
                      fontSize: "13px",
                      fontWeight: "1000px",
                      letterSpacing: "1px",
                      padding: "13px 50px 13px",
                      border: "1px solid black",
                      position: "relative",
                      backgroundColor: "#66f2d5",
                    }}
                  >
                    ADD
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;
