import { useState } from 'react';
import style from './App.module.css';
import Asset from './components/asset/Asset';
import Nav from './components/nav/Nav'
import Swap from './components/swap/Swap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const menu = [
    {
      pageId: "Wallet",
      router: "/"
    },
    {
      pageId: "Setting",
      router: "/setting"
    },
    {
      pageId: "Swap",
      router: "/swap"
    }
  ];

  const [title, setTitle] = useState(menu[0].pageId)

  return ( 
    <Router>
      <div className={style.app}>
        {/* nav */}
        <div className={style.nav}>
          <Nav menu={menu} setTitle={setTitle}/>
        </div>

        {/* content */}
        <div className={style.content}>
          <div className={style.title}>
            <h1>{t(title.toLocaleLowerCase())}</h1>
          </div>
          <Routes>
            <Route path="/" element={<Asset />} />
            <Route path="/swap" element={<Swap />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
