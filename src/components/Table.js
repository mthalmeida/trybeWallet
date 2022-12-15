import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteWallet } from '../redux/actions/index';
import './table.css';

class Table extends Component {
  handleDeleteClick = (id) => {
    const { dispatch, expenses } = this.props;
    const newWallet = expenses.filter((cur) => cur.id !== id);
    console.log(id);
    dispatch(deleteWallet(newWallet));
  };

  render() {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return (
        <h2 className="textNotWallet">
          Nenhuma despesa adicionada até o momento!
        </h2>
      );
    }
    return (
      <div className="tableComplete">
        <table className="table">

          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((
              {
                id,
                description,
                value,
                currency,
                method,
                tag,
                exchangeRates,
              },
            ) => (
              <tr key={ id } className="tableWallet">
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>
                  <button
                    id="deleteBtn"
                    className="deleteBtn"
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleDeleteClick(id) }
                  >
                    <i className="gg-remove" />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
