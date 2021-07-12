import React, { useState, useContext } from 'react';
import { Divider, Row, Button } from 'antd';
import moment from 'moment';

import AppLayout from '../../Layout/AppLayout';

import BookVehicleDuration from '../../views/BookVehicleDuration/BookVehicleDuration';
import BookVehicleSpot from '../../views/BookVehicleSpot/BookVehicleSpot';

import { errorNotification } from '../../utils/notificationToasts';

import { AppContext } from '../../context/AppContext';

function BookVehicle() {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState(false);
  const [noOfHour, setNoOfHour] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const { setParkingDetails, parkingDetails } = useContext(AppContext);

  const onDatePickerChange = (date) => {
    setBookingDate(date);
  };

  const onSelectHoursChange = (hour) => {
    if (!bookingTime)
      return errorNotification({
        title: 'Oops!',
        description: 'Please select time first',
      });

    const reservingHours = moment(bookingTime).add(hour, 'h').format('HH');
    if (reservingHours >= 8 && reservingHours <= 18) setNoOfHour(hour);
    else
      return errorNotification({
        title: 'Oops!',
        description: 'Time should not Within Working hours of 8 AM to 6 PM',
        duration: 2,
      });
  };

  const handleTimeChange = (time) => {
    setNoOfHour(null);
    setBookingTime(time);
  };

  const handleNextStep = () => {
    console.log(123);
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='bg-gray-3 t-center radius-1'>
          <p className='pt-1rem f-bold'>
            You have Selected Parking Section: {parkingDetails.sectionId}
          </p>
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
          className='bg-dark'
          onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}

export default BookVehicle;
