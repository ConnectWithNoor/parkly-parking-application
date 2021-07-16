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

const getUserBookingDetails = async ({ userId, sectionId }) => {
  try {
    const results = [];
    const userRef = db.doc(`${FIREBASE_COLLECTION.USERS}/${userId}`);
    const { docs: reservedSpots } = await db
      .doc(`/${FIREBASE_COLLECTION.PARKING_SPOTS}/section_${sectionId}/`)
      .collection(`${FIREBASE_COLLECTION.RESERVATIONS}`)
      .where('user_id', '==', userRef)
      .get();

    reservedSpots.forEach((item, index) =>
      results.push({
        ...item.data(),
        sectionId,
      })
    );

    return { success: true, results };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const cancelParkingReservationById = async (
  sectionId,
  bookingId,
  setIsDeleted,
  setLoading
) => {
  try {
    setLoading(true);
    await db
      .doc(
        `/${FIREBASE_COLLECTION.PARKING_SPOTS}/section_${sectionId}/${FIREBASE_COLLECTION.RESERVATIONS}/${bookingId}`
      )
      .delete();

    setIsDeleted(true);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  } finally {
    setLoading(false);
  }
};

const addNewFeedback = async ({ message, userId, role }) => {
  try {
    const uid = uuid();
    const data = {
      uid,
      userId,
      message,
      role,
      date: formatDate(new Date()),
      time: formatTimeReturnStr(new Date()),
    };

    await db.doc(`${FIREBASE_COLLECTION.FEEDBACK}/${uid}`).set(data);

    return { success: true, results: data };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const addNewComment = async ({ message, userId, role, uid }) => {
  try {
    const data = {
      userId,
      message,
      role,
      date: formatDate(new Date()),
      time: formatTimeReturnStr(new Date()),
    };

    await db
      .doc(`${FIREBASE_COLLECTION.FEEDBACK}/${uid}`)
      .collection(FIREBASE_COLLECTION.COMMENT)
      .add(data);

    return { success: true, results: data };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const getAllFeedbackByUserId = async (userId) => {
  try {
    const results = [];
    const { docs: allFeedbacksByUser } = await db
      .collection(`${FIREBASE_COLLECTION.FEEDBACK}`)
      .where('userId', '==', userId)
      .get();

    allFeedbacksByUser.forEach((feedback) => results.push(feedback.data()));

    return { success: true, results };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const getFeedbackAndCommentsByFeedbackId = async (feedbackId) => {
  try {
    const results = [];
    const { docs: comments } = await db
      .doc(`${FIREBASE_COLLECTION.FEEDBACK}/${feedbackId}`)
      .collection(FIREBASE_COLLECTION.COMMENT)
      .get();

    comments.forEach((comment) => results.push(comment.data()));
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
  addNewFeedback,
  addNewComment,
  getAllFeedbackByUserId,
  cancelParkingReservationById,
  getFeedbackAndCommentsByFeedbackId,
};
