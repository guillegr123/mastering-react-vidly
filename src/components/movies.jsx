import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDeleteMovie = id => {
    deleteMovie(id);
    this.setState({
      movies: this.state.movies.filter(movie => movie._id !== id)
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="m-3">{this.formatMovieCount()}</div>
        {this.renderMovietable()}
      </React.Fragment>
    );
  }

  formatMovieCount() {
    const { length: count = 0 } = this.state.movies;
    return (
      (count === 0 ? "There are no movies" : `Showing ${count} movies`) +
      " in the database"
    );
  }

  renderMovietable() {
    return (
      this.state.movies.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td className="test">{movie.title}</td>
                <td className="test">{movie.genre.name}</td>
                <td className="test">{movie.numberInStock}</td>
                <td className="test">{movie.dailyRentalRate}</td>
                <td className="test">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDeleteMovie(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  }
}

export default Movies;
