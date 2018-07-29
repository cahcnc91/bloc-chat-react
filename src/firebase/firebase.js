
import firebase from 'firebase/app';
import 'firebase/auth';

  var config = {
    apiKey: "AIzaSyBCeCdMyGLpFwc28p1egBTID4Vg0xaTf1o",
    authDomain: "bloc-chat-react-3354c.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-3354c.firebaseio.com",
    projectId: "bloc-chat-react-3354c",
    storageBucket: "bloc-chat-react-3354c.appspot.com",
    messagingSenderId: "521781433743"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();

export {
  auth,
};