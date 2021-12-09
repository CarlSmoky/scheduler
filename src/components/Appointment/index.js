import React, { useState } from "react";
import "./styles.scss";

export default function Appointment(props) {


  const appointment = props.time ? `Appointment at ${props.time}` : `No Appointment`;


  return (
    <article className="appointment">{appointment}</article>
  )
}