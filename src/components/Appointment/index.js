import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {


  const appointment = props.interview ? 
    <><Header time={props.time} /><Show student={props.student} interviewer={props.interviewer} /></> : 
    <><Header time={props.time} /><Empty /></> ;


  return (
    <article className="appointment">{appointment}</article>
  )
}