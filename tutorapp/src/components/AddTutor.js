import React, { Component } from "react";

class AddTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    console.log("clicked");
    fetch("http://localhost:3000/tutors", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        certified: document.getElementById("certified").value,
        experience: document.getElementById("experience").value,
        expertise: document.getElementById("expertise").value,
        about_me: document.getElementById("aboutMe").value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      // Converting received data to JSON
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch(console.log);
  };
  render() {
    return (
      <div
        className="card shadow-8-strong"
        style={{
          marginTop: "20px",
          marginBottom: "50px",
          marginLeft: "450px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
          height: "540px",
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
                Register Tutor
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
                        type="text"
                        placeholder="Email"
                        id="email"
                        className="form-control-lg"
                        style={{ width: "300px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4" style={{ marginTop: "10px" }}>
                    <div className="form-outline">
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="form-control"
                        style={{ marginLeft: "-10px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4" style={{ marginTop: "10px" }}>
                    <div className="form-outline">
                      <input
                        type="text"
                        placeholder="Experience"
                        id="experience"
                        className="form-control"
                        style={{ marginLeft: "20px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                    <div className="form-outline">
                      <input
                        type="text"
                        placeholder="Area of Expertise"
                        id="expertise"
                        className="form-control-lg"
                        style={{ width: "300px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                    <div className="form-outline">
                      <textarea
                        id="aboutMe"
                        className="form-control-lg"
                        placeholder="About Me...."
                        style={{ width: "300px", color: "black" }}
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
    );
  }
}

export default AddTutor;
