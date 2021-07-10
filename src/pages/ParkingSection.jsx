import React, { useState } from 'react';
import { Col, Row, Button, Divider } from 'antd';
import { useHistory } from 'react-router-dom';

import AppLayout from '../Layout/AppLayout';

import spaceOne from '../assets/images/parking-space-1.jpg';
import spaceTwo from '../assets/images/parking-space-2.jpg';
import spaceThree from '../assets/images/parking-space-3.jpg';

function ParkingSection() {
  const [parkingSpace, SetParkingSpace] = useState(null);
  const history = useHistory();

  const handleNextStep = () => {
    history.push('/book-vehicle');
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='d-flex justify-content-between'>
          <h1 className='border-bottom f-light'>
            Please Select a Parking Section
          </h1>
          <Button
            type='primary'
            disabled={!parkingSpace}
            onClick={handleNextStep}>
            Next
          </Button>
        </div>
        <Divider />
        <div className='mt-1rem'>
          <Row>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div
                className={`t-center w-100 p-1rem hover-effect ${
                  parkingSpace === 1 && 'selected'
                }`}
                onClick={() => SetParkingSpace(1)}>
                <span>Section 1</span>
                <img
                  src={spaceOne}
                  alt='space-1'
                  className='w-100 h-70 radius-1 mt-1rem'
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div
                className={`t-center w-100 p-1rem hover-effect ${
                  parkingSpace === 2 && 'selected'
                }`}
                onClick={() => SetParkingSpace(2)}>
                <span>Section 2</span>

                <img
                  src={spaceTwo}
                  alt='space-2'
                  className='w-100 h-70 radius-1 mt-1rem'
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div
                className={`t-center w-100 p-1rem hover-effect ${
                  parkingSpace === 3 && 'selected'
                }`}
                onClick={() => SetParkingSpace(3)}>
                <span>Section 3</span>
                <img
                  src={spaceThree}
                  alt='space-3'
                  className='w-100 h-70 radius-1 mt-1rem'
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </AppLayout>
  );
}

export default ParkingSection;
