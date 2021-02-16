import React, { Component } from "react";
import styles from "./styles";
import { encrypt, decrypt } from "react-native-simple-encryption";
import { Text, SafeAreaView, View, TextInput, Button } from "react-native";
import firebase from "firebase";

class AddNoteScreen extends Component {
  user = firebase.auth().currentUser;
  constructor(props) {
    super(props);
    this.state = {
      Title: this.props.title,
      Description: this.props.description,
    };
    this.onSaveNotes = this.onSaveNotes.bind(this);
    this.refreshScreen = this.refreshScreen.bind(this);
  }

  refreshScreen() {
    this.setState({});
  }

  onSaveNotes() {
    const dbh = firebase.firestore();

    if (this.user) {
      console.log(this.user.uid);
      console.log("Encrypt:");
      console.log(encrypt(this.state.Title, "123key"));
      console.log("Decrypt:");
      console.log(decrypt("123key", this.state.Title));
      try {
        if (this.props.id == "")
          dbh
            .collection("users")
            .doc(this.user.uid)
            .collection("Notes")
            .doc()
            .set({
              Title: encrypt("123key", this.state.Title),
              Description: encrypt("123key", this.state.Description),
            })
            .then(() => {
              console.log("New Note is added");
            });
        else
          dbh
            .collection("users")
            .doc(this.user.uid)
            .collection("Notes")
            .doc(this.props.id)
            .set({
              Title: encrypt("123key", this.state.Title),
              Description: encrypt("123key", this.state.Description),
            })
            .then(() => {
              console.log("New Note is added");
            });

        this.props.navigation.navigate("DashboardScreen");
      } catch (error) {
        console.log("Someting went wrong with note saving");
        console.log(error);
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{this.props.screenTitle}</Text>
        <TextInput
          style={styles.title}
          placeholder="Type here to Title here!"
          backgroundColor="white"
          borderRadius={25}
          padding={10}
          width="100%"
          onChangeText={(value) => {
            this.setState({ Title: value });
          }}
          defaultValue={this.state.Title}
        />
        <TextInput
          style={styles.text}
          placeholder="Start writing description here!"
          multiline={true}
          borderRadius={25}
          padding={10}
          numberOfLines={4}
          height="30%"
          backgroundColor="white"
          marginBottom={20}
          width="100%"
          onChangeText={(value) => {
            this.setState({ Description: value });
          }}
          defaultValue={this.state.Description}
        />
        <View>
          <View>
            <Button title="Save" color="black" onPress={this.onSaveNotes} />
            <Text></Text>
            <Button
              title="Cancel"
              width={100}
              color="black"
              onPress={() => this.props.navigation.navigate("DashboardScreen")}
            />
            <Text></Text>
            <Button
              title="Delete"
              width={100}
              color="#E30425"
              onPress={() => {
                if (this.props.id != "") {
                  const dbh = firebase.firestore();
                  dbh
                    .collection("users")
                    .doc(this.user.uid)
                    .collection("Notes")
                    .doc(this.props.id)
                    .delete()
                    .then(() => {
                      console.log("Document successfully deleted!");
                      console.log("Note", this.props.id, "is deleted");
                    })
                    .catch((error) => {
                      console.error("Error removing document: ", error);
                    });
                }
                this.props.navigation.navigate("DashboardScreen");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AddNoteScreen;
