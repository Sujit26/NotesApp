import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";
import * as Progress from "react-native-progress";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          console.log("AUTH STATE CHANGED CALLED ");
          console.log("USER UID:", user.uid);
          this.props.navigation.navigate("DashboardScreen");
        } else {
          this.props.navigation.navigate("LoginScreen");
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
