import React, { useState } from 'react';
import { Col, Row, Button, Divider, Spin, Image } from 'antd';
import { useHistory } from 'react-router-dom';

import AppLayout from '../Layout/AppLayout';

import spaceOne from '../assets/images/parking-space-1.jpg';
import spaceTwo from '../assets/images/parking-space-2.jpg';
import spaceThree from '../assets/images/parking-space-3.jpg';

function ParkingSection() {
  const [parkingSpace, setParkingSpace] = useState(null);
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
              <ImageGrid
                ParkingSpaceId={1}
                parkingSpace={parkingSpace}
                setParkingSpace={setParkingSpace}
                imgSrc={spaceOne}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <ImageGrid
                ParkingSpaceId={2}
                parkingSpace={parkingSpace}
                setParkingSpace={setParkingSpace}
                imgSrc={spaceTwo}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <ImageGrid
                ParkingSpaceId={3}
                parkingSpace={parkingSpace}
                setParkingSpace={setParkingSpace}
                imgSrc={spaceThree}
              />
            </Col>
          </Row>
        </div>
      </div>
    </AppLayout>
  );
}

function ImageGrid({ setParkingSpace, ParkingSpaceId, parkingSpace, imgSrc }) {
  return (
    <div
      className={`t-center w-100 p-1rem hover-effect ${
        parkingSpace === ParkingSpaceId && 'selected'
      }`}
      onClick={() => setParkingSpace(ParkingSpaceId)}>
      <span>Section {ParkingSpaceId}</span>
      <Image
        src={imgSrc}
        alt={ParkingSpaceId}
        className='w-100 h-70 radius-1 mt-1rem'
        preview={false}
        placeholder={
          <div className='w-100 h-100'>
            <Spin spinning />
          </div>
        }
      />
    </div>
  );
}

export default ParkingSection;
