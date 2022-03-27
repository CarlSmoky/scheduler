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
    // const endpoints = {
    //   "GET_DAYS": "https://scheduler-k.herokuapp.com/api/days",
    //   "GET_APPOINTMENTS": "https://scheduler-k.herokuapp.com/api/appointments/",
    //   "GET_INTERVIEWERS": "https://scheduler-k.herokuapp.com/api/interviewers/"
    //   }
    const endpoints = {
      "GET_DAYS": `api/days`,
      "GET_APPOINTMENTS": `api/appointments/`,
      "GET_INTERVIEWERS": `api/interviewers/`
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


  function bookInterview(id, interview, context) {
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

    const updateType = context === "CREATE" ? "decreaseSpots" : "noSpotChange"
    const days = updateSpots(id, updateType);
  
    return axios.put(`api/appointments/${id}`, { interview })
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
    if (updateType === "decreaseSpots") {
      count--;
    } else if (updateType === "increaseSpots") {
      count++;
    }
   

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

    const days = updateSpots(id, "increaseSpots");

    // PUT /api/appointments/:id 
    //Returning from bookInterview
    return axios.delete(`api/appointments/${id}`)
      .then(response => {
        setState(prev => ({ ...prev, appointments, days }))
      });
  }

  return {
    state, setDay, bookInterview, cancelInterview
  };

}