import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { reducer as exampleReducer, saga as exampleSaga } from "./example";
import { reducer as chatReducer, saga as chatSaga } from "./chat";

export const rootReducer = combineReducers({
  example: exampleReducer,
  chats: chatReducer
});

export function* rootSaga() {
  yield all([exampleSaga(), chatSaga()]);
}
