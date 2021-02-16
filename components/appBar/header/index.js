import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class Header extends Component {
  Sticky_header_View = (
    <View style={styles.header_style}>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 22,
          fontWeight: "bold",
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        NOTES MAKING APP
      </Text>
      <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
    </View>
  );
  render() {
    return Sticky_header_View;
  }
}

export default Header;
