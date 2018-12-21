import * as firebase from "firebase";
import { Constants } from "expo";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_DATABASE_URL
} from "react-native-dotenv";

let config: any = null;

if (process.env.NODE_ENV !== "testing") {
  config = Constants.manifest.extra!.firebaseConfig;
} else {
  config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    databaseURL: FIREBASE_DATABASE_URL
  };
}

firebase.initializeApp(config);
