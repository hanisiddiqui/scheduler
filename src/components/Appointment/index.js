import React from "react";

import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const initialMode = props.interview ? SHOW : EMPTY;
  const { transition, mode, back } = useVisualMode(initialMode);

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
        bookInterview={bookInterview}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          bookInterview={bookInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status
          message={SAVING}
        />
      )}
    </article>
  );
}