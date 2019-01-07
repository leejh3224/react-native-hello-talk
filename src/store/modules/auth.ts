import {
  createAsyncAction,
  getType,
  createStandardAction
} from "typesafe-actions";
import * as firebase from "firebase";
import { withPrefix } from "store/utils";
import { eventChannel } from "redux-saga";
import { call, take, put, fork } from "redux-saga/effects";

export const loadUsers = createAsyncAction(
  withPrefix("LOAD_USERS_REQUEST"),
  withPrefix("LOAD_USERS_SUCCESS"),
  withPrefix("LOAD_USERS_FAILURE")
)<any, any, Error>();

export const updateCurrentUser = createStandardAction(
  withPrefix("UPDATE_CURRENT_USER")
)<object>();

/**
 * state = {
 *   me // currentUser
 *   users // other users -> 50 of them will be stored
 * }
 */
export const reducer = (state = {}, action) => {
  switch (action.type) {
    case getType(updateCurrentUser): {
      return {
        ...state,
        me: action.payload
      };
    }

    default:
      return state;
  }
};

const listenUserUpdates = () => {
  return eventChannel(emitter => {
    const userRef = firebase.database().ref("users");

    userRef.limitToFirst(50).on("value", (snapshot: any) => {
      emitter({ data: snapshot.val() });
    });

    return () => {
      userRef.off("value");
    };
  });
};

export function* updateCurrentUserSaga() {
  const channel = yield call(listenUserUpdates);

  while (true) {
    const { data } = yield take(channel);
    const user = firebase.auth().currentUser;
    yield put(updateCurrentUser(data[user.uid]));
  }
}

export function* saga() {
  yield fork(updateCurrentUserSaga);
}
