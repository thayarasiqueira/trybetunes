import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { disabled, name, handleChange, handleLoginBtn } = this.props;
    return (
      <div className="container-login" data-testid="page-login">
        <h1>
          Trybe
          <span id="tunes">tunes 🎧</span>
        </h1>
        <form className="container-form">
          <label htmlFor="name">
            <input
              data-testid="login-name-input"
              type="text"
              id="name"
              name="name"
              minLength="3"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ handleLoginBtn }
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleLoginBtn: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Login;
