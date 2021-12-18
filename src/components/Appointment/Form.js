import React, { useState } from 'react';
import Button from "../Button.js";
import InterviewerList from "../InterviewerList.js";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewerId, setInterviewerId] = useState(props.interviewerId || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewerId("");
  };

  const cancel = () => {
    reset();
    setError("");
    props.onCancel();
  };

  const save = () => {
    validate();
  }
  
  const changeHandler = (event) => setStudent(event.target.value);

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    props.onSave(student, interviewerId);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={student}
            onChange={changeHandler}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewerId={interviewerId} // this decides which interviewer is selected in the InterviewList
          interviewers={props.interviewers}
          onChange={setInterviewerId}
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