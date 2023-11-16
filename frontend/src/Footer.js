import './Footer.css';

import AboutImg from './about-image.png';

function Footer({ setShowAboutModal }) {
  return (
    <footer className="Footer">
      <img
        src={ AboutImg }
        onMouseDown={() => setShowAboutModal(true) }
        className="Footer_about-image"
        alt="About group five"
      />
    </footer>
  );
}

export default Footer;
