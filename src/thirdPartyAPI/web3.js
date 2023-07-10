const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`));

export const Web3Api = {
  /**
   * 用私鑰取得帳號資訊
   * @param {*} privateKey 
   * @returns 
   */
  GetAccount: (privateKey) => {
    return  web3.eth.accounts.privateKeyToAccount(privateKey);
  },

  /**
   * 連接 Metamask 帳號
   * @returns 帳號地址
   */
  ConnectAccount: async () => {
    const result = await web3.eth.requestAccounts();

    return result ? result[0] : ''
  },
}
