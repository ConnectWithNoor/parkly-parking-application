import moment from 'moment';
import { uuid } from 'uuidv4';

import { db } from './firebase';

import { FIREBASE_COLLECTION } from '../utils/constants';
import {
  addHours,
  addHoursAndFormatHours,
  formatDate,
  formatTime,
  formatTimeReturnStr,
} from '../utils/functions/momentTimeAndDate';

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
      const SpotStartTime = formatTime(data.start_time);
      const spotEndTime = formatTime(data.end_time);
      const bookingEndtime = addHours(bookingTime, noOfHour);

      const isStartTimeOverlap = moment(bookingTime).isBetween(
        SpotStartTime,
        spotEndTime
      );

      const isEndTimeOverlap = moment(bookingEndtime).isBetween(
        SpotStartTime,
        spotEndTime
      );

      const isSpotStartTimeOverlap = moment(SpotStartTime).isBetween(
        bookingTime,
        bookingEndtime
      );

      const isSpotEndTimeOverlap = moment(spotEndTime).isBetween(
        bookingTime,
        bookingEndtime
      );

      if (
        isStartTimeOverlap ||
        isEndTimeOverlap ||
        isSpotStartTimeOverlap ||
        isSpotEndTimeOverlap
      ) {
        reservedSpotsData.unshift(data);
      }
    });

    return { success: true, reservedSpotsData };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const reserveParkingSpot = async ({
  sectionId,
  date,
  spotId,
  startTime,
  noOfHour,
  userId,
}) => {
  try {
    const uid = uuid();
    await db
      .doc(
        `/${FIREBASE_COLLECTION.PARKING_SPOTS}/section_${sectionId}/${FIREBASE_COLLECTION.RESERVATIONS}/${uid}`
      )
      .set({
        uid,
        date: formatDate(date),
        start_time: formatTimeReturnStr(startTime),
        end_time: addHoursAndFormatHours(startTime, noOfHour),
        no_of_hour: noOfHour,
        spot_id: spotId,
        user_id: db.doc(`${FIREBASE_COLLECTION.USERS}/${userId}`),
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const getUserBookingDetails = async ({ userId }) => {
  try {
    const results = [];
    const userRef = db.doc(`${FIREBASE_COLLECTION.USERS}/${userId}`);
    const { docs: reservedSpotsSection_1 } = await db
      .doc(`/${FIREBASE_COLLECTION.PARKING_SPOTS}/section_1/`)
      .collection(`${FIREBASE_COLLECTION.RESERVATIONS}`)
      .where('user_id', '==', userRef)
      .get();

    const { docs: reservedSpotsSection_2 } = await db
      .doc(`/${FIREBASE_COLLECTION.PARKING_SPOTS}/section_2/`)
      .collection(`${FIREBASE_COLLECTION.RESERVATIONS}`)
      .where('user_id', '==', userRef)
      .get();

    const { docs: reservedSpotsSection_3 } = await db
      .doc(`/${FIREBASE_COLLECTION.PARKING_SPOTS}/section_3/`)
      .collection(`${FIREBASE_COLLECTION.RESERVATIONS}`)
      .where('user_id', '==', userRef)
      .get();

    reservedSpotsSection_1.forEach((item, index) =>
      results.push({
        ...item.data(),
        sectionId: 1,
        key: `${index * 3}`,
      })
    );
    reservedSpotsSection_2.forEach((item, index) =>
      results.push({
        ...item.data(),
        sectionId: 2,
        key: `${index * 7}`,
      })
    );
    reservedSpotsSection_3.forEach((item, index) =>
      results.push({
        ...item.data(),
        sectionId: 3,
        key: `${index * 19}`,
      })
    );

    return { success: true, results };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

export {
  getUserDataByUid,
  searchReservedSpots,
  reserveParkingSpot,
  getUserBookingDetails,
};
