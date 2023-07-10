import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#333" }}
        >
          <div className="container p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6
                    className="text-uppercase mb-4 font-weight-bold"
                    style={{ font: "1em sans-serif" }}
                  >
                    Tutor-Asium
                  </h6>
                  <p style={{ font: "1em sans-serif" }}>Ignite your mind.</p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6
                    className="text-uppercase mb-4 font-weight-bold"
                    style={{ font: "1.2em sans-serif" }}
                  >
                    Tutors Inc
                  </h6>
                  <p>
                    <a
                      className="text-white"
                      href="#"
                      style={{
                        textDecoration: "none",
                        font: "1.1em sans-serif",
                      }}
                    >
                      About us
                    </a>
                  </p>
                  <p>
                    <a
                      className="text-white"
                      href="#"
                      style={{
                        textDecoration: "none",
                        font: "1.1em sans-serif",
                      }}
                    >
                      Careers
                    </a>
                  </p>
                  <p>
                    <a
                      className="text-white"
                      href="#"
                      style={{
                        textDecoration: "none",
                        font: "1.1em sans-serif",
                      }}
                    >
                      Feedback
                    </a>
                  </p>
                  <p>
                    <a
                      className="text-white"
                      href="#"
                      style={{
                        textDecoration: "none",
                        font: "1.1em sans-serif",
                      }}
                    >
                      Privacy and Terms
                    </a>
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6
                    className="text-uppercase mb-4 font-weight-bold"
                    style={{ font: "1.1em sans-serif" }}
                  >
                    Contact Us
                  </h6>
                  <p style={{ font: "1.1em sans-serif" }}>
                    <i className="bi bi-house-door-fill mr-3"></i> UTD, Dallas
                  </p>
                  <p style={{ font: "1.1em sans-serif" }}>
                    <i className="bi bi-envelope-fill mr-3"></i> team8@xyz.com
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div
            className="text-center p-3"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2), font: 1.2em sans-serif",
            }}
          >
            © 2022 Copyright: Team 8
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
