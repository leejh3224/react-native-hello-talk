import {
  ActionType,
  createAsyncAction,
  createStandardAction,
  getType
} from "typesafe-actions";
import { eventChannel } from "redux-saga";
import { fork, take, call, put, takeLatest } from "redux-saga/effects";
import { withPrefix } from "store/utils";
import api from "api";
import { Chat } from "models/Chat";
import { User } from "models/User";

export const createChat = createAsyncAction(
  withPrefix("CREATE_CHAT_REQUEST"),
  withPrefix("CREATE_CHAT_SUCCESS"),
  withPrefix("CREATE_CHAT_FAILURE")
)<User[], Chat, Error>();

export const updateChat = createStandardAction(withPrefix("UPDATE_CHAT"))<{
  [id: string]: Chat;
}>();

export type ChatActions = ActionType<typeof createChat | typeof updateChat>;

export const reducer = (state: Chat[] = [], action: ChatActions) => {
  switch (action.type) {
    case getType(createChat.success):
      return [...state, action.payload];
    case getType(updateChat):
      return Object.values(action.payload);
    default:
      return state;
  }
};

export function* createChatSaga({
  payload
}: ActionType<typeof createChat.request>) {
  try {
    // TODO: set owner as currentUser's id
    const newChat = {
      owner: "101669882281461678010",
      participants: payload.map(user => user.id),
      messages: []
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
}
