import * as React from "react";
import { shallow } from "enzyme";
import users from "mocks/users.json";
import Create from "./create";
import { TextInput } from "react-native";

let wrapper: any = null;

beforeAll(() => {
  // mock navigation
  const navigation = {
    setParams: jest.fn()
  };

  wrapper = shallow(<Create navigation={navigation as any} />);
});

it(`
    should add new user into state:users 
    if he's not already in queue.
    Otherwise remove him from the queue`, async () => {
  const instance: any = wrapper.instance();

  // add user
  instance.handleSelectRow(users[0]);
  expect(wrapper.state("selected")).toHaveLength(1);

  // if exists, remove user
  instance.handleSelectRow(users[0]);
  expect(wrapper.state("selected")).toHaveLength(0);
});

it(`
    should show users with 'languageWantToLearn' or 'name'
    that matches state:keyword`, () => {
  const textInput = wrapper.find(TextInput);
  const instance: any = wrapper.instance();

  // filter user by name
  textInput.simulate("changeText", "John");
  let filteredUser = instance.filterByKeyword(users);
  expect(filteredUser).toHaveLength(1);
  expect(filteredUser[0].name).toBe("John");

  // filter user by languageWantToLearn
  textInput.simulate("changeText", "en");
  filteredUser = instance.filterByKeyword(users);
  expect(filteredUser).toHaveLength(1);
  expect(filteredUser[0].languageWantToLearn).toBe("en");
});
