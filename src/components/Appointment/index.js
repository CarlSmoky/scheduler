import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {


  const appointment = props.interview ? 
    <Show student={props.student} interview={props.interview} /> : 
    <Empty /> ;


  return (
    <article className="appointment">
      <><Header time={props.time} ></Header>{appointment}</>
    </article>
  )
}