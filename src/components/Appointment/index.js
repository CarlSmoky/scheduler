import React, { useState } from "react";
import "./styles.scss";

export default function Appointment(props) {


  const appointment = () => {
    if (!props.time) {
      return "No Appointment";
    } else {
      return `Appointment at ${props.time}`
    }
  }


  return (
    <article className="appointment">{appointment()}</article>
  )
}