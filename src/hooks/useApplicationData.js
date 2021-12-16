import { useState, useEffect } from "react";
import axios from "axios";
import {getAppointmentsForDay} from "../helpers/selectors"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
      setState(prev => ({...prev , days, appointments, interviewers}));
      // console.log(interviewers);
    });
  }, []);

  const setDay = day => setState({ ...state, day });


  function bookInterview(id, interview) {
    // update our appointment slot with new interview
    // console.log(id, interview.interviewer);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }   // we are overwriting whatever was here before
    };
    // let appointment = state.appointments[id];
    // appointment.interview = interview;
    // console.log(appointment, interview);
    // add our updated appointment to the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment // overwrite the one appointment matching our id
    };
    // console.log(appointments);
    // we update state with the appointments
    // setState({
    //   ...state,
    //   appointments
    // });

    // console.log(id, interview);
    // PUT /api/appointments/:id 
    //Returning from bookInterview
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        // console.log(response)
        setState(prev => ({ ...prev, appointments }))
        // updateSpots(id, "decrease")
      });

  }

  function updateSpots(id, updateType) {
    // find out what day appointment id is for
    let selectedDay; //obj
    let dayIndex;
    for (let index in state.days) {
      if (state.days[index].appointments.includes(id)) {
        selectedDay = state.days[index];
        dayIndex = index;
        // console.log(selectedDay);
      }
    }

    // modify spots value
    let count = selectedDay.spots;
    count += updateType === "decrease" ? -1 : 1

    // put updated spots value in day
    const updatedDay = {...selectedDay, spots: count};
    // put updated day in days
    const updatedDays = state.days;
    updatedDays[dayIndex] = updatedDay; 

    // set state with updated days
    setState(prev => {return {...prev, days: updatedDays}});
  }

  function cancelInterview(id) {
    // update our appointment slot with new interview
    const appointment = {
      ...state.appointments[id],
      interview: null  // we are overwriting whatever was here before
    };

    // add our updated appointment to the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment // overwrite the one appointment matching our id
    };

    // PUT /api/appointments/:id 
    //Returning from bookInterview
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState(prev => ({ ...prev, appointments }))
        // updateSpots(id, "increase");
      });
  }

  return {
    state, setDay, bookInterview, cancelInterview
  };

}