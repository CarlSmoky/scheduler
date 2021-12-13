import React from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import {getInterviewersForDay} from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    // this gets called, but the name and interviewer are undefined
    // console.log("SAVE", name, interviewer);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
  }
  
  return (
    <article className="appointment">
      <><Header time={props.time} ></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={getInterviewersForDay(props.state, props.state.day)} 
            // onSave={console.log("onSave")} 
            onCancel={() => back()}
            onSave={save}
          />
        )}
      </>
    </article>
  )
}