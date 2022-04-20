import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      username: '',
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  async handleUser() {
    const { name } = await getUser();
    this.setState({
      username: name,
      loading: false,
    });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <div data-testid="header-component">
        { loading ? <Loading />
          : (
            <p data-testid="header-user-name">{ username }</p>
          )}
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </div>
    );
  }
}

export default Header;
