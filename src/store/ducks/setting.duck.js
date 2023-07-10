export const actionTypes = {
  // 更新Redux資料
  UPDATE_STATE: "setting/UPDATE_STATE",
  // 重置Redux資料
  RESET: "setting/RESET",
  // 設定幣種清單
  SET_COINS : "setting/SET_COINS",
}

const initialState = {
  // 所有的幣種資料
  coins:[
    {
      shortName: 'ETH',
      contractAddress:'',
      amount: 0,
      decimal: 18,
      isCustomCoin: false,
      networkId: 1
    },
    {
      shortName: 'USDT',
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      amount: 0,
      decimal: 6,
      isCustomCoin: false,
      networkId: 1
    },
    {
      shortName: "YTC",
      contractAddress: '0xc90f257f009bB44adB7E96fa3427dab7479450eF',
      amount: 0,
      decimal: 18,
      isCustomCoin: true,
      networkId: 1337,
      chainName: "Yui Test Coim", 
      symbol: "YTC", 
      url: "http://127.0.0.1:7545"
    }
  ],
}

export function reducer (state = initialState, action) {
    switch (action.type) {
        // 更新Redux資料
        case actionTypes.UPDATE_STATE:
            return { ...state, ...action.payload }
        // 更新幣種清單
        case actionTypes.SET_COINS:
            return {...state, coins: action.coins}        
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
    setCoins:(coins)=>({type:actionTypes.SET_COINS,coins:coins}),
    reset: () => ({ type: actionTypes.RESET }),
}

