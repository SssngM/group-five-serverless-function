import './App.css';
import { useState } from 'react';
import Header from './Header';
import EventList from './EventList';
import PhoneIntake from './PhoneIntake';

function App() {
  const [modal, setModal] = useState(false);
  return (
    <div className="App">
      <Header />
      {/* <AuthenticationForm /> */}
      {/* <EventForm /> */}
      {/* <InfoDisplay /> */}
      {/* <EventDetail /> */}
      <EventList setModal={setModal} />
      { modal && <PhoneIntake setModal={setModal} /> }
        {/* <Event /> */}
    </div>
  );
}

export default App;
