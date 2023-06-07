import './App.css';
import { useState } from 'react';
import Header from './Header';
import EventList from './EventList';
import PhoneIntake from './PhoneIntake';
import EventIntake from './EventIntake';
import QuestionModal from './QuestionModal';
import LoadingComponent from './LoadingComponent';

function App() {
  const [ modal, setModal ] = useState(false);
  const [ showEventIntakeModal, setShowEventIntakeModal ] = useState(false);
  const [ showQuestionModal, setShowQuestionModal ] = useState(false);
  const [ event, setEvent ] = useState({});
  const [ listType, setListType ] = useState('');
  const [ events, setEvents ] = useState([]);
  const [ showLoadingComponent, setShowLoadingComponent ] = useState(false);

  function loadingJSX() {
    return <LoadingComponent />;
  }

  function appJSX() {
    return (
      <div className="App">
        <Header
          setShowEventIntakeModal={setShowEventIntakeModal} 
          setShowQuestionModal={setShowQuestionModal} 
        />
        <EventList
          setModal={setModal}
          setEvent={setEvent}
          setEvents={setEvents}
          setListType={setListType} 
          events={events}
        />
        { modal && <PhoneIntake
            event={event}
            setModal={setModal}
            setEvent={setEvent}
            setEvents={setEvents}
            listType={listType}
            setShowLoadingComponent={setShowLoadingComponent}
          /> }


        { showEventIntakeModal && <EventIntake 
            setShowEventIntakeModal={setShowEventIntakeModal} 
          /> }

        { showQuestionModal && <QuestionModal 
            setShowQuestionModal={setShowQuestionModal} 
          /> }
      </div>
    )
  }


  return (
    <div>
      { showLoadingComponent ? loadingJSX() : appJSX() }
    </div>
  );
}

export default App;
