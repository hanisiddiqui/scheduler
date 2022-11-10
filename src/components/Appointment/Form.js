import React, { useState } from 'react';

import useVisualMode from "../../hooks/useVisualMode";

import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  function Reset () {
    setStudent("");
    setInterviewer(null);
  };

  function Cancel () {
    Reset();
    props.onCancel();
  }

  function save () {
    props.onSave(student, interviewer);
  }
console.log("props.interviewers", props.interviewers);
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => {
              setStudent(event.target.value);
            } }
          />
        </form>
        <InterviewerList 
         value={interviewer}
           interviewers={props.interviewers}
           setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={Cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
};


