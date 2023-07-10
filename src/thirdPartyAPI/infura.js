import request from "./infuraRequest";

// const url = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
// const Web3 = require('web3');
// let web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`));

export const InfuralApi = {
  /**
  * 取得 ETH 餘額
  * @param {*} address 查詢餘額地址 
  * return wei
  */
  GetEthBalance: async (address) => {
    return await request({
      url: '',
      method: 'POST',
      data: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [
          address,
          "latest"
        ],
        "id": 1
      }),
    }).then((res) => res)
  },

  /**
  * 取得 ERC20 餘額
  * @param {*} tokenContract ERC20 合約地址
  * @param {*} address 查詢餘額地址 
  * return wei
  */
  GetTokenBalance: async (tokenContract, address) => {
    // const newAddress = address.subSting(2);
    return await request({
      url: '',
      method: 'POST',
      data: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          {
            to: tokenContract,
            data:`0x70a08231000000000000000000000000${address}`
          },
          "latest"
        ],
        "id": 1
      }),
    }).then((res) => res)
  },

  /**
  * 發送已簽名的交易
  * @param {*} toAddress 接收地址
  * @param {*} signedData 已簽名的資料
  * return wei
  */
  SendRawTransaction: async (signedData) => {
    return await request({
      url: '',
      method: 'POST',
      data: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_sendRawTransaction",
        params: [
          signedData,
        ],
        "id": 1
      }),
    }).then((res) => {
      return res})
  },
  
  /**
  * 取得 Nonce
  * @param {*} address 查詢 Nonce 的地址 
  * return Nonce
  */
  GetNonce: async (address) => {
    return await request({
      url: '',
      method: 'POST',
      data: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getTransactionCount",
        params: [
          address,
          "latest"
        ],
        "id": 1
      }),
    }).then((res) => res)
  },

  /**
  * 取得 Gas Price
  * return Gas Price
  */
  GetGasPrice: async () => {
    return await request({
      url: '',
      method: 'POST',
      data: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_gasPrice",
        params: [],
        "id": 1
      }),
    }).then((res) => res)
  },

  /**
  * 取得最新的區塊數
  * return 新的區塊數
  */
    GetBlockNumber: async () => {
      return await request({
        url: '',
        method: 'POST',
        data: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          "id": 1
        }),
      }).then((res) => res)
    },

  /**
  * 取得 Gas Limit
  * @param {*} address 查詢 Nonce 的地址 
  * return Gas Limit
  */
    GetGasLimit: async () => {
      const blockNumber = await InfuralApi.GetBlockNumber();
      return await request({
        url: '',
        method: 'POST',
        data: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBlockByNumber",
          params: [blockNumber,false],
          "id": 1
        }),
      }).then((res) => res.gasLimit)
    }
}