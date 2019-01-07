import * as firebase from "firebase";
import "lib/initFirebase";

const db = firebase.database();

/**
 * TODO: firebase doesn't allow storing `empty array` property
 * [Empty arrays are not stored to the backend](https://github.com/firebase/angularfire/issues/54)
 */
export const createChat = data => {
  const { chatId, title, members, image } = data;

  return Promise.all([
    db.ref(`chats/${chatId}`).update({
      title,
      image
    }),
    db.ref(`members/${chatId}`).update(
      members.reduce(
        (prev, user) => ({
          ...prev,
          [user]: true
        }),
        {}
      )
    )
  ]);
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
