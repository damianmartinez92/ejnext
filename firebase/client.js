import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBbTrDTjmEeo3M1pv8E4uddQRvKXkgjDdU",
  authDomain: "ejnext-7b392.firebaseapp.com",
  databaseURL: "https://ejnext-7b392.firebaseio.com",
  projectId: "ejnext-7b392",
  storageBucket: "ejnext-7b392.appspot.com",
  messagingSenderId: "571723805074",
  appId: "1:571723805074:web:a3e7705954f60daf57114b",
  measurementId: "G-70G1BXNKNW",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
