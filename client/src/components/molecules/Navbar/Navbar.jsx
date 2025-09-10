import { HashLink } from 'react-router-hash-link';
import { navbarLinks } from '@/storeData';
import s from './Navbar.module.scss';

const Navbar = () => (
  <nav className={s.navbar}>
    <ul className={s['navbar-list']}>
      {navbarLinks.map(({ name, to }) => (
        <li key={name} className={s['navbar-list__item']}>
          <HashLink
            smooth
            data-name={name}
            className={s['navbar-list__item-link']}
            to={to}
          >
            {name}
          </HashLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
