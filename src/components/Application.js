import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay} from "../helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const endpoints = {
      "GET_DAYS": "http://localhost:8001/api/days",
      "GET_APPOINTMENTS": "http://localhost:8001/api/appointments",
      "GET_INTERVIEWERS": "http://localhost:8001/api/interviewers"
      }
    Promise.all([
      axios.get(endpoints.GET_DAYS),
      axios.get(endpoints.GET_APPOINTMENTS),
      axios.get(endpoints.GET_INTERVIEWERS)
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState({...state, days, appointments,interviewers});
      console.log(interviewers);
    });
  }, []);
  
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentComponents = dailyAppointments.map((appointment) => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentComponents}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
