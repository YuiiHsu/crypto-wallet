export const actionTypes = {
    // 更新Redux資料
    UPDATE_STATE: "balance/UPDATE_STATE",
    // 重置Redux資料
    RESET: "balance/RESET",
    // 設定餘額的單位
    SET_CURRENCY : "balance/SET_CURRENCY",
    // 更新餘額
    SET_BALANCE : "balance/SET_BALANCE",
}

const initialState = {
    // 餘額的單位，ex: BTC, USDT
    currency : "", //
    // 所有的餘額資料
    balance:[],
}

export function reducer (state = initialState, action) {
    switch (action.type) {
        // 更新Redux資料
        case actionTypes.UPDATE_STATE:
            return { ...state, ...action.payload }
        // 設定餘額單位
        case actionTypes.SET_CURRENCY:
            return {...state,...action.currency}
        // 更新餘額
        case actionTypes.SET_BALANCE:
            return {...state, balance: action.balance}        
        // 重置Redux資料
        case actionTypes.RESET:
            return initialState
            
        default:
            return state
    }
}



/**
 * Action Creators
 * 供外部呼叫用的function
 * 並在這裡告訴reducer要做什麼事情
 */
export const actions = {
    updateState: (state) => ({ type: actionTypes.UPDATE_STATE, payload: state }),
    setCurrency:(currency)=>({type:actionTypes.SET_CURRENCY,currency:currency}),
    setBalance:(balance)=>({type:actionTypes.SET_BALANCE,balance:balance}),
    reset: () => ({ type: actionTypes.RESET }),
}

