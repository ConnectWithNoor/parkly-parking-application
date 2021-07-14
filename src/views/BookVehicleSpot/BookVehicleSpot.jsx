import React, { useState, useEffect } from 'react';
import { Col, Image, Divider, Button, Spin, Tooltip } from 'antd';
import moment from 'moment';

import spotAvail from '../../assets/images/spot-available.png';
import spotUnvail from '../../assets/images/spot-unavailable.png';

import { MOMENT_FORMAT } from '../../utils/constants';

function BookVehicleSpot({
  selectedSpot,
  setSelectedSpot,
  spotId,
  reservedSpots,
}) {
  const [isSpotAvail, setIsSpotAvail] = useState(true);
  const [tooltipTitle, setTooltipTitle] = useState(null);

  useEffect(() => {
    const checkSpotAvail = () => {
      if (reservedSpots?.spot_id == spotId) {
        setIsSpotAvail(false);
        setTooltipTitle(
          `Booking hours overlapping from ${moment(
            reservedSpots.start_time,
            `${MOMENT_FORMAT.HOURS}:${MOMENT_FORMAT.MINUTES}`
          ).format(`h:${MOMENT_FORMAT.MINUTES} a`)} to ${moment(
            reservedSpots.end_time,
            `${MOMENT_FORMAT.HOURS}:${MOMENT_FORMAT.MINUTES}`
          ).format(`h:${MOMENT_FORMAT.MINUTES} a`)}`
        );
      }
    };

    checkSpotAvail();
  }, []);

  return (
    <>
      <Col xs={24} sm={24} md={8} lg={6} xl={6}>
        <div className='t-center p-1rem'>
          <Tooltip title={tooltipTitle} placement='top'>
            <div className='bg-white p-1rem radius-1 w-100'>
              <p className='f-lato'>Spot Id: {spotId}</p>
              <Image
                src={isSpotAvail ? spotAvail : spotUnvail}
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
                disabled={!isSpotAvail}
                onClick={() => setSelectedSpot(spotId)}
                style={{ height: '3rem' }}>
                Book Spot Now
              </Button>
            </div>
            <Divider type='vertical' />
          </Tooltip>
        </div>
        <Divider />
      </Col>
    </>
  );
}

export default BookVehicleSpot;
