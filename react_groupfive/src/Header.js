import './Header.css';
import LogoLeft from './logo-left.svg';
import QuestionIcon from './question-icon.svg';
import LogoRight from './logo-right.svg';

function Header() {
  return (
    <header className="Header">
      <img src={ LogoLeft } className="Header_logo-left" alt="logo-left" />
      <img src={ QuestionIcon } className="Header_question-icon" alt="logo-left" />
      <img src={ LogoRight } className="Header_logo-right" alt="logo-left" />
    </header>
  );
}

export default Header;
