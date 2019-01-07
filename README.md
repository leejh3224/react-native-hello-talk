# React Native Hello Talk

Clone App for [Hello Talk](https://www.hellotalk.com).

## Getting Started

This project is using [boilterplate](https://github.com/slorber/expo-typescript).

If you're trying to setup `expo` + `typescript` + `jest`, then you should check it out.

1. This app uses `firebase`. Check this [link](https://firebase.google.com/docs/web/setup).

2. We need `app.json`. Make `app.json` file under root directory. You can use `extra` field like below to keep `firebase secrets`.

```json
{
	"expo": {
		"name": "react-native-hello-talk",
		"description": "A very interesting project.",
		"privacy": "public",
		"sdkVersion": "31.0.0",
		"platforms": ["ios", "android"],
		"version": "1.0.0",
		"orientation": "default",
		"icon": "./assets/images/icon.png",
		"splash": {
			"image": "./assets/images/splash.png",
			"resizeMode": "contain",
			"backgroundColor": "#ffffff"
		},
		"updates": {
			"fallbackToCacheTimeout": 0
		},
		"assetBundlePatterns": ["**/*"],
		"ios": {
			"supportsTablet": true
		},
		"extra": {
			"firebaseConfig": {
				"apiKey": "apiKey",
				"authDomain": "authDomain",
				"projectId": "projectId",
				"storageBucket": "storageBucket",
				"messagingSenderId": "messagingSenderId",
				"databaseURL": "databaseURL"
			}
		}
	}
}
```

```js
// how to use Constants in js file
// reference: https://docs.expo.io/versions/latest/sdk/constants
import { Constants } from 'expo'

Constants.extra.projectId === 'rn-hello-talk' // use extra field like this!
```

## Features

- Auth

  - [x] login using googleOAuth

  - [x] additional register flow

- Chat

  - [x] create new chat

  - [x] list chats belonging to the user

  - [x] send pictures

  - [x] find people to talk to

  - [ ] add user online status

- Profile

  - [x] edit profile (description, etc)

  - [x] logout

- Etc

  - [x] splash screen

  - [ ] push notification

  - [ ] test coverage >= 60%
