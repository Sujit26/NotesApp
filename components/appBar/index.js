import React from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
export default function AppBar(props) {
    const _goBack = () => console.log('Went back');

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title={props.title} subtitle="Subtitle" />
    </Appbar.Header>
  );
}
