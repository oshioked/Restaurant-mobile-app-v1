import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCkSnp_djsV1iTN-bin9V2m6vfqMrRsprE",
    authDomain: "food-delivery-mobile-app.firebaseapp.com",
    databaseURL: "https://food-delivery-mobile-app.firebaseio.com",
    projectId: "food-delivery-mobile-app",
    storageBucket: "food-delivery-mobile-app.appspot.com",
    messagingSenderId: "942500859417",
    appId: "1:942500859417:web:88ceaced3015ddb1a66488"
  };

  export const onImageUploadHandler = async (imageUri, userId) =>{

    // create blob with the imageuri
    const blob = await new Promise ((resolve, reject)=>{
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    })    

    // CREATE A STORAGE REF
    const storageRef = firebase.storage().ref(`users_image/${userId}`);

    // UPLOAD FILE
    const snapshot = await storageRef.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  } 
  

  firebase.initializeApp(firebaseConfig);