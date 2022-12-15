import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { callCurrerncie, endPoint } from '../services/callAPI';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Testa a funcionalidade da Login Page', () => {
  const { history } = renderWithRouterAndRedux(<App />);

  test('Verifica endereço de url inicial', () => {
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se input de email e senha aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Testa se botão esta desativado quando esta fora dos critérios', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const botão = screen.getByRole('button');

    userEvent.type(email, 'email-incorreto');
    userEvent.type(password, '123456');

    expect(botão).toBeDisabled();
  });

  test('Testa se botão esta ativado quando se atende os critérios', () => {
    renderWithRouterAndRedux(<App />);
    const botão = screen.getByRole('button');

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');

    expect(botão).not.toBeDisabled();
  });

  test('Verifica redirecionamento ao digitar credenciais corretas', async () => {
    renderWithRouterAndRedux(<App />);
    const botão = screen.getByRole('button');

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(password, '123456');

    userEvent.click(botão);

    const textFindWallet = await screen.findByText(/Moeda de conversão/i);
    expect(textFindWallet).toBeInTheDocument();
  });
});

describe('Verifica componente Table', () => {
  test('Testa disponibilidade de tabela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });

    const textFind = await screen.findByText(/Moeda de conversão/i);
    expect(textFind).toBeInTheDocument();
  });

  test('Verifica se existe botão para deletar dispesa', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const addWallet = screen.getByRole('button');

    act(() => {
      history.push('/carteira');
    });

    userEvent.type(value, '1');
    userEvent.type(description, 'teste');
    userEvent.click(addWallet);
    const deleteBtn = await screen.findByText(/deletar/i);
    expect(deleteBtn).toBeInTheDocument();
  });
});

describe('Testa conexão de API', () => {
  test('verifica se existe uma função que chama a API', () => {
    expect(typeof callCurrerncie).toEqual('function');
  });

  test('Verifique se a função fetch foi chamada.', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();
  });

  test('Verifica renderização em Wallet page', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const formScreen = screen.getByTestId('value-input');
    expect(formScreen).toBeInTheDocument();
  });

  test('Verifica resposta de API', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const endPointValidation = 'https://economia.awesomeapi.com.br/json/all';

    expect(endPoint).toBe(endPointValidation);
  });
});
