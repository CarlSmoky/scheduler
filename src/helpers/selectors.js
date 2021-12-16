
// takes a day name (e.g, "Monday") and returns an array of 
// all the appointment objects for that day
export function getAppointmentsForDay(state, day) {
  const days = state.days;
  // console.log("state.appointments-->", state.appointments);
  const appointments = Object.values(state.appointments || {} );
  const selectedDayArray = days.filter(aDay => aDay.name === day);
  if (selectedDayArray.length === 0) {
    return [];
  }

  const selectedDaysAppointments = selectedDayArray[0].appointments;
  let result = [];
  for (let appId of selectedDaysAppointments) {
    for (let appt of appointments) {
      if (appId === appt.id) {
        result.push(appt);
      }
    }
  }
  // console.log("2nd --state.appointments-->", state.appointments);
  return result;
}

export function getInterview(state, interview) {
  if (!interview) { return null };
  // console.log(state);
  const interviewers = state.interviewers;
  const interviewerId = interview.interviewer;
  const interviewer = interviewers[interviewerId];
  interview.interviewer = interviewer;

  return interview;
}

export function getInterviewersForDay(state, day) {
  const days = state.days;
  const selectedDayArray = days.filter(aDay => aDay.name === day);
  if (selectedDayArray.length === 0) {
    return [];
  };
  const selectedDaysInterviewers = selectedDayArray[0].interviewers;
  // e.g., [1,2,3,4]
  const result = selectedDaysInterviewers.map((id) => state.interviewers[id]);
    
  return result;
}