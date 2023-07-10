import React from "react";
import { useLocation } from "react-router-dom";

function Ratetutor() {
  const location = useLocation();
  const state = location.state;
  console.log(state);

  const handleClick = (e) => {
    console.log("clicked");
    fetch("http://localhost:3000/functions/rating", {
      method: "POST",
      body: JSON.stringify({
        tutorId: state,
        ratings: document.getElementById("rate").value,
        feedback: document.getElementById("feedback").value,
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

  return (
    <div
      className="card shadow-8-strong"
      style={{
        marginTop: "20px",
        marginBottom: "50px",
        marginLeft: "450px",
        background: "hsla(0, 0%, 100%, 0.8)",
        backdropFilter: "blur(30px)",
        height: "500px",
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
              Please rate and provide your feedback
            </h2>
            <form>
              <div className="row">
                <div className="mb-4 px-0" style={{ marginTop: "10px" }}>
                  <div className="form-outline">
                    <input
                      type="text"
                      placeholder="Rate"
                      id="rate"
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
                      id="feedback"
                      className="form-control-lg"
                      placeholder="Please enter feedback...."
                      style={{ width: "300px", color: "black" }}
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
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ratetutor;
