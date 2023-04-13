import "./Event.css";
import UserOctagon from "./useroctagon.svg";
import { useState } from "react";

function Event({ event, setModal }) {
  const joinIsDisabled = event.joinlist_count >= event.joinlist_max; 
  const waitlistIsDisabled = event.waitlist_count >= event.waitlist_max; 
  const [ joinBtnPressed, setJoinBtnPressed ] = useState(false);
  const [ waitlistBtnPressed, setWaitlistBtnPressed ] = useState(false);

  return (
    <div className="Event">

      <div className="Event_details">
        <div className="Event_details-left">
            <h2>{ event.title }</h2>
            <h3>{ event.address }</h3>
        </div>
        <div className="Event_details-right">
          <div className="Event_user-count">
            <h3>{ event.joinlist_count }</h3>
            <h3>/</h3>
            <h3>{ event.joinlist_max }</h3>
            <h3>
              <img src={ UserOctagon } className="Event_useroctagon" alt="user octagon" />
            </h3>
          </div>
          <div className="Event_date">
            <h4>{ event.date }</h4>
          </div>
          <div className="Event_time">
            <h4>{ event.start_time }</h4>
            <h4><span>-</span></h4>
            <h4>{ event.end_time }</h4>
          </div>
        </div>
      </div>

      <div className="Event_buttons">
        <button
          onMouseDown={() => setJoinBtnPressed(true)}
          onMouseUp={() => { setJoinBtnPressed(false); setModal(true) }}
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
          onMouseUp={() => setWaitlistBtnPressed(false)}
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

