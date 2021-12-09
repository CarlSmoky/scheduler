import React, { useState } from 'react';
import Button from "../Button.js";
import InterviewerList from "../InterviewerList.js";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewerId || null);


  const reset = () => {
    setStudent("");
    setInterviewer("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    props.onSave(student, interviewer);
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewerId={interviewer}
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