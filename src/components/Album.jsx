import React, { Component } from 'react';
import propTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
    };
    this.handleGetMusics = this.handleGetMusics.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.handleGetMusics(id);
  }

  async handleGetMusics(id) {
    const idTrack = id.toString();
    const resultTracks = await getMusics(idTrack);
    const { artistName, collectionName } = resultTracks[0];
    console.log(resultTracks);
    this.setState({
      tracks: resultTracks,
      artist: artistName,
      album: collectionName,
    });
  }

  render() {
    const { tracks, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">
          { artist }
        </h2>
        <h3 data-testid="album-name">
          { album }
        </h3>
        { tracks.slice(1).map((e, index) => (
          <MusicCard
            key={ index }
            trackName={ e.trackName }
            previewUrl={ e.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }),
};

Album.defaultProps = {
  match: null,
};

export default Album;
