import React, { useState } from 'react';
import Button from "../Button.js";
import InterviewerList from "../InterviewerList.js";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null);


  const reset = () => {
    setStudent("");
    setInterviewer("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    // student and interviewer are ok here, but don't get passed into onSave ???
    props.onSave(student, interviewer);
  }
  
  const changeHandler = (event) => setStudent(event.target.value);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={props.student || "Enter Student Name"}
            value={student}
            onChange={changeHandler}
          />
        </form>
        <InterviewerList
          interviewerId={interviewer} // this decides which interviewer is selected in the InterviewList
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}