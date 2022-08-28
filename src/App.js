import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import { createUser } from './services/userAPI';
import Loading from './components/Loading';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import './App.css';

const minInputName = 3;
const minInputSearch = 2;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
      loading: false,
      logged: false,
      disableSearch: true,
      search: '',
      searchResults: [],
      verifySearch: false,
      lastSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (value.length < minInputName) {
        this.setState({ disabled: true,
        });
      } else {
        this.setState({ disabled: false,
        });
      }
    });
  }

  handleLoginBtn() {
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({ loading: false, logged: true });
    });
  }

  handleSearch({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (value.length < minInputSearch) {
        this.setState({ disableSearch: true,
        });
      } else {
        this.setState({ disableSearch: false,
        });
      }
    });
  }

  async handleClick() {
    this.setState({ loading: true });
    const { search } = this.state;
    const resultSearch = await searchAlbumsAPI(search);
    this.setState((prev) => ({
      lastSearch: prev.search,
      searchResults: resultSearch,
      search: '',
      loading: false,
      verifySearch: true,
    }));
  }

  render() {
    const { disabled, name, loading, logged, disableSearch,
      searchResults, search, verifySearch, lastSearch } = this.state;
    return (
      <main>
        <Switch>
          { loading && <Loading /> }
          <Route
            exact
            path="/"
            render={ (props) => (logged ? (
              <Redirect to="/search" />
            ) : (<Login
              { ...props }
              disabled={ disabled }
              name={ name }
              handleChange={ this.handleChange }
              handleLoginBtn={ this.handleLoginBtn }
            />)) }
          />
          <Route
            exact
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
                disableSearch={ disableSearch }
                handleSearch={ this.handleSearch }
                handleClick={ this.handleClick }
                search={ search }
                searchResults={ searchResults }
                verifySearch={ verifySearch }
                lastSearch={ lastSearch }
              />) }
          />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
