import {
  ActionType,
  createAsyncAction,
  createStandardAction,
  getType
} from "typesafe-actions";
import { eventChannel } from "redux-saga";
import {
  fork,
  take,
  call,
  put,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import * as firebase from "firebase";
import uuid from "uuid/v4";
import { withPrefix } from "store/utils";
import api from "api";
import { Chat } from "models/Chat";
import { User } from "models/User";

export const sendMessage = createAsyncAction(
  withPrefix("SEND_MESSAGE_REQUEST"),
  withPrefix("SEND_MESSAGE_SUCCESS"),
  withPrefix("SEND_MESSAGE_FAILURE")
)<object, object, Error>();

export const createChat = createAsyncAction(
  withPrefix("CREATE_CHAT_REQUEST"),
  withPrefix("CREATE_CHAT_SUCCESS"),
  withPrefix("CREATE_CHAT_FAILURE")
)<User[], Chat, Error>();

export const updateChat = createStandardAction(withPrefix("UPDATE_CHAT"))<{
  [id: string]: Chat;
}>();

export type ChatActions = ActionType<
  typeof createChat | typeof updateChat | typeof sendMessage
>;

const initialState = {
  chats: {},
  members: {},
  messages: {}
};

export const reducer = (state: any = initialState, action: ChatActions) => {
  switch (action.type) {
    case getType(sendMessage.success): {
      const { chatId, sender, message, timestamp } = action.payload;

      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: {
            lastMessage: message,
            timestamp
          }
        },
        messages: {
          ...state.messages,
          [chatId]: {
            ...state.messages[chatId],
            [uuid()]: {
              sender,
              message,
              timestamp
            }
          }
        }
      };
    }
    case getType(createChat.success): {
      const { chatId, title, members } = action.payload;
      console.log(chatId, action.payload);

      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: {
            title
          }
        },
        members: {
          ...state.members,
          [chatId]: members.reduce(
            (prev, user) => ({
              ...prev,
              [user]: true
            }),
            {}
          )
        },
        messages: {
          ...state.messages,
          [chatId]: {}
        }
      };
    }
    case getType(updateChat):
      return Object.values(action.payload);
    default:
      return state;
  }
};

export const createMessage = data => {
  //   const { chatId, sender, message, timestamp } = data;

  //   const chatRef = firebase.database().ref(`/chats/${chatId}`);
  //   const messageRef = firebase.database().ref("/messages");

  //   chatRef.update({
  //     lastMessage: message,
  //     timestamp
  //   });
  //   messageRef.push({
  //     sender,
  //     message,
  //     timestamp
  //   });

  return data;
};

export function* sendMessageSaga({ payload }: any) {
  try {
    const message = yield call(createMessage, payload);
    yield put(sendMessage.success(message));
  } catch (error) {
    yield put(sendMessage.failure(error));
  }
}

export function* createChatSaga({
  payload
}: ActionType<typeof createChat.request>) {
  try {
    // TODO: set owner as currentUser's id
    const newChat = {
      chatId: payload.chatId,
      title: payload.title,
      members: payload.selected.map(user => user.id)
    };

    // yield call(api.createChat, newChat);

    yield put(createChat.success(newChat));
  } catch (error) {
    console.log(error);
    yield put(createChat.failure(error));
  }
}

export function* updateChatSaga() {
  const channel = eventChannel(api.listenChatUpdates);

  while (true) {
    const { data } = yield take(channel);

    yield put(updateChat(data));
  }
}

export function* saga() {
  yield takeLatest(getType(createChat.request) as any, createChatSaga);
  // yield fork(updateChatSaga);
  yield takeEvery(getType(sendMessage.request) as any, sendMessageSaga);
}
