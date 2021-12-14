import React, { useEffect } from 'react'
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import {getInterviewersForDay} from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => { transition(SHOW)} )
      .catch(error => transition(ERROR_SAVE, true));
      
  }

  function deleteAppointment() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(res => { transition(EMPTY)})
    .catch(error => {transition(ERROR_DELETE, true)})
  }
  
  return (
    <article className="appointment">
      <><Header time={props.time} ></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={getInterviewersForDay({...props.state}, props.state.day)}  
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === SAVING &&  <Status message={"Saving"}/>}
        {mode === CONFIRM &&  <Confirm onCancel={() => back()} onConfirm={deleteAppointment} />}
        {mode === DELETING &&  <Status message={"Deleting"}/>}
        {mode === EDIT &&  (
          <Form 
          interviewers={getInterviewersForDay(props.state, props.state.day)}  
          onCancel={() => back()}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        )}
        {mode === ERROR_SAVE && <Error 
        message={"Cannot save appointment"}
        onClose={() => back()}
        />}
        {mode === ERROR_DELETE && <Error 
        message={"Cannot delete appointment"}
        onClose={() => back()}
        />}
      </>
    </article>
  )
}