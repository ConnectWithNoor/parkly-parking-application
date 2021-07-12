import React, { useState, useContext, useEffect } from 'react';
import { Col, Row, Button, Divider, Spin, Image } from 'antd';
import { useHistory } from 'react-router-dom';

import AppLayout from '../../Layout/AppLayout';

import { AppContext } from '../../context/AppContext';

import spaceOne from '../../assets/images/parking-space-1.jpg';
import spaceTwo from '../../assets/images/parking-space-2.jpg';
import spaceThree from '../../assets/images/parking-space-3.jpg';

function ParkingSection() {
  const [sectionId, setSectionId] = useState(null);
  const { setParkingDetails, parkingDetails } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    setSectionId(parkingDetails?.sectionId);
  }, [parkingDetails]);

  const handleNextStep = () => {
    setParkingDetails((prevState) => ({
      ...prevState,
      sectionId,
    }));

    history.push('/book-vehicle');
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex justify-content-between w-60 '>
            <h1 className='border-bottom  p-halfrem f-light'>
              Please Select a Parking Section
            </h1>
            <h1 className='bg-white p-halfrem radius-1'>
              Currently Selected: {sectionId || 'Not Selected'}
            </h1>
          </div>
          <Button
            type='primary'
            disabled={!sectionId}
            onClick={handleNextStep}
            className='bg-dark '>
            Next
          </Button>
        </div>
        <Divider />
        <div className='mt-1rem'>
          <Row>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <ImageGrid
                ParkingSpaceId={1}
                sectionId={sectionId}
                setSectionId={setSectionId}
                imgSrc={spaceOne}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <ImageGrid
                ParkingSpaceId={2}
                sectionId={sectionId}
                setSectionId={setSectionId}
                imgSrc={spaceTwo}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <ImageGrid
                ParkingSpaceId={3}
                sectionId={sectionId}
                setSectionId={setSectionId}
                imgSrc={spaceThree}
              />
            </Col>
          </Row>
        </div>
      </div>
    </AppLayout>
  );
}

function ImageGrid({ setSectionId, ParkingSpaceId, sectionId, imgSrc }) {
  return (
    <div
      className={`t-center w-100 p-1rem hover-effect ${
        sectionId === ParkingSpaceId && 'selected'
      }`}
      onClick={() => setSectionId(ParkingSpaceId)}>
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
