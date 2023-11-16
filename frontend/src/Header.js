import httpRequest from './utils/url-config';

import './Header.css';
import LogoLeft from './logo-left.png';
import QuestionIcon from './question-icon.svg';
import LogoRight from './logo-right.svg';

function Header({ setShowEventIntakeModal, setShowQuestionModal }) {
  function callApiTest() {
    httpRequest.get('/api/users')
      .then(response => {
        console.log('response.data...', response.data);
      })
      .catch(error => {
        console.log(error);
      });  
  }

  function openModal(type) {
    if (type === 'question') {
      setShowQuestionModal(true);
    }

    if (type === 'eventForm') {
      setShowEventIntakeModal(true);
    }
  }

  return (
    <header className="Header">
      <img src={ LogoLeft } className="Header_logo-left" alt="logo-left" />
      <img src={ QuestionIcon } onMouseDown={() => openModal('question') } className="Header_question-icon" alt="logo-left" />
    </header>
  );
}

export default Header;
