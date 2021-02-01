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

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addTweet = ({ avatar, content, userId, username, img }) => {
  return db.collection("tweets").add({
    avatar,
    content,
    userId,
    username,
    img,
    createdAt: new Date(),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestTweets = () => {
  return db
    .collection("tweets")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};
