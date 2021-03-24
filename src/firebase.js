import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDx3wwxryHX_EyeBbgg4l0vzCYjG4VgsiU",
    authDomain: "sparta-react-chanyeop.firebaseapp.com",
    projectId: "sparta-react-chanyeop",
    storageBucket: "sparta-react-chanyeop.appspot.com",
    messagingSenderId: "459710494983",
    appId: "1:459710494983:web:0c558be6736993ed62ada2",
    measurementId: "G-WV0MFTVTK2"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };