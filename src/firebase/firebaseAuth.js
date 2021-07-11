import { auth, db } from './firebase';

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
    await db.doc(`/users/${respAuth.user.uid}`).set(newUser);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { errorCode: error.code, errorMessage: error.message };
  }
};

export { registerUser };
