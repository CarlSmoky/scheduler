import { useState, useEffect } from "react";
import axios from "axios";

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
    });
  }, []);

  const setDay = day => setState({ ...state, day });


  function bookInterview(id, interview) {
    // update our appointment slot with new interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }   // we are overwriting whatever was here before
    };
    // add our updated appointment to the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment // overwrite the one appointment matching our id
    };

    const days = updateSpots(id, "decrease");
  
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        setState(prev => ({ ...prev, appointments, days}))
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
      }
    }

    // modify spots value
    let count = selectedDay.spots;
    count += updateType === "decrease" ? -1 : 1

    // put updated spots value in day
    const updatedDay = {...selectedDay, spots: count};
    // put updated day in days
    const updatedDays = [...state.days];
    updatedDays[dayIndex] = updatedDay; 

    return updatedDays;
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

    const days = updateSpots(id, "increase");

    // PUT /api/appointments/:id 
    //Returning from bookInterview
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState(prev => ({ ...prev, appointments, days }))
      });
  }

  return {
    state, setDay, bookInterview, cancelInterview
  };

}