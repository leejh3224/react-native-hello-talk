# Learnings

## Google Login

- [React-native-google-signin](https://github.com/react-native-community/react-native-google-signin) requires extra linking process otherwise,
  you would see error message "RN react-native-google-signin is not correctly linked".
  [Detaching expo app](https://docs.expo.io/versions/v24.0.0/expokit/detach) is not an easy task. It would require huge amount hassle to make it work.
  So instead of ejecting existing app, I chose "Expo.Google" library.
- [Expo.Google](https://docs.expo.io/versions/latest/sdk/google) provides same functionality as `React-native-google-signin`.
  It has two versions: 1) web view 2) standalone. As I'm just testing things out, I used 1) web view version.
  I'm using `iOS` simulator so I'm explaining things in iOS point of view, however, Android setup will not that different from that of iOS.
  Things you should do:

  1. Go to [Google Cloud Console](https://console.cloud.google.com).
  2. Go to your project. (If you're using firebase, then you must have at least one project created automatically.)
  3. If you click on `menu` (hamburger button right on top left corner),
     you can find `APIs` tab and go to `credentials` sub menu.
  4. You can create `OAuthClientID`, select `iOS` or `Android`. [Expo documentation](https://docs.expo.io/versions/latest/sdk/google) explains detailed steps very well.
     > **IMPORTANT**: In this step, it is really important to specify `bundle identifier` (if you're creating for Android, it would be `packageName`) as `host.exp.exponent`. (It tells Google Auth to treat this app as `expo` app)

- (Optional) If you're using firebase, you can integrate `Expo.Google` like below.

```js
// integrate with firebase
signIn = async () => {
	try {
		const { idToken, accessToken } = await Google.logInAsync({
			/* credentials */

			scopes: ['profile', 'email'],
			behavior: 'web', // have to set as web if you want to use web view
		})

		// pass credentials to GoogleAuthProvider
		const credential = firebase.auth.GoogleAuthProvider.credential(
			idToken,
			accessToken,
		)

		// this returns you with credentials and user information (ex profile)
		const currentUser = await firebase
			.auth()
			.signInAndRetrieveDataWithCredential(credential)

		console.log(currentUser)
	} catch (error) {
		console.log(error)
	}
}
```

### TROUBLE SHOOTING

- redirect_uri_mismatch error
  A: You must specify `bundle identifier` (if you're creating for Android, it would be `packageName`) as `host.exp.exponent`.
  And also open `app.json` (in your project root) and edit `iOS.bundleIdentifier` like below.

```json
{
	"ios": {
		"supportsTablet": true,
		// for android this would be `android.packageName`
		"bundleIdentifier": "host.exp.exponent"
	}
}
```

- Your app is missing support for the following URL schemes error
  A: It's because you didn't give enough credentials for configuration.
  Which means you didn't specify `clientId` for your platform.
  If you're using `iOS` simulator, then you should give `iOSclientID`.
  Check platform and provide proper credentials for the platform.
  As I mentioned above, `Expo.Google` provides us with two versions of authentication flow.
  First one is `web view` and second one is `standalone app`. You can switch from one method to another by changing `behavior` property of
  Google.logInAsync(). As I'm gonna use `web view` version, I explicitly set it as `web`.
  If you want to use it as `standalone` version, then you should add properties like `androidStandaloneAppClientId` and `iosStandaloneAppClientId`.

```js
const { idToken, accessToken }: any = await Google.logInAsync({
   /* credentials */
   scopes: ["profile", "email"]
   behavior: "web" // other option is to use `system` which means `standalone version`.
 });
```

## Testing Redux Sagas

Testing sagas is not an easy task. Basically it is a bunch of assertions for each `yield` statement.
As a result test code will be tightly coupled, less maintainable saga code.
So instead of checking all `yield` statement manually, just check the result of certain saga.
For example, if a saga looks like below,

```js
function* callApi() {
	try {
		const response = yield call(api, arg)

		if (response) {
			yield put({ type: 'call_api_success', payload: response })
		}
	} catch (error) {
		yield put({ type: 'call_api_error', payload: error })
	}
}
```

then, the result would look something like this.

actions dispatched(assume api call was successful): [{ type: 'call_api_success', payload: response }],
side-effects: call(api, arg)

So our test can be simplified as

```js
const result = await runSaga(
	{
		dispatch: action => dispatched.push(action),
	},
	callApi,
).done

assert.true(api.calledWith(arg))
assert.deepEqual(dispatched, [
	{ type: 'call_api_success', payload: response },
])
```

### reference

- [The best way to test Redux Sagas](https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib)
- [Official redux saga doc](https://redux-saga.js.org/docs/advanced/Testing.html)
