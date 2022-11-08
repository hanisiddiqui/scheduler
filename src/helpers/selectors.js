import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";


export function getAppointmentsForDay(state, day) {

  if (!state.days) {
    return [];
  }

  let appointmentIDs = [];

  for (let item of state.days) {
    if (item.name === day) {
      appointmentIDs = item.appointments;
    }
  };

  const appointments = [];

  for (let key in state.appointments) {
    if (appointmentIDs.includes(state.appointments[key].id)) {
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