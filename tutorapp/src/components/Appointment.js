import React, { Component } from "react";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    let exist = false;
    let tutor = document.getElementById("name_tutor").value;
    let date = new Date(document.getElementById("date").value);
    fetch("http://localhost:3000/appointments/" + tutor + "/" + date, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data);
        console.log(Object.keys(data).length);

        if (Object.keys(data).length != 0) exist = true;
      })
      .then(() => {
        if (exist) {
          console.log("exists");
          alert("Please select other time slot");
        } else {
          console.log("does not exist");
          fetch("http://localhost:3000/appointments", {
            method: "POST",
            body: JSON.stringify({
              tutor: document.getElementById("name_tutor").value,
              username: document.getElementById("name_user").value,
              date: Date.parse(document.getElementById("date").value),
            }),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              alert("Booking confirmed");
            })
            .catch(console.log);
        }
      })
      .catch(console.log);
  };
  render() {
    return (
      <div className="container mt-5 mb-5 d-flex justify-content-center">
        <div className="card-appt">
          <div className="card-body">
            <h6 className="information mt-2">
              Please provide following information for appointment.
            </h6>
            <form>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-outline">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name of Tutor"
                        id="name_tutor"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-outline">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        id="name_user"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="form-outline">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="datetime-local"
                        placeholder="date"
                        id="date"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" d-flex flex-column text-center px-5 mt-3 mb-3">
                <medium className="agree-text">
                  By Booking this appointment you agree to the
                </medium>
                <a href="#" class="terms">
                  Terms & Conditions
                </a>
              </div>
              <button
                onClick={this.handleClick}
                style={{
                  size: "15px",
                  fontSize: "13px",
                  fontWeight: "1000px",
                  letterSpacing: "1px",
                  padding: "13px 50px 13px",
                  border: "2px solid black",
                  position: "relative",
                  backgroundColor: "#eee",
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Appointment;
