const firebaseConfig = {
    apiKey: "AIzaSyCQ9ji-ImqsD976WXTWVv56QODY5Hey4w8",
    authDomain: "to-do-list-d381a.firebaseapp.com",
    projectId: "to-do-list-d381a",
    storageBucket: "to-do-list-d381a.appspot.com",
    messagingSenderId: "38753114353",
    appId: "1:38753114353:web:796880886137c646e3b150",
    measurementId: "${config.measurementId}"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();