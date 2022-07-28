import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCuQavjacCp0MoFFQC6kTq7CE-I9c0Ti6c',
  authDomain: 'notes-manager-ee39c.firebaseapp.com',
  projectId: 'notes-manager-ee39c',
  storageBucket: 'notes-manager-ee39c.appspot.com',
  messagingSenderId: '1025303154663',
  appId: '1:1025303154663:web:84784aa86a5b034c723742',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

//get docs

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, 'notes'));
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

//add data

export const addNoteToCollection = async (note) => {
  const newNoteRef = doc(collection(db, 'notes'));
  try {
    await setDoc(newNoteRef, note);
  } catch (err) {
    console.log(err);
  }
};

//deleting dada

export const deleteNoteFromCollection = async (id) => {
  await deleteDoc(doc(db, 'notes', `${id}`));
};

//create user document

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
};

//log in

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//log out

export const logOutUser = async () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log('User succesfully signout');
    })
    .catch((error) => {
      console.log(error);
    });
};
