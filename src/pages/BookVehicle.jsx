import React, { useState, useEffect } from 'react';
import { DatePicker, Row, Col, Space, TimePicker, Select, Alert } from 'antd';

import AppLayout from '../Layout/AppLayout';

const { Option } = Select;

function BookVehicle() {
  const [error, setError] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState(false);
  const [noOfHour, setNoOfHour] = useState(null);

  const onDatePickerChange = (date) => {
    setBookingDate(date);
  };

  const onSelectHoursChange = (hour) => {
    if (!bookingTime) return setError('Please select time First');
    // need to add logic here.
    setNoOfHour(hour);
  };

  const handleTimeChange = (time) => {
    setBookingTime(time);
  };

  const disabledDate = (current) => {
    return current && current.valueOf() < Date.now();
  };

  const disabledHours = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
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
            <Row>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className='d-flex flex-column'>
                  <Space direction='vertical'>
                    <span className='f-light'>Select Date</span>
                    <DatePicker
                      onChange={onDatePickerChange}
                      picker='date'
                      disabledDate={disabledDate}
                      value={bookingDate}
                    />
                  </Space>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className='d-flex flex-column'>
                  <Space direction='vertical'>
                    <span className='f-light'>Select Time</span>
                    <TimePicker
                      use12Hours
                      format={'h:mm a'}
                      disabledHours={disabledHours}
                      onChange={handleTimeChange}
                      value={bookingTime}
                    />
                  </Space>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className='d-flex flex-column'>
                  <Space direction='vertical'>
                    <span className='f-light'>Select Hours</span>
                    <Select
                      style={{ width: 200 }}
                      placeholder='Select Hours'
                      onChange={onSelectHoursChange}
                      value={noOfHour}>
                      <Option value={null}> --Select-- </Option>
                      <Option value='1'>1 Hr</Option>
                      <Option value='2'>2 Hr</Option>
                      <Option value='3'>3 Hr</Option>
                      <Option value='4'>4 Hr</Option>
                      <Option value='5'>5 Hr</Option>
                      <Option value='6'>6 Hr</Option>
                      <Option value='7'>7 Hr</Option>
                      <Option value='8'>8 Hr</Option>
                    </Select>
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default BookVehicle;
