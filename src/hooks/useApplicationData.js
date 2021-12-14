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
      setState({...state, days, appointments, interviewers});
      console.log(interviewers);
    });
  }, []);

  const setDay = day => setState({ ...state, day });


  function bookInterview(id, interview) {
    // update our appointment slot with new interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }  // we are overwriting whatever was here before
    };

    // add our updated appointment to the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment // overwrite the one appointment matching our id
    };

    // we update state with the appointments
    setState({
      ...state,
      appointments
    });

    console.log(id, interview);
    // PUT /api/appointments/:id 
    //Returning from bookInterview
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response)
        setState({ ...state, appointments })
      });

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
        setState({ ...state, appointments })
      });
  }

  return {
    state, setDay, bookInterview, cancelInterview
  };

}