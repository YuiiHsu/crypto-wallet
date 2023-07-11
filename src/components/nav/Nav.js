import style from './style.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Nav = ({menu, setTitle}) => {
  const { t, i18n } = useTranslation();
	const [lang, setLang] = useState('tw');

	useEffect(() => {
		if(lang){
			i18n.changeLanguage(lang);
		}
	},[lang])

	/**
	 * 修改語系
	 * @param {*} e 點擊
	 */
	function changeLang (e) {
		const selectedLang = e.target.value;
		if (selectedLang === lang) {
			return;
		}

		setLang(selectedLang);
	}

  return (
    <div className={style.container}>
			<div className={style.logoArea}>
      <label>Web3 Wallet</label>
			</div>
        <ul>
          {menu.map(item => (
            <li key={item.pageId}>
              <Link 
                className={style.router} 
                to={item.router}
                onClick={() => setTitle(item.pageId)}>{t(item.pageId.toLocaleLowerCase())}</Link>
            </li>
          ))}
        </ul>
				<select value={lang} onChange={changeLang}>
					<option value="zh">繁體中文</option>
					<option value="en">English</option>
				</select>
    </div>
  );
};

export default Nav;