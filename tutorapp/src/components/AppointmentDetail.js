import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const AppointmentDetail = (props) => {
  const location = useLocation();
  const state = location.state;
  const [value, setValue] = useState([]);
  //   console.log(state);

  React.useEffect(() => {
    fetch("http://localhost:3000/appointments/" + state)
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
    fetch("http://localhost:3000/appointments/" + e.target.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div key={value._id} style={{ backgroundColor: "white", height: "500px" }}>
      <h3
        className="name"
        style={{
          fontWeight: "bold",

          marginBottom: "5px",
          color: "black",
          textAlign: "center",
          paddingTop: "120px",
          fontSize: "50px",
          letterSpacing: "1px",
        }}
      >
        The appointment has been confirmed for tutor {value.tutor}.
      </h3>
      <h2
        style={{
          fontWeight: "bold",
          marginTop: "5px",
          marginBottom: "5px",
          color: "black",
          textAlign: "center",
          fontSize: "50px",
          letterSpacing: "1px",
        }}
      >
        User: {value.username}
      </h2>
      <h2
        style={{
          fontWeight: "bold",
          marginTop: "5px",
          marginBottom: "50px",
          color: "black",
          textAlign: "center",
          fontSize: "50px",
          letterSpacing: "1px",
        }}
      >
        Appointment details:{" "}
        {new Date(value.date).toLocaleString("en-US", {
          timeZone: "America/New_York",
        })}
      </h2>
      <Link to="/ShowAppointments">
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{
            marginRight: "20px",
            marginBottom: "20px",
            fontSize: "25px",
          }}
        >
          Back
        </button>
        <button
          id={value._id}
          onClick={handleClick}
          type="button"
          className="btn btn-outline-primary"
          style={{
            marginRight: "20px",
            marginBottom: "20px",
            fontSize: "25px",
          }}
        >
          Delete
        </button>
      </Link>
    </div>
  );
};

export default AppointmentDetail;
