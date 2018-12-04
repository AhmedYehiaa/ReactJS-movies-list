import React, { Component } from 'react';
import { Link } from "react-router-dom";

import ListGroup from './common/listGroup';

import { paginate } from "../utils/paginate";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';

import MoviesTable from './moviesTable';
import SearchBox from './searchBox';

import Pagination from './common/pagination';

import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = currentPage => {
    this.setState({ currentPage });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    console.log(query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1});
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m => {
        return m.title.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
    } 
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      genres,
      searchQuery
    } = this.state;

    const { length: count } = this.state.movies;

    if (count === 0)
      return <p>There are no movies in the database.</p>

    const { totalCount, movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <Link
            to="movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <SearchBox 
            value={searchQuery}
            onChange={this.handleSearch}
          />
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

export default Movies;