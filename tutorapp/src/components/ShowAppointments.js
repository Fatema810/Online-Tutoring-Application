import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Showappointments.css";
import img from "../assets/appointment_pic.jpg";

class ShowAppointments extends Component {
  constructor(props) {
    super(props);
    this.sliderSettings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
    };
    this.state = {
      appointments: [],
      text: "",
      clicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/appointments", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ appointments: data });
        console.log(this.state.appointments);
      })
      .catch(console.log);
  }

  handleChange = (e) => {
    var text_lower = e.target.value.toLowerCase();
    this.setState({ text: text_lower });
  };

  render() {
    return (
      <div className="team-boxed" style={{ backgroundColor: "lightpink" }}>
        <br />
        <div
          className="topnav_card container-fluid"
          style={{ backgroundColor: "lightpink" }}
        >
          <div>
            <h5 id="navbar_title">Search appointment</h5>
          </div>
          <form id="form" role="search">
            <div className="input-group">
              <input
                type="search"
                id="query_card"
                name="q"
                placeholder="Enter Tutor...."
                aria-label="Search through site content"
                onChange={this.handleChange}
                style={{ fontSize: "20px" }}
              />
            </div>
          </form>
          <div>
            <h1>Total number of tutoring hours: 15</h1>
          </div>
        </div>

        {this.state.clicked === false && (
          <div
            className="conatiner-fluid"
            style={{ backgroundColor: "lightpink" }}
          >
            <div className="row people">
              <div className="col item">
                {this.state.text != null && (
                  <Slider {...this.sliderSettings}>
                    {this.state.appointments
                      .filter((val) => {
                        if (this.state.text === "") {
                          return null;
                        } else if (
                          val.tutor
                            .toLowerCase()
                            .match(this.state.text.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((appt) => (
                        <div className="card" key={appt._id}>
                          <h4>Details of Appointment:</h4>
                          <h5 className="name_apt">
                            Tutor's Name: {appt.tutor}
                          </h5>
                          <h5 className="name_apt">
                            User's Name: {appt.username}
                          </h5>
                          <h4
                            className="description"
                            style={{ fontSize: "30px" }}
                          >
                            Scheduled Time:{" "}
                            {new Date(appt.date).toLocaleString("en-US", {
                              timeZone: "America/New_York",
                            })}
                          </h4>
                          <Link to="/AppointmentDetail" state={appt._id}>
                            <button
                              id="button_apt"
                              type="button"
                              className="btn btn-outline-primary"
                              style={{ marginRight: "30px" }}
                            >
                              Details
                            </button>
                          </Link>
                        </div>
                      ))}
                  </Slider>
                )}

                {this.state.text === "" && (
                  <Slider {...this.sliderSettings}>
                    {this.state.appointments.map((appt) => (
                      <div
                        className="card"
                        key={appt._id}
                        style={{ backgroundColor: "teal" }}
                      >
                        <h4
                          style={{
                            fontStyle: "italic",
                            fontFamily: "monospace",
                          }}
                        >
                          {" "}
                          Details of Appointment:
                        </h4>

                        <h5 className="name_apt">Tutor's Name: {appt.tutor}</h5>
                        <h5 className="name_apt">
                          User's Name: {appt.username}
                        </h5>
                        <h4
                          className="description"
                          style={{ fontSize: "30px" }}
                        >
                          Scheduled Time:{" "}
                          {new Date(appt.date).toLocaleString("en-US", {
                            timeZone: "America/New_York",
                          })}
                        </h4>
                        <Link to="/AppointmentDetail" state={appt._id}>
                          <button
                            id="button_apt"
                            type="button"
                            className="btn btn-outline-primary"
                            style={{ marginRight: "30px" }}
                          >
                            Details
                          </button>
                        </Link>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ShowAppointments;
