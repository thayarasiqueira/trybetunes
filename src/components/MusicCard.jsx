import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    const { checked, trackId } = this.props;
    this.setState({
      favorite: checked.some((e) => e.trackId === trackId),
    });
  }

  handleFavorite({ target }) {
    this.setState({
      favorite: target.checked,
    }, async () => {
      const { music } = this.props;
      const { favorite } = this.state;
      if (favorite === true) {
        this.setState({
          loading: true,
        });
        await addSong(music);
        this.setState({
          loading: false,
        });
      } else {
        this.setState({ loading: true });
        await removeSong(music);
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { loading, favorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div>
              <h3>{ trackName }</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  name="favorite"
                  type="checkbox"
                  onChange={ this.handleFavorite }
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ favorite }
                  id="favorite"
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.arrayOf(PropTypes.shape).isRequired,
  music: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default MusicCard;
