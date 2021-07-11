import React, { useState } from 'react';
import { Alert, Divider, Row, Button } from 'antd';
import moment from 'moment';

import AppLayout from '../../Layout/AppLayout';

import BookVehicleDuration from '../../views/BookVehicleDuration/BookVehicleDuration';
import BookVehicleSpot from '../../views/BookVehicleSpot/BookVehicleSpot';

function BookVehicle() {
  const [error, setError] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState(false);
  const [noOfHour, setNoOfHour] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const onDatePickerChange = (date) => {
    setBookingDate(date);
  };

  const onSelectHoursChange = (hour) => {
    if (!bookingTime) return setError('Please select time First');

    if (moment(bookingTime).add(hour, 'h').format('HH') >= 18)
      return setError('Time should not exceed 18:00 Hr');

    setNoOfHour(hour);
  };

  const handleTimeChange = (time) => {
    setBookingTime(time);
  };

  const handleNextStep = () => {
    console.log(123);
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        {error && (
          <Alert
            message={error}
            type='error'
            closable
            onClose={() => setError(null)}
          />
        )}
        <div className='bg-gray-3 t-center radius-1'>
          <p className='pt-1rem f-bold'>You have Selected Parking Section 2</p>
          <div className='p-1rem'>
            <BookVehicleDuration
              bookingDate={bookingDate}
              bookingTime={bookingTime}
              handleTimeChange={handleTimeChange}
              noOfHour={noOfHour}
              onDatePickerChange={onDatePickerChange}
              onSelectHoursChange={onSelectHoursChange}
            />
          </div>
        </div>
        <Divider />
        <Row>
          {Array.from({ length: 12 }).map((a, i) => (
            <BookVehicleSpot
              key={i}
              setSelectedSpot={setSelectedSpot}
              spotId={i + 1}
              selectedSpot={selectedSpot}
            />
          ))}
        </Row>
        <Button
          type='primary'
          size='large'
          block
          disabled={!selectedSpot}
          onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}

export default BookVehicle;
