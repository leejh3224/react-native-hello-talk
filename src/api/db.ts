import * as firebase from "firebase";
import { Chat } from "models/Chat";
import "lib/initFirebase";

const db = firebase.database();

/**
 * TODO: firebase doesn't allow storing `empty array` property
 * [Empty arrays are not stored to the backend](https://github.com/firebase/angularfire/issues/54)
 */
export const createChat = (data: Chat) => {
  const newChatId = db
    .ref()
    .child("chats")
    .push().key;
  return db.ref(`/chats/${newChatId}`).update({
    id: newChatId,
    ...data
  });
};

export const listenChatUpdates = (emitter: any) => {
  const chatsRef = db.ref("chats");

  chatsRef.on("value", (snapshot: any) => {
    emitter({ data: snapshot.val() });
  });

  return () => {
    chatsRef.off("value");
  };
};
