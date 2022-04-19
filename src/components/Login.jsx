import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { disabled, name, handleChange, handleLoginBtn } = this.props;
    return (
      <div data-testid="page-login">
        <form>
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
