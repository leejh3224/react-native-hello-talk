import * as firebase from "firebase";
import { Chat } from "models/Chat";
import "lib/initFirebase";

const db = firebase.database();

export const createChat = (data: Chat) => {
  const newChatId = db
    .ref()
    .child("chats")
    .push().key;
  return db.ref(`/chats/${newChatId}`).set(data);
};
