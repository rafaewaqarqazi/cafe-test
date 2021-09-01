import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDkmHrJmwNthlOmgJ4EPiIULKli8tvUsRw",
  authDomain: "cafe-test-e0369.firebaseapp.com",
  databaseURL:
    "https://cafe-test-e0369-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cafe-test-e0369",
  storageBucket: "cafe-test-e0369.appspot.com",
  messagingSenderId: "667399882771",
  appId: "1:667399882771:web:da3839cc719435ab5297e6",
};

// Initialize Firebase
try {
  Firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log({ e });
}

const firebase = Firebase;
export default firebase;
