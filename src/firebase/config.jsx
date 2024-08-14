import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDX15IgM9p9IwvOU987l4ly-ZYOxuoUtUo",
    authDomain: "moneymarket-cda61.firebaseapp.com",
    projectId: "moneymarket-cda61",
    storageBucket: "moneymarket-cda61.appspot.com",
    messagingSenderId: "146583444598",
    appId: "1:146583444598:web:ed88a6a372768e7e529357"
  };

  //init firebase App

    firebase.initializeApp(firebaseConfig);

  // init services
  
  const projectFirestore = firebase.firestore()

  // init firebase auth
  const projectAuth = firebase.auth()

  //export
  export { projectFirestore, projectAuth }
