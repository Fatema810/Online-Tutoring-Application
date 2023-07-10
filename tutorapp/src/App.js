import logo from "./logo.svg";
import "./App.css";
import "./homepage.css";
import "./components/addTutor.css";
import "./components/details.css";
import "./components/Appointment.css";
import Navbar from "./Navbar";
import Maincontent from "./Maincontent";
import Footer from "./components/Footer";
import Card from "./components/Card";
import AddTutor from "./components/AddTutor";
import Details from "./components/Details";

import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";
import { Fragment } from "react";
import Edit from "./components/Edit";
import Appointment from "./components/Appointment";
import ShowAppointments from "./components/ShowAppointments";
import AppointmentDetail from "./components/AppointmentDetail";
import AddUser from "./components/AddUser";
import Favorites from "./components/Favorites";
import Ratetutor from "./components/Ratetutor";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/Home"
          element={
            <Fragment>
              <Maincontent />
              <Card />
            </Fragment>
          }
        />
        <Route path="/Addtutor" element={<AddTutor />} />
        <Route path="/" element={<Navigate replace to="/Home" />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/ShowAppointments" element={<ShowAppointments />} />
        <Route path="/AppointmentDetail" element={<AppointmentDetail />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/Ratetutor" element={<Ratetutor />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
