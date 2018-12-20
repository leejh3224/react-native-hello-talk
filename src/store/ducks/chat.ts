import { ActionType, createAsyncAction } from "typesafe-actions";
import * as firebase from "firebase";
import { put, takeLatest } from "redux-saga/effects";
import uuid from "uuid/v4";
import { withPrefix } from "store/utils";
import { Chat } from "store/types/Chat";

const createRoom = createAsyncAction(
  withPrefix("CREATE_ROOM_REQUEST"),
  withPrefix("CREATE_ROOM_SUCCESS"),
  withPrefix("CREATE_ROOM_FAILURE")
)<string[], void, Error>();

export const reducer = (
  state: Chat[] = [],
  { type, payload }: ActionType<typeof createRoom>
) => {
  switch (type) {
    case [createRoom.success().type]:
      return [...state, payload];
    default:
      return state;
  }
};

function* createRoomSaga(people: string[]) {
  try {
    const id = uuid();

    yield firebase
      .database()
      .ref(`chats/${id}`)
      .set({
        id,
        owner: "",
        participants: [people],
        messages: []
      });

    yield put(createRoom.success());
  } catch (error) {
    yield put(createRoom.failure(error));
  }
}

export function* saga() {
  yield takeLatest(createRoom.request([]).type as any, createRoomSaga);
}
