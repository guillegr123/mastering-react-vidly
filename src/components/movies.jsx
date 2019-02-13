import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchText: ""
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres
    });
  }

  handleDelete = movie => {
    deleteMovie(movie._id);
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

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1, // Reset the currentPage to 1, in order to prevent to try to show an
      // inexistent page when filering, because it may reduce the amount of movies on display
      searchText: ""
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearchChange = ({ currentTarget: input }) => {
    this.setState({ searchText: input.value, selectedGenre: null });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchText,
      movies: allMovies
    } = this.state;

    const searchTextCleaned = searchText.trim().toLowerCase();

    // 1. Filter
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : searchText
        ? allMovies.filter(m =>
            m.title.toLowerCase().includes(searchTextCleaned)
          )
        : allMovies;

    // 2. Sort
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // 3. Paginate
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchText,
      movies: allMovies
    } = this.state;
    const { length: count } = allMovies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    // ListGroup, MoviesTable and Pagination are high level components, that have similar level
    // of abstraction. It is better not to mix a lot of high level and low level components
    // (elements). This way the code intent is clear.
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <p>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Search..."
              value={searchText}
              onChange={this.handleSearchChange}
            />
          </p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
