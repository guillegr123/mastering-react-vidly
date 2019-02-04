import React, { Component } from "react";

class MovieEdit extends Component {
  handleSaveClick = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie from {this.props.match.params.id}</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSaveClick}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieEdit;
