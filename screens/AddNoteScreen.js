import React, { Component } from "react";
import AddNote from "../components/addNote";

export default class AddNoteScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AddNote
        title={this.props.navigation.state.params.title}
        description={this.props.navigation.state.params.description}
        id={this.props.navigation.state.params.id}
        navigation={this.props.navigation}
        screenTitle={this.props.navigation.state.params.screenTitle}
      />
    );
  }
}
