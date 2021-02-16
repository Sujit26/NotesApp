import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { FlatGrid } from "react-native-super-grid";
import styles from "../components/dashboard/styles";
import { encrypt, decrypt } from "react-native-simple-encryption";

class DashboardScreen extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        notes: [],
      });
  }

  UNSAFE_componentWillMount() {
    const dbh = firebase.firestore();
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          console.log("UID:" + user.uid);
          try {
            dbh
              .collection("users")
              .doc(user.uid)
              .collection("Notes")
              .get()
              .then((querySnapshot) => {
                console.log("Total Notes: ", querySnapshot.size);

                querySnapshot.forEach((documentSnapshot) => {
                  this.setState({
                    notes: [
                      ...this.state.notes,
                      [
                        documentSnapshot.id,
                        decrypt("123key", documentSnapshot.data()["Title"]),
                        decrypt(
                          "123key",
                          documentSnapshot.data()["Description"]
                        ),
                      ],
                    ],
                  });
                });
              });
          } catch (error) {
          }
        }
      }.bind(this)
    );
  }

  addNewNote = () => {
    try {
      this.props.navigation.navigate("AddNoteScreen", {
        title: "",
        id: "",
        description: "",
        screenTitle: "ADD NOTE SCREEN",
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = (item) => {
    try {
      console.log(item);
      this.props.navigation.navigate("AddNoteScreen", {
        title: item[1],
        id: item[0],
        description: item[2],
        screenTitle: "EDIT NOTE SCREEN",
      });
    } catch (error) {
      console.log(error);
    }
  };

  Render_FlatList_Sticky_header = () => {
    var Sticky_header_View = (
      <View style={styles.header_style}>
        <Text></Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          NOTES MAKING APP
        </Text>

        <Button
          title="Sign out"
          color="#009688"
          onPress={() => {
            firebase.auth().signOut().then = () => {
              adapter.cleanup();
            };
          }}
        />
      </View>
    );

    return Sticky_header_View;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatGrid
          data={this.state.notes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log("i'm pressed");
                this.handleClick(item);
              }}
              style={[styles.card, { backgroundColor: "#009688" }]}
            >
              <Text numberOfLines={2} style={styles.title}>
                {item[1]}
              </Text>
              <Text numberOfLines={4} style={styles.note}>
                {item[2]}
              </Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={this.Render_FlatList_Sticky_header}
        />
        <AddNoteButton
          title="+ Add Notes"
          size="sm"
          backgroundColor="#0d0d0d"
          onPress={this.addNewNote}
        />
      </View>
    );
  }
}
export default DashboardScreen;

const AddNoteButton = ({ onPress, title, size, backgroundColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      size === "sm" && {
        paddingHorizontal: 8,
        paddingVertical: 6,
        elevation: 6,
        width: 100,
        borderRadius: 30,
        height: 30,
        position: "absolute",
        bottom: 40,
        right: 30,
      },
      backgroundColor && { backgroundColor },
    ]}
  >
    <Text
      style={[
        styles.appButtonText,
        size === "sm" && { fontSize: 14 },
        { color: "#ffff" },
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
