import React from "react";
import { useState } from "react";
import img from "../assets/people.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router";
import { useNavigate } from "react-router-dom";

const Details = (props) => {
  const location = useLocation();
  const state = location.state;
  const [value, setValue] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("http://localhost:3000/tutors/" + state)
      .then((res) => res.json())
      .then((data) => {
        setValue(data[0]);
        console.log(data);
        console.log(value);
      })

      .catch(console.log);
  }, []);

  const handleClick = (e) => {
    console.log(e.target.id);
    fetch("http://localhost:3000/tutors/" + e.target.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigate("/Home");
        alert("Tutor deleted");
      });
  };

  const favClick = (e) => {
    console.log(e.target.id);
    alert("Tutor added to favorites");
    fetch("http://localhost:3000/users/addFavorite", {
      method: "POST",
      body: JSON.stringify({
        username: "emily",
        tutorId: e.target.id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <div key={value._id} style={{ backgroundColor: "white" }}>
      <img className="rounded-circle center" src={img} />
      <h1 className="name">{value.name}</h1>
      <h2 className="about">{value.about_me}</h2>
      <p className="title">Expertise:{value.expertise && value.expertise}</p>
      <p className="rating">Ratings:{value.rating}</p>
      <p className="yrs">Years of Experience: {value.experience}</p>

      <button
        id={value._id}
        type="button"
        onClick={favClick}
        className="btn btn-outline-primary"
        style={{ marginRight: "20px", marginLeft: "" }}
      >
        <i class="bi bi-suit-heart-fill"></i>
      </button>
      <Link to="/Home">
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ marginRight: "20px", marginLeft: "" }}
        >
          Back
        </button>
      </Link>
      <Link to="/Edit" state={value._id}>
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ marginRight: "20px" }}
        >
          Edit
        </button>
      </Link>
      <button
        id={value._id}
        onClick={handleClick}
        type="button"
        className="btn btn-outline-primary"
        style={{ marginRight: "20px" }}
      >
        Delete
      </button>
    </div>
  );
};

export default Details;
