import { useState } from 'react';
// import './PhoneIntake.css';
import './EventIntake.css';
import httpRequest from './utils/url-config';
import EventOne from './EventIntakeModel';

function EventIntake({ setShowEventIntakeModal }) {
  const [ values, setValues ] = useState({});

  function handleSubmit(evt) {
    evt.preventDefault();

    const selectedStartTimeUTC = new Date(values.start_time);
    const selectedEndTimeUTC = new Date(values.end_time);

    const valuesCopy = { 
      ...values,
      start_time: selectedStartTimeUTC.toISOString(),
      end_time: selectedEndTimeUTC.toISOString(),
      first_reminder_alert_time: selectedStartTimeUTC.toISOString(),
      second_reminder_alert_time: selectedEndTimeUTC.toISOString(),
    };
    // setValues(values => valuesCopy);

    console.log('valuesCopy...', valuesCopy)
    httpRequest.post('/api/create_event', valuesCopy)
      .then(response => {
        // close loding spinner
        console.log('response...', response) 
        setShowEventIntakeModal(false);
        // setEvents(events => (events.map(curEvent => {
        //   if (curEvent.id === event.id) {
        //     return {...curEvent, attendees: response.data.attendees}
        //   } 
        //   return curEvent;
        // })));
      })
      .catch(error => {
        console.log('error:', error);
        // close loding spinner
        setShowEventIntakeModal(false);
      });  

    console.log('valuesCopy...', valuesCopy)
  };

  function handleChange(event) {
    console.log(event.target.id, event.target.value) 
    setValues({
      ...values,
      [event.target.id]: event.target.value
    });
  };

  const timeFormatInputs = [
    'start_time', 
    'end_time', 
    'first_reminder_alert_time', 
    'second_reminder_alert_time',
  ];

  return (
    <div className="modal-overlay phone-intake">
      <div className="modal">
        <form onSubmit={handleSubmit} className="phone-intake_form">
          {Object.keys(EventOne).map(key => (
            <div key={key}>
              <label className="intake-label" htmlFor={key}>{key}:</label>
              { timeFormatInputs.includes(key) ? (
                <input
                  id={key}
                  style={{'marginTop': '4px'}}
                  type="datetime-local"
                  onChange={handleChange}
                  value={values[key] || ""}
                />
              ) : (
                <input
                  id={key}
                  type="text"
                  style={{'marginTop': '4px'}}
                  onChange={handleChange}
                  value={values[key] || ""}
                />
              )}
            </div>
          ))}
            <div style={{ 'paddingTop': '20px'}}>
            <button className="button-active" type="submit">
              Submit
            </button>
            <button className="button-active" onClick={() => setShowEventIntakeModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



export default EventIntake;
