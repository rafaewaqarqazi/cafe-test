import firebase from "../firebaseConfig";

export const createCafe = (data) => firebase.database().ref("cafes").push(data);
