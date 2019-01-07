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
import { Message } from "models/Message";

interface SendMessagePayload extends Message {
  chatId: string;
}

export const sendMessage = createAsyncAction(
  withPrefix("SEND_MESSAGE_REQUEST"),
  withPrefix("SEND_MESSAGE_SUCCESS"),
  withPrefix("SEND_MESSAGE_FAILURE")
)<SendMessagePayload, SendMessagePayload, Error>();

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
      const {
        chatId,
        senderProfile,
        message,
        timestamp
      } = action.payload as SendMessagePayload;

      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: {
            ...state.chats[chatId],
            lastMessage: message,
            timestamp
          }
        },
        messages: {
          ...state.messages,
          [chatId]: {
            [uuid()]: {
              senderProfile,
              message,
              timestamp
            },
            ...state.messages[chatId]
          }
        }
      };
    }
    case getType(createChat.success): {
      const { chatId, title, members } = action.payload;

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
      return {
        ...state,
        chats: action.payload ? action.payload : {}
      };
    default:
      return state;
  }
};

export const createMessage = data => {
  const {
    chatId,
    senderProfile,
    sender,
    message,
    timestamp,
    section,
    media
  } = data;

  const chatRef = firebase.database().ref(`chats/${chatId}`);
  const messageRef = firebase.database().ref(`messages/${chatId}`);

  chatRef.update({
    lastMessage: message ? message : `${media.type}을 보냈습니다.`,
    timestamp
  });

  const newMessage = {
    senderProfile,
    sender,
    timestamp,
    section
  };

  if (message) {
    newMessage.message = message;
  }

  if (media) {
    newMessage.media = media;
  }

  messageRef.push(newMessage);

  return data;
};

export function* sendMessageSaga({ payload }: { payload: SendMessagePayload }) {
  try {
    const message = yield call(createMessage, payload);
    yield put(sendMessage.success(message));
  } catch (error) {
    console.log(error);
    yield put(sendMessage.failure(error));
  }
}

export function* createChatSaga({
  payload
}: ActionType<typeof createChat.request>) {
  try {
    const newChat = {
      chatId: payload.chatId,
      title: payload.title,
      members: payload.selected.map(user => user.id),
      image: payload.image
    };

    yield call(api.createChat, newChat);

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
  yield fork(updateChatSaga);
  yield takeEvery(getType(sendMessage.request) as any, sendMessageSaga);
}
