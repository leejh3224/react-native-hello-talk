import { ActionType, createAsyncAction, getType } from "typesafe-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { withPrefix } from "store/utils";
import api from "api";
import { Chat } from "models/Chat";
import { User } from "models/User";

const createRoom = createAsyncAction(
  withPrefix("CREATE_ROOM_REQUEST"),
  withPrefix("CREATE_ROOM_SUCCESS"),
  withPrefix("CREATE_ROOM_FAILURE")
)<string[], Chat, Error>();

export const reducer = (
  state: Chat[] = [],
  action: ActionType<typeof createRoom>
) => {
  switch (action.type) {
    case getType(createRoom.success):
      return [...state, action.payload];
    default:
      return state;
  }
};

export function* createRoomSaga(people: User[]) {
  try {
    const newChat = {
      owner: "",
      participants: people.map(person => person.id),
      messages: []
    };

    yield call(api.createChat, newChat);

    yield put(createRoom.success(newChat));
  } catch (error) {
    yield put(createRoom.failure(error));
  }
}

export function* saga() {
  yield takeLatest(getType(createRoom.request) as any, createRoomSaga);
}
