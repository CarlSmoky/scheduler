import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {


  const appointment = props.time ? `Appointment at ${props.time}` : `No Appointment`;


  return (
    <article className="appointment">{appointment}</article>
  )
}