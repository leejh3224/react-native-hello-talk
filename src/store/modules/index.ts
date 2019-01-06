import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { all } from "redux-saga/effects";
import { reducer as chatReducer, saga as chatSaga } from "./chat";
import { reducer as uiReducer } from "./ui";
import { reducer as authReducer, saga as authSaga } from "./auth";

// TODO: fix combineReducers type
export const rootReducer = combineReducers({
  chats: chatReducer,
  ui: uiReducer,
  auth: authReducer
});

export type AppState = StateType<typeof rootReducer>;

export function* rootSaga() {
  yield all([chatSaga(), authSaga()]);
}
