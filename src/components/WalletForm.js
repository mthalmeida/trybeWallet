import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { callCurrerncie, addNewExpense } from '../services/callAPI';
import './walletForm.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      description: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(callCurrerncie());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { id, description, value, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const newObjeto = {
      id,
      description,
      value,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    dispatch(addNewExpense(newObjeto));
    this.setState({
      id: id + 1,
      description: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { loading, currencies } = this.props;
    const { description, value, currency, method, tag } = this.state;
    if (loading) { return (<p>Carregando...</p>); }
    return (
      <form className="containerForm">
        <label htmlFor="value-input">
          <input
            id="value-input"
            className="inputFormWallet"
            name="value"
            type="number"
            data-testid="value-input"
            placeholder="Valor da despesa"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description-input">
          <input
            id="description-input"
            name="description"
            type="text"
            className="inputFormWallet"
            data-testid="description-input"
            placeholder="Descrição da despesa"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          <p className="titleInput">Moeda:</p>
          <select
            name="currency"
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map((currencie, name) => (
              <option
                value={ currencie.toString() }
                key={ name }
              >
                { currencie }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method-input" className="method-input">
          <div className="method-input">
            <p className="titleInput">Forma de pagamento:</p>
            <select
              name="method"
              id="method-input"
              required
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
        </label>

        <label htmlFor="tag-input">
          <p className="titleInput">Categoria:</p>
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <div className="divBtn">
          <button
            type="button"
            id="addWallet"
            className="btnAddWallet"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.wallet.loading,
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = { loading: PropTypes.bool }.isRequired;

export default connect(mapStateToProps)(WalletForm);
