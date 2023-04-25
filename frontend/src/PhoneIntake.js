import { useState } from 'react';
import './PhoneIntake.css';
import httpRequest from './utils/url-config';

function PhoneIntake({ setModal, event, listType, setEvents }) {
  const [ phoneNumber, setPhoneNumber ] = useState('4158865021');

  function handleSubmit(evt) {
    evt.preventDefault();

    const data = {
      phone_number: phoneNumber,
      event_id: event.id,
    }

    // needs to start loading spinner here
    httpRequest.post(`/api/${listType}`, data)
      .then(response => {
        // close loding spinner
        setModal(false);
        setEvents(events => (events.map(curEvent => {
          if (curEvent.id === event.id) {
            return {...curEvent, attendees: response.data.attendees}
          } 
          return curEvent;
        })));
      })
      .catch(error => {
        console.log('error:', error);
        // close loding spinner
        setModal(false);
      });  
  };

  function handleChange(event) {
    setPhoneNumber(event.target.value);
  };

  return (
    <div className="modal-overlay phone-intake">
      <div className="modal">
        <form onSubmit={ handleSubmit } className="phone-intake_form">
          <label htmlFor="phoneInput">Phone Number:</label>
          <input
            id="phoneInput"
            type="text"
            onChange={ handleChange }
            value={ phoneNumber }
          />
          <div>
            <button className="button-active" type="submit">Submit</button>
            <button className="button-active" onClick={() => setModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhoneIntake;
