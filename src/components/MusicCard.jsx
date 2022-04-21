import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async handleFavorite() {
    this.setState({
      loading: true,
    }, async () => {
      const { id } = this.props;
      const favoriteSong = await addSong(getMusics(id));
      this.setState((prevState) => ({
        loading: false,
        favoriteSongs: [prevState.favoriteSongs, favoriteSong],
      }));
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <section>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="favorita">
            Favorita
            <input
              id="favorita"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              defaultChecked={ this.handleFavorite }
              onChange={ this.handleFavorite }
            />
            { loading && (
              <Loading />
            )}
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default MusicCard;
