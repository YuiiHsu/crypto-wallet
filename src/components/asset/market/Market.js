import { useEffect, useState } from "react";
import style from "./style.module.css";
import ethIcon from "../../../images/icons/ETH.png";
import { CryptoCompareApi } from "../../../thirdPartyAPI/cryptoCompare";
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from 'react-i18next';

const Market =() => {
  const { t } = useTranslation();
  const [coins, setCoins] = useState([
    {
      coinIcon: ethIcon,
      coinName: 'ETH',
      price: 0,
      change24hour: 0
    },
    {
      coinIcon: ethIcon,
      coinName: 'USDT',
      price: 0,
      change24hour: 0
    }]);

    /**
     * 取得所有幣種價格（USD）
     * @param {*} coinList 幣種名稱陣列
     */
    async function getAllUsdPrice(coinList) {
      const coinsPrice = await CryptoCompareApi.GetCoinsDetails(coinList);
      let updatedCoins = cloneDeep(coins);

      coinsPrice.forEach((coin) => {
        const foundCoin = updatedCoins.find((item) => item.coinName.toLowerCase() === coin.coinName.toLowerCase());

        if (foundCoin) {
          foundCoin.price = coin.coinPrice;
          foundCoin.change24hour = coin.coin24hourChange ? coin.coin24hourChange.toFixed(2) : 0 ;
        }
      });
      
      setCoins(updatedCoins)
    }

  useEffect(() => {
    const coinNames = coins.map(coin => coin.coinName);
    getAllUsdPrice(coinNames);
  },[])

  return <div className={style.container}>
    <div className={style.title}>
      <label>{t('coin')}</label>
      <label>{t('priceUsd')}</label>
      <label>{t('percentageChange')}</label>
      <label>{t('lineChart')}</label>
    </div>
    <div className={style.market}>
    {
      coins.map(coin => {
        return <div key={uuidv4()} 
        className={style.coinInfo}>
          <div className={style.coinName}>
            <img src={coin.coinIcon} alt="coin icon" />
            <label>{coin.coinName}</label>
          </div>
          <span>{coin.price}</span>
          <span>{coin.change24hour}%</span>
          <div className={style.chart}></div>
        </div>
      })
    }
    </div>
  </div>
}

export default Market;