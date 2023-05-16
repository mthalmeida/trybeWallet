import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sumValue = expenses.reduce((acc, cur) => {
      acc += cur.value * cur.exchangeRates[cur.currency].ask;
      return acc;
    }, 0);
    return (
      <header className="containerHeader">
        <p className="titleHeader">Wallet Manager</p>

        <p data-testid="header-currency-field" className="currency">
          TOTAL: R$
        </p>

        <p data-testid="total-field" className="value">{sumValue.toFixed(2)}</p>

        <p data-testid="email-field" className="email">
          {email}
        </p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
