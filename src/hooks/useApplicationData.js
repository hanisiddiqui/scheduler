import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    })
  }, [])

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    function spots (day) {
      const totalLength = day.appointments.length;
      const bookedSpots = day.appointments.reduce((count, id) => {
        if (appointments[id].interview) {
          return count + 1;
        } else {
          return count;
        }
      }, 0);

      const openSpots = totalLength - bookedSpots;
      return openSpots;
    }

    const days = state.days.map((day) => day.appointments.includes(id) ? ({
      ...day,
      spots: spots(day),
    }): day)


    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        console.log('saved');
        //update state (days)

        setState(prev => ({
          ...prev,
          appointments,
          days
        }));
      })

  };

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    function spots (day) {
      const totalLength = day.appointments.length;
      const bookedSpots = day.appointments.reduce((count, id) => {
        if (appointments[id].interview) {
          return count + 1;
        } else {
          return count;
        }
      }, 0);

      const openSpots = totalLength - bookedSpots;
      return openSpots;
    }

    const days = state.days.map((day) => day.appointments.includes(id) ? ({
      ...day,
      spots: spots(day),
    }): day)

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //calculate new spots remaining

        setState(prev => ({
          ...prev,
          appointments,
          days
        }));
      })

  };

  const setDay = day => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
