import Event from './Event';
import './EventList.css';
import { useEffect } from 'react';
import httpRequest from './utils/url-config';

function EventList({ setModal, setEvent, setListType, setEvents, events }) {

  useEffect(() => {
    httpRequest.get(`/api/events`)
      .then(response => {
        console.log('response.data...', response.data);
        setEvents(response.data);
        formatDate(response.data);
      })
      .catch(error => {
        console.log('error : ', error);
      });  
  }, []);

  function formatDate(events) {
    events = events.map(event => {
      const { start_time, end_time } = event;
      return {
        ...event,
        formattedDate: getDateString(start_time),
        formattedStartTime: getTimeString(start_time),
        formattedEndTime: getTimeString(end_time),
      }
    });

    setEvents(events);
  }

  function getTimeString(date) {
    const dateObj = new Date(date);
    const localTimeString = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC' // Specify the timezone as UTC
    });

    return localTimeString;
  }

  function getDateString(date) {
    const dateObj = new Date(date);
    const config = {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', config).format(dateObj);
    return formattedDate.replace(',', '');
  }


  return (
    <div className="EventList">
      { events.map(event => (
        <Event
          event={event}
          setModal={setModal}
          setEvent={setEvent} 
          setListType={setListType}
        />
      ))}
    </div>
  );
}



EventList.defaultProps = {
  events : [
    {
      id: '1',
      title: 'YH - BEIJING',
      description: 'Meet for dinner and conversation in the lower haight', 
      reservation_name: 'Jamie Lane', 
      address: '500 Haight St, San Francisco, CA 94117', 
      instructions: 'Ask for Jamie part of five',
      start_time: '7:00pm',
      end_time: '9:00pm',
      date: 'Thursday 2/16',
      status: 'pending',
      alcohol: true,
      joinlist_min: 4,
      guest_max_count: 6,
      joinlist_count: 4,
      waitlist_max_count: 6, 
      waitlist_count: 0,
      visibility: 'public',
      map_url: 'https://www.google.com/maps/place/YH+-+BEIJING+%E9%A2%90%E5%92%8C%E5%8C%97%E4%BA%AC/@37.7721938,-122.431713,18z/data=!3m1!4b1!4m5!3m4!1s0x808580a6c62a9fe5:0xb54e25c0baa0f59b!8m2!3d37.7722255!4d-122.4306252'
    },
    {
      id: '2',
      title: 'YH - BEIJING',
      description: 'Meet for dinner and conversation in the lower haight', 
      reservation_name: 'Jamie Lane', 
      address: '500 Haight St, San Francisco, CA 94117', 
      instructions: 'Ask for Jamie part of five',
      start_time: '7:00pm',
      end_time: '9:00pm',
      date: 'Friday 2/17',
      status: 'pending',
      alcohol: true,
      joinlist_min: 4,
      guest_max_count: 6,
      joinlist_count: 6,
      waitlist_max_count: 6, 
      waitlist_count: 2,
      map_url: 'https://www.google.com/maps/place/YH+-+BEIJING+%E9%A2%90%E5%92%8C%E5%8C%97%E4%BA%AC/@37.7721938,-122.431713,18z/data=!3m1!4b1!4m5!3m4!1s0x808580a6c62a9fe5:0xb54e25c0baa0f59b!8m2!3d37.7722255!4d-122.4306252',
      visibility: 'public',
    },
    {
      id: '3',
      title: 'YH - BEIJING',
      description: 'Meet for dinner and conversation in the lower haight', 
      reservation_name: 'Jamie Lane', 
      address: '500 Haight St, San Francisco, CA 94117', 
      instructions: 'Ask for Jamie part of five',
      start_time: '2:00pm',
      end_time: '4:00pm',
      date: 'Saturday 2/18',
      status: 'pending',
      alcohol: true,
      joinlist_min: 4,
      guest_max_count: 6,
      joinlist_count: 6,
      waitlist_max_count: 6, 
      waitlist_count: 6,
      map_url: 'https://www.google.com/maps/place/YH+-+BEIJING+%E9%A2%90%E5%92%8C%E5%8C%97%E4%BA%AC/@37.7721938,-122.431713,18z/data=!3m1!4b1!4m5!3m4!1s0x808580a6c62a9fe5:0xb54e25c0baa0f59b!8m2!3d37.7722255!4d-122.4306252',
      visibility: 'public',
    },
  ]
};

export default EventList;
