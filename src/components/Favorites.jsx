import React, { Component } from 'react';
import Header from './Header';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    this.handleFavorite();
  }

  handleGetFavorite = async () => {
    this.setState({
      loading: true,
    });
    const saveFavorite = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: saveFavorite,

    });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading />
          : (
            favorites.map((e, index) => (
              <MusicCard
                key={ index }
                trackName={ e.trackName }
                trackId={ e.trackId }
                previewUrl={ e.previewUrl }
                checked={ favorites.some((element) => element.trackId === e.trackId) }
                music={ e }
                updateList={ this.handleGetFavorite }
              />
            ))
          )}
      </div>
    );
  }
}

export default Favorites;
