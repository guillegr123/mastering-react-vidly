import React, { Component } from "react";
import _ from "lodash";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  allGenresItem = { _id: "all", name: "All Genres" };

  state = {
    movies: getMovies(),
    genres: _.concat([this.allGenresItem], getGenres()),
    currentPage: 1,
    pageSize: 4,
    selectedGenreKey: this.allGenresItem._id
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    // This code is only to update the view!
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  handleSelectedGenre = genreKey => {
    this.setState({
      selectedGenreKey: genreKey
    });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenreKey
    } = this.state;

    const genreMovies =
      selectedGenreKey === this.allGenresItem._id
        ? allMovies
        : allMovies.filter(movie => movie.genre._id === selectedGenreKey);

    const { length: count } = genreMovies;

    const movies = paginate(genreMovies, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedKey={selectedGenreKey}
              itemKey="_id"
              itemValue="name"
              onSelectedItem={this.handleSelectedGenre}
            />
          </div>
          <div className="col">
            {count === 0 ? (
              <p>There are no movies in the database.</p>
            ) : (
              <React.Fragment>
                <p>Showing {count} movies in the database.</p>
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
                    {movies.map(movie => (
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
                <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
