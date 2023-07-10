import style from './style.module.css';
import { Link } from 'react-router-dom';

const Nav = ({menu, setTitle}) => {

  return (
      <div className={style.container}>
        <label>Web3 Wallet</label>
        <ul>
          {menu.map(item => (
            <li key={item.pageId}>
              <Link 
                className={style.router} 
                to={item.router}
                onClick={() => setTitle(item.pageId)}>{item.pageId}</Link>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default Nav;