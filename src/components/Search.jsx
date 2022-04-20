import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';

class Search extends Component {
  render() {
    const { disableSearch, handleSearch, handleClick,
      search, searchResults, verifySearch, lastSearch } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              id="search"
              name="search"
              data-testid="search-artist-input"
              onChange={ handleSearch }
              value={ search }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disableSearch }
              onClick={ handleClick }
            >
              Pesquisar
            </button>
          </label>
        </form>
        <section>
          { verifySearch
          && (
            <p>
              {`Resultado de álbuns de:
              ${lastSearch}`}
            </p>)}
          { searchResults.length === 0 ? 'Nenhum álbum foi encontrado'
            : searchResults.map((e) => (
              <ul key={ e.releaseDate }>
                <img src={ e.artworkUrl100 } alt="album cover" />
                <li>
                  Name:
                  { e.artistName }
                </li>
                <li>
                  Collection:
                  { e.collectionName }
                </li>
                <li>
                  Price:
                  { e.collectionPrice }
                </li>
                <li>
                  Release Date:
                  { e.releaseDate }
                </li>
                <li>
                  Track Count:
                  { e.trackCount }
                </li>
                <Link
                  to={ `/album/${e.collectionId}` }
                  data-testid={ `link-to-album-${e.collectionId}` }
                >
                  Ir para álbum
                </Link>
              </ul>
            )) }
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  disableSearch: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  searchResults: PropTypes.string.isRequired,
  verifySearch: PropTypes.bool.isRequired,
  lastSearch: PropTypes.string.isRequired,
};

export default Search;
