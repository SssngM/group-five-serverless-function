import { useState } from 'react';
import './PhoneIntake.css';
import httpRequest from './utils/url-config';

function PhoneIntake({ setModal }) {
  const [ phoneNumber, setPhoneNumber ] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Submitted phone number: ${phoneNumber}`);

    httpRequest.get(`/api/phone-intake?number=${phoneNumber}`)
      // http://localhost:5000/phone-intake?number=4158865021
      .then(response => {
        console.log('response.data...', response.data);
        setModal(false);
      })
      .catch(error => {
        console.log(error);
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
            // value={ '4158865021' }
            value={ phoneNumber }
          />
          <button className="button-active" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PhoneIntake;
