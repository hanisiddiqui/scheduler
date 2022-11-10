import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";


export function getAppointmentsForDay(state, day) {

  if (!state.days) {
    return [];
  }

  let interviewerIDs = [];

  for (let item of state.days) {
    if (item.name === day) {
      interviewerIDs = item.appointments;
    }
  };

  const appointments = [];

  for (let key in state.appointments) {
    if (interviewerIDs.includes(state.appointments[key].id)) {
      appointments.push(state.appointments[key]);
    }
  };

  return appointments;
};

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  let interviewerData = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return interviewerData;
};


export function getInterviewersForDay(state, day) {

  if (!state.days) {
    return [];
  } 

  let interviewerIDs = [];

  for (let item of state.days) {
    if (item.name === day) {
      interviewerIDs = item.interviewers;
    }
  };

  return interviewerIDs.map(interviewerID => state.interviewers[interviewerID]);
};