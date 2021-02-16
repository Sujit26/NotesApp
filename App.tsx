import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import LoadingScreen from "./screens/LoadingScreen";
import AddNoteScreen from "./screens/AddNoteScreen";

import firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
class App extends React.Component {
  render() {
    return <AppNavigator style={styles.container} />;
  }
}
export default App;

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  AddNoteScreen: AddNoteScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
