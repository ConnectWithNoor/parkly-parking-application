import React from 'react';
import { Col, Image, Divider, Button, Spin } from 'antd';

import spotAvail from '../../assets/images/spot-available.png';
// import spotUnvail from '../../assets/images/spot-unavailable.png';

function BookVehicleSpot({ selectedSpot, setSelectedSpot, spotId }) {
  return (
    <>
      <Col xs={24} sm={24} md={8} lg={6} xl={6}>
        <div className='t-center p-1rem'>
          <div className='bg-white p-1rem radius-1 w-100'>
            <p className='f-lato'>Spot Id: {spotId}</p>
            <Image
              src={spotAvail}
              alt='parking-spot'
              className='radius-1 mt-1rem'
              preview={false}
              placeholder={
                <div className='w-100 h-100'>
                  <Spin spinning />
                </div>
              }
            />
            <Button
              type='primary'
              htmlType='button'
              className={`mt-4rem w-100 bg-dark ${
                selectedSpot === spotId && 'selected-blue'
              }`}
              onClick={() => setSelectedSpot(spotId)}
              style={{ height: '3rem' }}>
              Book Spot Now
            </Button>
          </div>
          <Divider type='vertical' />
        </div>
        <Divider />
      </Col>
    </>
  );
}

export default BookVehicleSpot;
