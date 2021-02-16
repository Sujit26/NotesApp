import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
    };
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    const dbh = firebase.firestore();
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          const dbh = firebase.firestore();

          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user signed in :" + result.user.name);
              if (result.additionalUserInfo.isNewUser) {
                dbh.collection("users").doc(result.user.uid).set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now(),
                });

              
              } else {
                dbh.collection("users").doc(result.user.uid).update({
                  last_logged_in: Date.now(),
                });
          
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "23283599318-h7b3qfn04o37omnc4pcdrktc5fg7ap13.apps.googleusercontent.com",
        behavior: "web",
        iosClientId:
          "23283599318-eu9op4tqkk8mmnbqa0f67k9lmpm5dnvs.apps.googleusercontent.com", //enter ios client id
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
        });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 42, fontWeight: "bold", paddingHorizontal:10, alignItems:"center",bottom:100}}>
          Welcome to Notes Taking App
        </Text>
        <Button
          title="Sign In With Google"
          color="black"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#009688"
  },
});
