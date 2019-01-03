import get from "lodash.get";

/**
 * Navigation keys for configure react-navigation
 * @param {string[]} path - name of react-navigation stack
 */
const getNavigationKey = (path: string[]) => {
  interface INavigationKeys {
    auth: {
      loading: string;
      login: string;
      app: string;
    };
    chat: {
      create: string;
      findFriend: string;
      home: string;
      room: string;
      selectCountry: string;
      selectLanguage: string;
      friendsList: string;
    };
    profile: {
      home: string;
      editDescription: string;
    };
    [key: string]: string | object;
  }

  const navigationKeys: INavigationKeys = {
    auth: {
      loading: "@auth/loading",
      login: "@auth/login",
      app: "@auth/app"
    },
    chat: {
      create: "@chat/create",
      findFriend: "@chat/findFriend",
      home: "@chat/home",
      room: "@chat/room",
      selectCountry: "@chat/selectCountry",
      selectLanguage: "@chat/selectLanguage",
      friendsList: "@chat/friendsList"
    },
    profile: {
      home: "@profile/home",
      editDescription: "@profile/editDescription"
    }
  };

  // TODO: use dfs to get all keys
  const availableKeys = [
    "auth",
    "loading",
    "login",
    "app",
    "chat",
    "create",
    "findFriend",
    "home",
    "room",
    "selectCountry",
    "selectLanguage",
    "friendsList",
    "profile",
    "editDescription"
  ];

  if (path.every(element => availableKeys.includes(element))) {
    return get(navigationKeys, path);
  } else {
    console.log("key not found");
    return null;
  }
};

export default getNavigationKey;
