export const actionTypes = {
    // 更新Redux資料
    UPDATE_STATE: "account/UPDATE_STATE",
    // 重置Redux資料
    RESET: "account/RESET",
    // 設定私鑰
    SET_PRIVATE_KEY: "account/SET_PRIVATE_KEY",
    // 設定帳戶
    SET_ACCOUNT : "account/SET_ACCOUNT",
    // 設定帳戶ID
    SET_ADDRESS : "account/SET_ADDRESS",
}

const initialState = {
    // 私鑰
    privateKey: "",
    // 帳戶
    account:{},    
    // 地址
    address : null,
}

export function reducer (state = initialState, action) {
    switch (action.type) {
        // 更新Redux資料
        case actionTypes.UPDATE_STATE:
            return { ...state, ...action.payload }
        // 設定私鑰
        case actionTypes.SET_PRIVATE_KEY:
            return {...state,privateKey: action.payload }
        // 設定帳戶
        case actionTypes.SET_ACCOUNT:
            return {...state,account: action.payload }
        // 設定地址
        case actionTypes.SET_ADDRESS:
            return {...state,address:action.address }
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
    setPrivateKey:(privateKey)=>({type:actionTypes.SET_PRIVATE_KEY,privateKey:privateKey}),
    setAccount:(account)=>({type:actionTypes.SET_ACCOUNT,account:account}),
    setAddress:(address)=>({type:actionTypes.SET_ADDRESS,address:address}),
    reset: () => ({ type: actionTypes.RESET }),
}

