import MetaMaskSDK from '@metamask/sdk';
import {decimalToHex} from '../utility';

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider();



export const MetamaskApi = {
  /**
   * 連接 Metamask 帳號
   * @returns 帳號地址
   */
  ConnectAccount: async () => {
    const result = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    return result && result[0];
  },


  /**
   * 送出交易
   * @param {*} txData 交易資訊
   * @returns txhash
   */
  SendTransaction: async (txData) => {
    try{
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [txData]
      });

      return txHash && txHash[0];
    }
    catch (error) {
      alert(error.message);
    }
  },

  /**
   * 切換 chain id
   * @param {*} chainId 10 進位的 chain id
   */
  SwitchEthChain: async (chainId) => {
    const chainIdHex = decimalToHex(chainId);
    try{
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params:[{ chainId : `0x${chainIdHex}`}]
      });
    }
    catch(error){
      console.log(error);
      return error.code;
    }
  },

  /**
   * 新增 erc20 資訊 
   * @param {*} chainId chain id
   * @param {*} chainName 幣名
   * @param {*} shortName 幣名縮寫
   * @param {*} decimals 幣位數
   * @param {*} symbol 幣代號
   * @param {*} url rpc url
   */
  AddEthChain: async (chainId, chainName, shortName, decimals, symbol, url) => {
    const chainIdHex = decimalToHex(chainId);
    try{
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params:[
          { 
            chainName: chainName,
            chainId: `0x${chainIdHex}`,
            nativeCurrency: { name: shortName, decimals: decimals, symbol: symbol},
            rpcUrls: [url]
          }
        ]
      });
    }
    catch(error){
      console.log(error);
    }
  }
}