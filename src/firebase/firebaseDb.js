import moment from 'moment';
import { db } from './firebase';

import { FIREBASE_COLLECTION, MOMENT_FORMAT } from '../utils/constants';

const getUserDataByUid = async (value) => {
  try {
    const user = await db.doc(`/${FIREBASE_COLLECTION.USERS}/${value}`).get();
    const userInfo = {
      ...user.data(),
      id: value,
    };

    return { success: true, userInfo };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const searchReservedSpots = async ({
  section_id,
  date,
  bookingTime,
  noOfHour,
}) => {
  try {
    const reservedSpotsData = [];

    const { docs: reservedSpots } = await db
      .doc(`/${FIREBASE_COLLECTION.PARKING_SPOTS}/section_${section_id}/`)
      .collection(`${FIREBASE_COLLECTION.RESERVATIONS}`)
      .where('date', '==', date)
      .get();

    reservedSpots.forEach((spot) => {
      const data = spot.data();
      const SpotStartTime = moment(
        data.start_time,
        `${MOMENT_FORMAT.HOURS}:${MOMENT_FORMAT.MINUTES}`
      );
      const spotEndTime = moment(
        data.end_time,
        `${MOMENT_FORMAT.HOURS}:${MOMENT_FORMAT.MINUTES}`
      );

      const bookingEndtime = moment(bookingTime).add(noOfHour, 'h');

      const isStartTimeOverlap = moment(bookingTime).isBetween(
        SpotStartTime,
        spotEndTime
      );

      const isEndTimeOverlap = moment(bookingEndtime).isBetween(
        SpotStartTime,
        spotEndTime
      );

      if (isStartTimeOverlap || isEndTimeOverlap) {
        reservedSpotsData.unshift(data);
      }
    });

    return { success: true, reservedSpotsData };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

export { getUserDataByUid, searchReservedSpots };
