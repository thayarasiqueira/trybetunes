import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      artist: '',
      album: '',
      tracks: [],
      favorites: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.handleGetFavorite();
    this.handleGetMusics(id);
  }

  handleGetMusics = async (id) => {
    const resultTracks = await getMusics(id);
    const { artistName, collectionName } = resultTracks[0];
    this.setState({
      artist: artistName,
      album: collectionName,
    });
    const tracks = resultTracks.slice(1);
    this.setState({
      tracks,
    });
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
    const { artist, album, tracks, favorites, loading } = this.state;
    return (
      <section>
        <Header />
        { loading ? (<Loading />) : (
          <div data-testid="page-album">
            <p data-testid="artist-name">
              { artist }
            </p>
            <p data-testid="album-name">
              { album }
            </p>
            {tracks.map((element, index) => (
              <MusicCard
                key={ index }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                checked={ favorites.some((e) => e.trackId === element.trackId) }
                music={ element }
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
