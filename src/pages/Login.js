import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginSuccess } from '../redux/actions/index';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnCheck: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      () => this.validateEmail(),
    );
  };

  validateEmail = () => {
    const { email, password } = this.state;
    const six = 6;
    const regexEmail = /\S+@\S+\.\S+/;
    const validadeEmail = regexEmail.test(email);
    const validadePassword = password.length >= six;
    if (validadeEmail && validadePassword) {
      this.setState({ btnCheck: false });
    } else {
      this.setState({ btnCheck: true });
    }
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginSuccess({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, password, btnCheck } = this.state;
    return (

      <div className="container">
        <form className="box">
          <p className="text-center">Trybe Wallet</p>

          <div className="input-container">
            <label htmlFor="email">
              <input
                id="email"
                name="email"
                value={ email }
                type="text"
                placeholder="Digite qualquer e-mail válido"
                onChange={ this.handleChange }
                data-testid="email-input"
              />
              <p>E-mail</p>
            </label>
          </div>

          <div className="input-container">

            <label htmlFor="password">

              <input
                id="password"
                name="password"
                placeholder="Digite qualquer senha de 6 dígitos"
                value={ password }
                type="password"
                onChange={ this.handleChange }
                data-testid="password-input"
              />
              <p>Senha</p>
            </label>
          </div>

          <button
            type="button"
            className="btn"
            disabled={ btnCheck }
            onClick={ this.handleClick }
            tabIndex={ 0 }
          >
            Entrar
          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  loginInfo: PropTypes.func,
}.isRequired;

export default connect()(Login);
