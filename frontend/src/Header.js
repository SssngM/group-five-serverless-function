import httpRequest from './utils/url-config';

import './Header.css';
import LogoLeft from './logo-left.svg';
import QuestionIcon from './question-icon.svg';
import LogoRight from './logo-right.svg';

function Header({ setShowEventIntakeModal }) {
  function callApiTest() {
    httpRequest.get('/api/users')
      .then(response => {
        console.log('response.data...', response.data);
      })
      .catch(error => {
        console.log(error);
      });  
  }

  function openEventIntakeModal () {
    setShowEventIntakeModal(true);
  }

  return (
    <header onMouseDown={() => openEventIntakeModal()} className="Header">
      <img src={ LogoLeft } className="Header_logo-left" alt="logo-left" />
      <img src={ QuestionIcon } onMouseDown={() => openEventIntakeModal()} className="Header_question-icon" alt="logo-left" />
      <img src={ LogoRight } className="Header_logo-right" alt="logo-left" />
    </header>
  );
}

export default Header;
