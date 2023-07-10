import { combineReducers } from 'redux';
import * as balance from "./ducks/balance.duck";
import * as account from "./ducks/account.duck";
import * as setting from "./ducks/setting.duck"

export const rootReducer = combineReducers({
    balance: balance.reducer,
    account: account.reducer,
    setting: setting.reducer
});
