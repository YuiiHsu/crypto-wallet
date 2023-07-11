import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wallet from './wallet/Wallet';
import Market from './market/Market';
import style from "./style.module.css";
import { MetamaskApi } from '../../thirdPartyAPI/metaMask';
import * as accountDuck from "../../store/ducks/account.duck";
import { useTranslation } from 'react-i18next';

const Asset = () => {
  const { t } = useTranslation();
	const metamaskDownloadUrl = "https://metamask.io/download/";
  const dispatch = useDispatch();
  const address = useSelector(store => store.account.address);
  const coins = useSelector(store => store.setting.coins)
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  /**
   * 確認是否有 Metamask 環境
   */
  async function checkMetamask() {
    setMetamaskInstalled(typeof window.ethereum !== "undefined");
  } 

  /**
   * 連接 Metamask 帳戶
   */
  async function connectAccount () {
    if(!metamaskInstalled){
      return;
    }
    
    const address = await MetamaskApi.ConnectAccount();
    if(address){
      dispatch(accountDuck.actions.setAddress(address));
    };
  }

  useEffect(() => {
    !address && checkMetamask();
  },[])

  return (<>
    <Wallet coins={coins}/>
    <Market />
    {!address && 
    <div className={style.loginDialog}>
      <h3>{t('loginMethod')}</h3>
      <div className={style.options}>
        <div className={style.option}>
					{t('privateKey')}
        </div>
        <div className={style.option}
          onClick={() => {
          !metamaskInstalled ? 
          window.open(metamaskDownloadUrl) : connectAccount()}}>
					{t('metamask')}
        </div>
      </div>
    </div>
    }
  </ >
  );
}

export default Asset;