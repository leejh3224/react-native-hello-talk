// tslint:disable
import { action, ActionType } from "typesafe-actions";
import { put, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";
import { withPrefix } from "store/utils";

const INCREMENT = withPrefix("INCREMENT");
const DECREMENT = "@rn-hello-talk/DECREMENT";
const INCREMENT_ASYNC = "@rn-hello-talk/INCREMENT_ASYNC";

const increment = (amount: number) => action(INCREMENT, amount);
const decrement = (amount: number) => action(DECREMENT, amount);

export const actions = { increment, decrement };

export const reducer = (
  state: number = 0,
  action: ActionType<typeof actions>
) => {
  switch (action.type) {
    case INCREMENT || DECREMENT:
      return state + action.payload * (action.type === INCREMENT ? 1 : -1);
    default:
      return state;
  }
};

function* incrementAsync(amount: number) {
  yield delay(100);
  yield put(increment(amount));
}

export function* saga() {
  yield takeEvery(INCREMENT_ASYNC as any, incrementAsync);
}
