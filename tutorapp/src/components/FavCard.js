import React, { Component } from "react";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img from "../assets/people.png";
import Details from "./Details";
import { Link, BrowserRouter } from "react-router-dom";
import styles from "/Users/fatemahussain/Desktop/wpl/tutorapp/src/components/card.css";

class FavCard extends Component {
  constructor(props) {
    super(props);
    this.sliderSettings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
    };

    this.state = {
      tutors: [],
      name: "",
      favTutors: [],
      description: "",
      experstise: "",
      text: "",
      clicked: false,
      obj: {},
      active: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateBack = this.updateBack.bind(this);
    // this.deleteTutor = this.deleteTutor(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/tutors", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tutors: data });
      })
      .catch(console.log);

    fetch(
      "http://localhost:3000/users/getFavorites/" + "627a869022ba0bd3b0a664e0",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ favTutors: data });
        console.log(this.state.favTutors);
      })
      .catch(console.log);
  }

  handleChange = (e) => {
    console.log(e.target.id);
    fetch(
      "http://localhost:3000/users/removeFavorite/" +
        "627a869022ba0bd3b0a664e0" +
        "/" +
        e.target.id,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        alert("Tutor removed frooooom favorites");
      });
  };

  //   deleteTutor = (e) => {
  //     fetch(
  //       "http://localhost:3000/users/removeFavorite/" +
  //         "627a869022ba0bd3b0a664e0" +
  //         "/" +
  //         e.id,
  //       {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((json) => {
  //         console.log(json);

  //         alert("Tutor removed frooooom favorites");
  //       });
  //   };

  handleClick = (card_id) => {
    console.log(this.state.tutors);

    this.setState({ clicked: true });

    console.log(
      this.state.tutors.find((obj) => obj.id.toString() == card_id.toString())
    );
    this.setState(
      {
        obj: this.state.tutors.find(
          (obj1) => obj1.id.toString() == card_id.toString()
        ),
      },
      () => {
        console.log(this.state.obj);
      }
    );
  };

  updateBack = (state) => {
    this.setState({ active: state });
    console.log(this.state.active);
  };

  render() {
    return (
      <div className={styles.root}>
        <div className="team-boxed">
          <br />
          <div className="topnav_card container-fluid">
            <div>
              <h5 id="navbar_title">Favorite tutors</h5>
            </div>
          </div>

          {this.state.clicked === false && (
            <div className="conatiner-fluid">
              <div className="row people">
                <div className="col item">
                  {this.state.text != null && (
                    <Slider {...this.sliderSettings}>
                      {this.state.tutors
                        .filter((val) => {
                          if (this.state.text === "") {
                            return null;
                          } else if (
                            val.name
                              .toLowerCase()
                              .match(this.state.text.toLowerCase()) ||
                            val.expertise
                              .toString()
                              .toLowerCase()
                              .includes(this.state.text.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((card) => (
                          <div className="card" key={card._id}>
                            <img className="rounded-circle center" src={img} />
                            <h5 className="name">{card.name}</h5>
                            <p className="description">{card.about_me}</p>
                            <p className="title">
                              Expertise:
                              {card.expertise}
                            </p>
                            <Link to="/Details" state={card._id}>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                style={{ marginRight: "30px" }}
                              >
                                Remove from favorite
                              </button>
                            </Link>

                            <Link to="/Appointment" state={card._id}>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                Book appointment
                              </button>
                            </Link>
                          </div>
                        ))}
                    </Slider>
                  )}

                  {
                    <Slider {...this.sliderSettings}>
                      {this.state.tutors
                        .filter((val) => {
                          console.log(this.state.favTutors);
                          for (
                            var i = 0;
                            i < this.state.favTutors.length;
                            i++
                          ) {
                            if (val._id === this.state.favTutors[i]) {
                              return val;
                            }
                          }
                        })
                        .map((card) => (
                          <div className="card" key={card._id}>
                            <img className="rounded-circle center" src={img} />
                            <h5 className="name">{card.name}</h5>
                            <p className="description">{card.about_me}</p>
                            <p className="title">
                              Expertise:
                              {card.expertise}
                            </p>

                            <button
                              id={card._id}
                              onClick={this.handleChange}
                              type="button"
                              className="btn btn-outline-primary"
                              style={{ marginRight: "30px" }}
                            >
                              Remove favorite
                            </button>

                            <Link to="/Appointment" state={card._id}>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                style={{ marginRight: "20px" }}
                              >
                                Book appointment
                              </button>
                            </Link>
                            <Link to="/Rate" state={card._id}>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                Rate
                              </button>
                            </Link>
                          </div>
                        ))}
                    </Slider>
                  }
                </div>
              </div>
            </div>
          )}

          {this.state.clicked ? <Details card_data={this.state.obj} /> : null}
        </div>
      </div>
    );
  }
}

export default FavCard;
