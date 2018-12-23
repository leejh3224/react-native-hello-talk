import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { reducer as chatReducer, saga as chatSaga } from "./chat";

// TODO: fix combineReducers type
export const rootReducer = combineReducers<any>({
  chats: chatReducer
});

export function* rootSaga() {
  yield all([chatSaga()]);
}
