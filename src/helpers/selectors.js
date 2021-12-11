export function getAppointmentsForDay(state, day) {
  const days = state.days;
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
  return result;
}

export function getInterview(state, interviewerId) {
  return ""
}