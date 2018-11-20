import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD3MWs8clzLScRTtg5q0ED8lOPEKjnyGXQ",
  authDomain: "ccl-user-database.firebaseapp.com",
  databaseURL: "https://ccl-user-database.firebaseio.com",
  projectId: "ccl-user-database",
  storageBucket: "ccl-user-database.appspot.com",
  messagingSenderId: "385244829171"
};
var fire = firebase.initializeApp(config);
export default fire;
