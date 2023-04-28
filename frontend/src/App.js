import './App.css';
import { useState } from 'react';
import Header from './Header';
import EventList from './EventList';
import PhoneIntake from './PhoneIntake';

function App() {
  const [ modal, setModal ] = useState(false);
  const [ event, setEvent ] = useState({});
  const [ listType, setListType ] = useState('');
  const [ events, setEvents ] = useState([]);

  return (
    <div className="App">
      <Header />
      {/* <EventForm /> */}
      <EventList
        setModal={setModal}
        setEvent={setEvent}
        setEvents={setEvents}
        events={events}
        setListType={setListType} 
      />
      { modal && <PhoneIntake
          event={event}
          setModal={setModal}
          setEvent={setEvent}
          setEvents={setEvents}
          listType={listType}
        /> }
    </div>
  );
}

export default App;
