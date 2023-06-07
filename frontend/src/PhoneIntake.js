import { useState } from 'react';
import './PhoneIntake.css';
import httpRequest from './utils/url-config';

function PhoneIntake({ setModal, event, listType, setEvents, setShowLoadingComponent }) {
  const [ phoneNumber, setPhoneNumber ] = useState('4158865021');
  const [ submitBtnPressed, setSubmitBtnPressed ] = useState(false);
  const [ cancelBtnPressed, setCancelBtnPressed ] = useState(false);


  function handleSubmit() {
    setSubmitBtnPressed(false);

    const data = {
      phone_number: phoneNumber,
      event_id: event.id,
    }

    setShowLoadingComponent(true);
    httpRequest.post(`/api/${listType}`, data)
      .then(response => {
        setShowLoadingComponent(false);
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
        setShowLoadingComponent(false);
        setModal(false);
      });  
  };

  function handleCancel() {
    setCancelBtnPressed(false);
    setModal(false);
  }

  function handleChange(event) {
    setPhoneNumber(event.target.value);
  };

  return (
    <div className="modal-overlay phone-intake">
      <div className="modal">
        <form className="phone-intake_form">
          <label htmlFor="phoneInput">Phone Number:</label>
          <input
            id="phoneInput"
            type="text"
            onChange={ handleChange }
            value={ phoneNumber }
          />
          <div>
            <button
              className={`button-active ${submitBtnPressed ? "btn-pressed" : "btn-notpressed"}`}
              onMouseDown={() => setSubmitBtnPressed(true)}
              onMouseUp={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              className={`button-active ${cancelBtnPressed ? "btn-pressed" : "btn-notpressed"}`}
              onMouseDown={() => setCancelBtnPressed(true)}
              onMouseUp={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhoneIntake;
