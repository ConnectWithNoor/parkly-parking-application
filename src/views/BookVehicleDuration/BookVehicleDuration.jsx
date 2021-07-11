import React from 'react';
import { DatePicker, Row, Col, Space, TimePicker, Select } from 'antd';

const { Option } = Select;

function BookVehicleDuration({
  onDatePickerChange,
  bookingDate,
  handleTimeChange,
  bookingTime,
  onSelectHoursChange,
  noOfHour,
}) {
  const disabledDate = (current) => {
    return current && current.valueOf() < Date.now();
  };

  const disabledHours = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
  };

  return (
    <div>
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
  );
}

export default BookVehicleDuration;
