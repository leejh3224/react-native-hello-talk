import { runSaga } from "redux-saga";
import chats from "mocks/chats.json";
import users from "mocks/users.json";
import api from "api";
import { reducer, createChat, createChatSaga, updateChat } from "./chat";
import { getType } from "typesafe-actions";

/**
 * TODO: add test for updateChatSaga
 */
describe("reducer", () => {
  it("should handle createChat:success", () => {
    const sampleChat = chats[0];

    expect(
      reducer([], {
        type: getType(createChat.success),
        payload: sampleChat
      })
    ).toEqual([sampleChat]);
  });

  it("should handle updateChat", () => {
    /**
     * firebase ref `chats` returns { id: Chat } object
     */
    const normalizedChatObject = {
      [chats[0].id]: chats[0]
    };

    // reducer converts `normalizedChatObject` into `Chat[]`
    expect(
      reducer([], {
        type: getType(updateChat),
        payload: normalizedChatObject
      })
    ).toEqual(chats);
  });
});

describe("saga", () => {
  it("should test createChatSaga", async () => {
    const dispatched: any[] = [];

    const newChat = {
      owner: "101669882281461678010",
      participants: users.map(user => user.id),
      messages: []
    };

    api.createChat = jest.fn();

    await runSaga(
      {
        dispatch: action => dispatched.push(action)
      },
      createChatSaga,
      createChat.request(users)
    ).done;

    expect(dispatched).toEqual([
      {
        type: getType(createChat.success),
        payload: newChat
      }
    ]);
    expect(api.createChat).toBeCalledWith(newChat);
  });
});
