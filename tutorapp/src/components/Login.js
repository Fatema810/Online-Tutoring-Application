import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(e.target.id);
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigate("/Home");
        alert("Login successful");
      });
  };
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
          height: "320px",
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
                Login
              </h2>
              <form>
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
                  <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                    <div className="form-outline">
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="form-control-lg"
                        style={{ width: "300px" }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  id="add"
                  className="Add"
                  onClick={handleClick}
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
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
