import {
  callRequest,
  callError,
  callSucess,
  requestNewWallet,
  addNewWallet,
  errorNewWallet,
} from '../redux/actions/index';

export const endPoint = 'https://economia.awesomeapi.com.br/json/all';

export function callCurrerncie() {
  return async (dispatch) => {
    dispatch(callRequest);
    try {
      const call = await fetch(endPoint);
      const dataInfo = await call.json();
      const currencies = Object.keys(dataInfo).filter((cur) => cur !== 'USDT');
      dispatch(callSucess(currencies));
    } catch (error) {
      dispatch(callError(error));
    }
  };
}

export function addNewExpense(newObjeto) {
  return async (dispatch) => {
    dispatch(requestNewWallet);
    try {
      const call = await fetch(endPoint);
      const dataInfo = await call.json();
      delete dataInfo.USDT;
      newObjeto.exchangeRates = dataInfo;

      dispatch(addNewWallet(newObjeto));
    } catch (error) {
      dispatch(errorNewWallet(error));
    }
  };
}

export default callRequest;
