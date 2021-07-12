import React, { useState, useContext } from 'react';
import { Divider, Row, Button } from 'antd';
import moment from 'moment';

import AppLayout from '../../Layout/AppLayout';

import BookVehicleDuration from '../../views/BookVehicleDuration/BookVehicleDuration';
import BookVehicleSpot from '../../views/BookVehicleSpot/BookVehicleSpot';

import { errorNotification } from '../../utils/notificationToasts';

import { AppContext } from '../../context/AppContext';

function BookVehicle() {
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);
  const [noOfHour, setNoOfHour] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const { setParkingDetails, parkingDetails } = useContext(AppContext);

  const handleDateChange = (date) => {
    setBookingTime(null);
    setNoOfHour(null);

    setBookingDate(date);
  };

  const handleTimeChange = (time) => {
    if (!bookingDate)
      return errorNotification({
        title: 'Oops!',
        description: 'Please select date first',
        duration: 2,
      });

    setNoOfHour(null);
    setBookingTime(time);
  };

  const handleHourChange = (hour) => {
    if (!bookingTime)
      return errorNotification({
        title: 'Oops!',
        description: 'Please select time first',
        duration: 2,
      });

    const reservingHours = moment(bookingTime).add(hour, 'h').format('HH');
    console.log(reservingHours);
    if (reservingHours >= 8 && reservingHours <= 18) setNoOfHour(hour);
    else
      return errorNotification({
        title: 'Oops!',
        description: 'Time should not Within Working hours of 8 AM to 6 PM',
        duration: 2,
      });
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
              handleDateChange={handleDateChange}
              handleHourChange={handleHourChange}
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
          disabled={!bookingDate || !bookingTime || !noOfHour || !selectedSpot}
          className='bg-dark'
          onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </AppLayout>
  );
}

export default BookVehicle;
