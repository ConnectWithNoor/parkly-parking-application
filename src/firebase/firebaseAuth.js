import firebase from 'firebase';
import { auth, db } from './firebase';

import { FIREBASE_COLLECTION } from '../utils/constants';

const registerUser = async (user) => {
  const { email, password } = user;
  try {
    let newUser = {
      name: user.name,
      email: email,
      role: 'user',
      active: true,
    };
    const respAuth = await auth.createUserWithEmailAndPassword(email, password);
    // storing the user details on DB
    await db
      .doc(`/${FIREBASE_COLLECTION.USERS}/${respAuth.user.uid}`)
      .set(newUser);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

const loginUser = async (user) => {
  try {
    const { email, password } = user;

    const { docs: isUser } = await db
      .collection(`${FIREBASE_COLLECTION.USERS}`)
      .where('email', '==', email)
      .get();

    // ifno user found in db
    if (isUser.length <= 0)
      return { errorMessage: 'Invalid credentials. Please try again' };

    // extracting user details
    let userInfo = {
      ...isUser[0].data(),
      id: isUser[0].id,
    };

    // checking if user account is active
    if (!userInfo.active)
      return {
        errorMessage: 'Account disabled. Please contact administrator.',
      };

    // set firebase user session persistance
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    await auth.signInWithEmailAndPassword(email, password);

    return { success: true, userInfo };
  } catch (error) {
    console.error(error);
    return { success: false, errorMessage: error.message };
  }
};

export { registerUser, loginUser };
