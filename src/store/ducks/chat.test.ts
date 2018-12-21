import { runSaga } from "redux-saga";
import { withPrefix } from "store/utils";
import chats from "mocks/chats.json";
import users from "mocks/users.json";
import api from "api";
import { reducer, createRoomSaga } from "./chat";

/**
 * test에 필요한 것
 * 리듀서,
 * 액션 타입, actions
 * 사가, sagas
 * 사가가 콜하는 api 함수
 */
describe("reducer", () => {
  it("should handle createRoom:success", () => {
    const sampleChat = chats[0];

    expect(
      reducer([], {
        type: withPrefix("CREATE_ROOM_SUCCESS"),
        payload: sampleChat
      })
    ).toEqual([sampleChat]);
  });
});

describe("saga", () => {
  it("should test createRoomSaga", async () => {
    const dispatched: any[] = [];

    const response = {
      owner: "",
      participants: users.map(user => user.id),
      messages: []
    };

    api.createChat = jest.fn();

    await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      createRoomSaga,
      users
    ).done;

    // expect(process.env.REACT_APP_HI).toBe(1);

    expect(dispatched).toEqual([
      {
        type: withPrefix("CREATE_ROOM_SUCCESS"),
        payload: response
      }
    ]);
    expect(api.createChat).toBeCalledWith(response);
  });
});
