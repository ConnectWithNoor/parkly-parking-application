import React, { useState, useContext } from 'react';
import { Divider, Row, Button, Spin } from 'antd';

import AppLayout from '../../Layout/AppLayout';

import BookVehicleDuration from '../../views/BookVehicleDuration/BookVehicleDuration';
import BookVehicleSpot from '../../views/BookVehicleSpot/BookVehicleSpot';

import {
  errorNotification,
  successNotification,
} from '../../utils/functions/notificationToasts';
import {
  addHoursAndFormatHours,
  formatDate,
  formatHours,
} from '../../utils/functions/momentTimeAndDate';

import { AppContext } from '../../context/AppContext';

import {
  searchReservedSpots,
  reserveParkingSpot,
} from '../../firebase/firebaseDb';

function BookVehicle() {
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);
  const [noOfHour, setNoOfHour] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showSpots, setShowSpots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservedSpots, setReservedSpots] = useState(null);

  const { parkingDetails, userDetails } = useContext(AppContext);

  const handleDateChange = (date) => {
    setBookingTime(null);
    setNoOfHour(null);
    setShowSpots(null);

    setBookingDate(date);
  };

  const handleTimeChange = (time) => {
    if (!bookingDate)
      return errorNotification({
        title: 'Oops!',
        description: 'Please select date first',
        duration: 2,
      });

    const reservedTime = formatHours(time);

    // from 8 AM to 5 PM
    if (reservedTime >= 8 && reservedTime <= 17) {
      setNoOfHour(null);
      setShowSpots(null);
      setBookingTime(time);
      return;
    }

    return errorNotification({
      title: 'Oops!',
      description: 'Time should not Within Working hours of 8 AM to 5 PM',
      duration: 2,
    });
  };

  const handleHourChange = (hour) => {
    if (!bookingTime)
      return errorNotification({
        title: 'Oops!',
        description: 'Time should not Within Working hours of 8 AM to 6 PM',
        duration: 2,
      });

    const reservingHours = addHoursAndFormatHours(bookingTime, hour);

    if (reservingHours >= 8 && reservingHours <= 18) {
      setNoOfHour(hour);
      setShowSpots(null);
    } else
      return errorNotification({
        title: 'Oops!',
        description: 'Time should not Within Working hours of 8 AM to 6 PM',
        duration: 2,
      });
  };

  const handleShowSpots = async () => {
    if (!parkingDetails?.sectionId)
      return errorNotification({
        title: 'An Error Occured',
        description: 'Please select the Parking Section First',
        duration: 2,
      });
    try {
      setLoading(true);

      const { success, reservedSpotsData, errorMessage } =
        await searchReservedSpots({
          section_id: parkingDetails.sectionId,
          date: formatDate(bookingDate),
          bookingTime,
          noOfHour,
        });

      if (errorMessage) {
        return errorNotification({
          title: 'An Error Occured',
          description: errorMessage,
          duration: 2,
        });
      }

      if (success) {
        setReservedSpots(reservedSpotsData);
        setShowSpots(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    try {
      setLoading(true);

      const { success, errorMessage } = await reserveParkingSpot({
        sectionId: parkingDetails.sectionId,
        date: formatDate(bookingDate),
        startTime: bookingTime,
        spotId: selectedSpot,
        userId: userDetails.id,
        bookingTime,
        noOfHour,
      });

      if (errorMessage) {
        return errorNotification({
          title: 'An Error Occured',
          description: errorMessage,
          duration: 2,
        });
      }

      if (success) {
        successNotification({
          title: 'Reservation Successful',
          description: 'You have successfully reserved your parking spot.',
          duration: 2,
        });
        setBookingDate(null);
        setBookingTime(null);
        setNoOfHour(null);
        setSelectedSpot(null);
        setShowSpots(null);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='bg-gray-3 t-center radius-1'>
          <p className='pt-1rem f-bold'>
            You have Selected Parking Section: {parkingDetails?.sectionId}
          </p>
          <div className='p-1rem'>
            <Spin spinning={loading}>
              <BookVehicleDuration
                bookingDate={bookingDate}
                bookingTime={bookingTime}
                handleTimeChange={handleTimeChange}
                noOfHour={noOfHour}
                handleDateChange={handleDateChange}
                handleHourChange={handleHourChange}
                handleShowSpots={handleShowSpots}
              />
            </Spin>
          </div>
        </div>
        <Divider />
        {showSpots && (
          <Spin spinning={loading}>
            <Row>
              {Array.from({ length: 12 }).map((a, index) => (
                <BookVehicleSpot
                  key={index}
                  setSelectedSpot={setSelectedSpot}
                  spotId={index + 1}
                  selectedSpot={selectedSpot}
                  reservedSpots={reservedSpots.find(
                    (el) => el.spot_id === index + 1
                  )}
                />
              ))}
            </Row>
            <Button
              type='primary'
              size='large'
              block
              disabled={
                !bookingDate || !bookingTime || !noOfHour || !selectedSpot
              }
              className='bg-dark'
              onClick={handleNextStep}>
              Next
            </Button>
          </Spin>
        )}
      </div>
    </AppLayout>
  );
}

export default BookVehicle;
