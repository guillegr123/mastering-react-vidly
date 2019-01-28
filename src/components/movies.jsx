import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  pageSize = 4;

  constructor(props) {
    super(props);

    const movies = getMovies();
    const paginatedMovies =
      movies.length > this.pageSize ? movies.slice(0, this.pageSize) : movies;

    this.state = {
      movies,
      paginatedMovies
    };
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    // This code is only to update the view!
    const movies = [...this.state.movies];
    const paginatedMovies = [...this.state.paginatedMovies];

    //
    let index = movies.indexOf(movie);
    movies[index] = {
      ...movies[index],
      liked: !movies[index].liked
    };
    index = paginatedMovies.indexOf(movie);
    paginatedMovies[index] = {
      ...paginatedMovies[index],
      liked: !paginatedMovies[index].liked
    };
    this.setState({ movies, paginatedMovies });
  };

  handlePageChange = (pageNumber, startIndex, endIndex) => {
    this.setState({
      ...this.state,
      paginatedMovies: this.state.movies.slice(startIndex, endIndex + 1)
    });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {count} movies in the database.</p>
        <Pagination
          entries={this.state.movies.length}
          pageSize={this.pageSize}
          onPageChange={this.handlePageChange}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.paginatedMovies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Pagination>
      </React.Fragment>
    );
  }
}

export default Movies;
