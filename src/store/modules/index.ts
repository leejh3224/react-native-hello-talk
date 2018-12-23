import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { all } from "redux-saga/effects";
import { reducer as chatReducer, saga as chatSaga } from "./chat";
import { reducer as uiReducer } from "./ui";

// TODO: fix combineReducers type
export const rootReducer = combineReducers({
  chats: chatReducer,
  ui: uiReducer
});

export type AppState = StateType<typeof rootReducer>;

export function* rootSaga() {
  yield all([chatSaga()]);
}
