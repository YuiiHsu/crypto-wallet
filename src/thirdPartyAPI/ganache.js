import axios from 'axios';

const service = axios.create({
  baseURL: 'http://127.0.0.1:7545',
	timeout: 5000
});

service.interceptors.request.use(config => {
	config.headers['Content-Type']= 'application/json'
  return config;
})

service.interceptors.response.use(
	(response) => {
		return response.data.result;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const GanacheAPI = {
  /**
  * 取得測試幣餘額
  * @param {*} address 查詢餘額地址 
  * return wei
  */
  GetTestTokenBalance: async (address) => {
    return await service({
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
  * 發送已簽名的交易
  * @param {*} toAddress 接收地址
  * @param {*} signedData 已簽名的資料
  * return wei
  */
  SendRawTransaction: async (signedData) => {
    return await service({
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
  * 發送已簽名的交易
  * @param {*} toAddress 接收地址
  * @param {*} signedData 已簽名的資料
  * return wei
  */
    SignTransaction: async (data) => {
      return await service({
        url: '',
        method: 'POST',
        data: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_signTransaction",
          params: [
            data,
          ],
          "id": 1
        }),
      }).then((res) => {
        return res})
    },
}

export default service;
