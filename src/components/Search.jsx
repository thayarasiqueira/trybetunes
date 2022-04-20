import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Search extends Component {
  render() {
    const { disableSearch, handleSearch } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="input-search">
            <input
              id="input-search"
              name="input-search"
              data-testid="search-artist-input"
              onChange={ handleSearch }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disableSearch }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  disableSearch: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
