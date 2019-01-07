import * as firebase from "firebase";
import { Google, Constants } from "expo";

export const googleOAuth = async () => {
  /**
   * To suppress Property 'idToken'/'accessToken' does not exist on type 'LogInResult',
   * cast its type as any
   * TODO: fix any type
   */
  const { idToken, accessToken }: any = await Google.logInAsync({
    iosClientId: Constants.manifest.extra!.googleOAuth.iOSClientId,
    androidClientId: Constants.manifest.extra!.googleOAuth.androidClientId,
    scopes: ["profile", "email"],
    behavior: "web"
  });

  const credential = firebase.auth.GoogleAuthProvider.credential(
    idToken,
    accessToken
  );

  return firebase.auth().signInAndRetrieveDataWithCredential(credential);
};
