import { useEffect, useState } from "react";
import Transaction from "../transaction/Transaction";
import { InfuralApi } from "../../../thirdPartyAPI/infura";
import { GanacheAPI } from "../../../thirdPartyAPI/ganache";
import { weiToAmount } from "../../../utility";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from 'react-i18next';

const Wallet = ({coins}) => {
  const [openTransDialog, setOpenTransDialog] = useState(false);
  const [coinsData, setCoinsData] = useState([...coins]);
  const [clickedCoin, setClickedCoin] = useState({});
  const address = useSelector(store => store.account.address);
  const { t } = useTranslation();

  /**
   * 取得幣種清單內該地址的所有餘額
   * @param {*} data 幣種清單資訊
   * @param {*} address 地址
   * @param {*} singleCoinName 僅要更新單一幣種餘額的幣名，如果全部更新則不需帶此參數;
   */
  async function getAllBalance (data, address, singleCoinName) {
    if (!data || !address){
      return alert(t('errorBalance'));
    }

    let coinList = data;
    const promises = coinList.map(async (coin) => {
			// eth
      if (coin.shortName.toLowerCase() === "eth") {
        const weiValue = await InfuralApi.GetEthBalance(address);
        coin.amount = weiToAmount(weiValue, coin.decimal);
      }
			// erc20 
			else {
        const weiValue = coin.isCustomCoin ? 
        // 自己發的測試幣，因為我用 ganache 當測試幣的 rpc server，所以判斷如果是自己發的測試幣幣就打 ganache rpc server
        await GanacheAPI.GetTestTokenBalance(address) : await InfuralApi.GetTokenBalance(coin.contractAddress, address.substring(2));
        const value = weiValue ? weiToAmount(weiValue, coin.decimal) : 0;
        coin.amount = value;
      }
    });
  
    await Promise.all(promises);

		//更新單一幣種餘額
    let updatedCoinInfo = [...coinsData];
    if(singleCoinName) {
      const index = updatedCoinInfo.findIndex(obj => obj.shortName === singleCoinName);
      if (index !== -1) {
        updatedCoinInfo[index] = Object.assign({}, coinList[0]);
      }
    } else {
			updatedCoinInfo = coinList;
		}
	
		setCoinsData(updatedCoinInfo);
  }

  useEffect(() => {
    address && getAllBalance(coins, address);
  },[address])

  return <div className={style.container}>
    {t('address')}:{address}
    <div className={style.coinContent}>
    {
    coinsData.map(coin => {
      return < div key={uuidv4()} className={style.coinItem} >
        <div className={style.content}>
        <label>{coin.shortName}</label>
          <div className={style.value}>
            {coin.amount ?? 0}
          </div>
        </div>
          <button 
            onClick={() => {
            setOpenTransDialog(!openTransDialog);
            setClickedCoin(coin);}}>
							{t('transfer')}
          </button>
      </div >
      })
    }
    </div>
  { 
    openTransDialog && 
    <Transaction 
      clickedCoin={clickedCoin}
      fromAddress={address} 
      setOpenTransDialog={setOpenTransDialog}
      getAllBalance={getAllBalance}/> 
  }
  </div>
}

export default Wallet;