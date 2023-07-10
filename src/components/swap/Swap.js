import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./style.module.css";
import { InfuralApi } from "../../thirdPartyAPI/infura";
import { GanacheAPI } from "../../thirdPartyAPI/ganache";
import { weiToAmount } from "../../utility";
import { v4 as uuidv4 } from "uuid";
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk';
import { ethers } from "ethers";

const Swap =() => {
  const coins = useSelector(store => store.setting.coins);
  const address = useSelector(store => store.account.address);
  const [fromName, setFromName] = useState(coins[0].shortName);
  const [toName, setToName] = useState(coins[1].shortName);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const ytcdata = coins.find(coin => coin.shortName === 'YTC');

  async function test () {
    const chainId = ChainId.MAINNET;
    const rpcUrl = "http://127.0.0.1:7545";
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl, chainId);
    const YTC = new Token(chainId, ytcdata.contractAddress, ytcdata.decimal);
    const pair = await Fetcher.fetchPairData(YTC, WETH[chainId]);
    const route = new Route([pair], WETH[chainId]);
    console.log(route.midPrice.toSignificant(6));
    console.log(route.midPrice.invert().toSignificant(6));
  }

  /**
   * 取得單一幣種餘額
   * @param {*} singleCoin 幣種資訊
   * @param {*} address 地址
   * @param {*} updatePartialBalance 更新部分餘額，預設是全部更新
   */
  async function getBalance (coin, address) {
    if (!coin || !address){
      return alert("資訊不足");
    }

      if (coin.shortName.toLowerCase() === "eth") {
        const weiValue = await InfuralApi.GetEthBalance(address);
        return weiToAmount(weiValue, coin.decimal);
      } else {
        const weiValue = coin.isCustomCoin ? 
        // 自己發的測試幣，因為用 ganache 當測試幣的 rpc server，所以判斷如果是自己發的測試幣幣就打 ganache rpc server
        await GanacheAPI.GetTestTokenBalance(address) : await InfuralApi.GetTokenBalance(coin.contractAddress, address.substring(2));
        return weiValue ? weiToAmount(weiValue, coin.decimal) : 0;
      }
  }

  /**
   * 取得當前被選擇幣種的餘額
   */
  async function fetchBalances() {
    const fromCoin = coins.find(coin => coin.shortName === fromName);
    const fromAsset = await getBalance(fromCoin, address);
    setFromBalance(fromAsset);

    const toCoin = coins.find(coin => coin.shortName === toName);
    const toAsset = await getBalance(toCoin, address);
    setToBalance(toAsset);
  }

  useEffect(()=> {
    fetchBalances();
  },[fromName, toName])

  return <div className={style.container}>
    <div className={style.content}>
      <div className={style.block}>
        <span>From</span>
        <label>Balance: {fromBalance}</label>
        <div className={style.coin}>
          <input value={fromValue} onChange={(e) => setFromValue(e.target.value)}/>
          <select id="fromCoin" value={fromName} onChange={(e) => setFromName(e.target.value)}>
          {
            coins.map(coin => {
            return <option key={uuidv4()} value={coin.shortName}>{coin.shortName}</option> 
          })}
          </select>
        </div>
      </div>
      <button onClick={() => {test()}}>TEST</button>
      <div className={style.block}>
        <span>To</span>
        <label>Balance: {toBalance}</label>
        <div className={style.coin}>
          <input disabled value={toValue}/>
          <select id="toCoin" value={toName} onChange={(e) => setToName(e.target.value)}>
          {
            coins
              .filter(coin => coin.shortName !== fromName)
              .map(coin => {
                return <option key={uuidv4()} value={coin.shortName}>{coin.shortName}</option> 
              })
          }
          </select>
        </div>
      </div>
      <button>Swap</button>
    </div>
  </div>
}

export default Swap;