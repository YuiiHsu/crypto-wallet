import { useState } from "react";
import { useSelector } from "react-redux";
import { decimalToHex, amountToWei, checkEthFormat, validateNumber } from "../../../utility";
import style from "./style.module.css";
import { InfuralApi } from "../../../thirdPartyAPI/infura";
import { MetamaskApi } from "../../../thirdPartyAPI/metaMask";

const Transaction = ({clickedCoin, fromAddress, setOpenTransDialog, getAllBalance}) => {
  const [toAddress, setToAddress] = useState('');
  const [value, setValue] = useState(0);
  const { privateKey, address} = useSelector(store => store.account);

  /**
   * 確認當前 chain id 是否符合預期，如果沒有就切換。
   * @param {*} id chain id
   */
  async function checkChainId (id) {
    if(window.ethereum.networkVersion !== id) {
      const result = await MetamaskApi.SwitchEthChain(id);
      // 需要新增這個chain資訊
      if(result === 4902){
        await MetamaskApi.AddEthChain(id, clickedCoin.chainName, clickedCoin.shortName, clickedCoin.decimal, clickedCoin.symbol, clickedCoin.url);
      }
    }
  }
  /**
   * 發送交易
   * @param {*} fromAddress 轉出地址
   * @param {*} toAddress 接收地址
   * @param {*} value 轉移的數量
   */
  async function sendTransaction (currentCoin, fromAddress, toAddress, value) {
    if(!toAddress || !fromAddress) {
      alert("Please enter the Ethereum address for transfer.");
    }

    if(!value) {
      alert("Please enter the quantity you want to transfer.",value);
    }

    const gasPrice = await InfuralApi.GetGasPrice();
    const gasLimit = await InfuralApi.GetGasLimit();
    const weiValue = amountToWei(value, 18);
    const hexValue = decimalToHex(weiValue).toString();

		const rawTx = {
      from: address,
      to: toAddress,
      value: `0x${hexValue}`, // 要用16進位的 wei 
      chainId: `0x${decimalToHex(currentCoin.networkId)}`,
    };
    await checkChainId(clickedCoin.networkId);
    const txHash = await MetamaskApi.SendTransaction(rawTx);
    if(txHash) {
      await getAllBalance([currentCoin], fromAddress, true);
      setOpenTransDialog(false);
      alert(`已送出交易，TxHash: ${txHash}`);
    }
	}

  /**
   * 處理接收地址
   * @param {*} e 
   */
  function handleToAddress (e) {
			setToAddress(e.target.value);
  }
  

  return <div className={style.container}>
    <button className={style.close}
      onClick={() => setOpenTransDialog(false)}>X
    </button>
    <h2>Transaction</h2>
    <div className={style.content}>
      <div className={style.item}>
        <label>Receiving address</label>
        <label>Value</label>
      </div>
      <div>
				<div>
					<input placeholder="Please enter the receiving address." onChange={e => {handleToAddress(e)}}/>
				<p>{!checkEthFormat(toAddress) && "Please enter a valid ETH address."}</p>
				</div>
				<div>
					<input placeholder="Please enter the amount you want to transfer." onChange={e => {setValue(e.target.value)}}/>
					<p>{!validateNumber(value,clickedCoin.decimal) && "Please enter a valid value"}</p>
				</div>
      </div>
    </div>
    <button 
      disabled={!checkEthFormat(toAddress)|| !validateNumber(value,clickedCoin.decimal)}
      onClick={() => {
        sendTransaction(clickedCoin, fromAddress, toAddress, value, clickedCoin.networkId)
        }}>Send</button>
  </div>
}

export default Transaction;