import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './components/NotFound';
import { createUser } from './services/userAPI';
import Loading from './components/Loading';

const minInputName = 3;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
      loading: false,
      logged: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginBtn = this.handleLoginBtn.bind(this);
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

  render() {
    const { disabled, name, loading, logged } = this.state;
    return (
      <main>
        <BrowserRouter>
          { loading && <Loading /> }
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                disabled={ disabled }
                name={ name }
                handleChange={ this.handleChange }
                handleLoginBtn={ this.handleLoginBtn }
              />) }
          />
          { logged && <Redirect to="/search" /> }
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/" component={ NotFound } />
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
