import { useState } from 'react';
import './QuestionModal.css';

function QuestionModal({ setShowQuestionModal }) {

  const [ closeBtnPressed, setCloseBtnPressed ] = useState(false);

  function handleCancel() {
    setCloseBtnPressed(false);
    setShowQuestionModal(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <ul className="Question_ul">
          <li>Use Group Five to try new restaurants and meet new people.</li>
          <li>All authentication is done via text message.</li>
          <li>Click the join or waitlist button to confirm a seat.</li>
          <li>To cancel your seat respond with 'Cancel' in the same text message thread.</li>
          <li>We hope you enjoy being a part of this experiement. &#x1F64F;</li>
        </ul>

        <div>
          <button 
            className={`
              button-active
              Question_modal-btn
              ${closeBtnPressed ? "btn-pressed" : "btn-notpressed"}`
            }
            onMouseDown={() => setCloseBtnPressed(true)}
            onMouseUp={() => handleCancel()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


export default QuestionModal;

