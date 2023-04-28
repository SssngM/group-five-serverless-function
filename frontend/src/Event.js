import "./Event.css";
import UserOctagon from "./useroctagon.svg";
import { useState } from "react";

function Event({ event, setModal, setEvent, setListType }) {
  const guestListIsFull = event?.attendees?.length >= event?.guest_max_count;
  const waitlistIsFull = event?.waitlistees?.length >= event?.waitlist_max_count;

  const joinIsDisabled = guestListIsFull;
  const waitlistIsDisabled = !guestListIsFull || waitlistIsFull;

  const [ joinBtnPressed, setJoinBtnPressed ] = useState(false);
  const [ waitlistBtnPressed, setWaitlistBtnPressed ] = useState(false);

  function joinGuestlist() {
    setJoinBtnPressed(false);
    setModal(true);
    setEvent(event);
    setListType('guestlist');
  }

  function joinWaitlist() {
    setWaitlistBtnPressed(false)
    setModal(true);
    setEvent(event);
    setListType('waitlist');
  }

  return (
    <div className="Event">
      <div className="Event_details">
        <div className="Event_details-left">
            <h2>{ event.title }</h2>
            <h3>{ event.address }</h3>
        </div>
        <div className="Event_details-right">
          <div className="Event_user-count">
            <h3>{ event.attendees.length }</h3>
            <h3>/</h3>
            <h3>{ event.guest_max_count }</h3>
            <h3>
              <img
                src={ UserOctagon }
                className="Event_useroctagon"
                alt="user octagon" 
              />
            </h3>
          </div>
          <div className="Event_date">
            <h4>{ event.formattedDate }</h4>
          </div>
          <div className="Event_time">
            <h4>{ event.formattedStartTime }</h4>
            <h4><span>-</span></h4>
            <h4>{ event.formattedEndTime }</h4>
          </div>
        </div>
      </div>

      <div className="Event_buttons">
        <button
          onMouseDown={() => setJoinBtnPressed(true)}
          onMouseUp={() => joinGuestlist()}
          disabled={ joinIsDisabled }
          className={ `
            ${ joinIsDisabled ? "button-disabled" : "button-active" }
            ${ joinBtnPressed ? "btn-pressed" : "btn-notpressed" }
          `}
        >
          join
        </button>
        <button
          onMouseDown={() => setWaitlistBtnPressed(true)}
          onMouseUp={() => joinWaitlist()}
          disabled={ waitlistIsDisabled }
          className={ `
            ${ waitlistIsDisabled ? "button-disabled" : "button-active" }
            ${ waitlistBtnPressed ? "btn-pressed" : "btn-notpressed" }
          `}
        >
          waitlist
        </button>
      </div>
    </div>
  );
}

export default Event;

