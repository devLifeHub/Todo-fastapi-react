import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Arrow from '@/components/atoms/Icon/Common/Arrow';
import LogoutIcon from '@/components/atoms/Icon/Common/LogoutIcon';
import SettingIcon from '@/components/atoms/Icon/Common/SettingIcon';
import ReviewIcon from '@/components/atoms/Icon/Common/ReviewIcon';
import PayIcon from '@/components/atoms/Icon/Common/PayIcon';
import AddAvatar from '@/components/atoms/Icon/Common/AddAvatar';
import HomeIcon from '@/components/atoms/Icon/Common/HomeIcon';
import AvatarDisplay from '@/components/molecules/AvatarDisplay/AvatarDisplay'

import s from './TodoAvatarMenuView.module.scss';



const TodoAvatarMenuView = ({ isLoading, url, isActive, toggleMenu, handleShowProfileForm, handleShowReviewForm, onLogout }) => {
  return (
    <div 
      className={clsx(s["avatar-menu"])} 
    >
      <div className={clsx(s["avatar-menu__avatar"])}>
        <AvatarDisplay url={url} isLoading={isLoading} />
      </div>
      <div className={clsx(s["avatar-menu__btn-wrap"])}>
        <button className={clsx(s["avatar-menu__btn"])} onClick={toggleMenu}>
          <Arrow className={clsx(s["avatar-menu__btn-icon"], isActive && s["active-arrow"])} />
        </button>
      </div>

      <div className={clsx(s["avatar-menu__option"])}>
        <ul className={clsx(s["avatar-menu__list"])}>
          <li className={clsx(s["avatar-menu__item"], s["item-1"], isActive && s["active-1"])}>
            <button className={clsx(s["avatar-menu__item-btn"])} onClick={onLogout}>
            <LogoutIcon className={clsx(s["avatar-menu__item-icon"], s["icon-logout"])} />
            </button>
            <span className={clsx(s["avatar-menu__item-text"])}>logout</span>
          </li>
          <li className={clsx(s["avatar-menu__item"], s["item-2"], isActive && s["active-2"])}>
            <button className={clsx(s["avatar-menu__item-btn"])}>
              <SettingIcon className={clsx(s["avatar-menu__item-icon"], s["icon-setting"])} />
            </button>
            <span className={clsx(s["avatar-menu__item-text"])}>setting</span>
          </li>
          <li className={clsx(s["avatar-menu__item"], s["item-3"], isActive && s["active-3"])}>
            <button className={clsx(s["avatar-menu__item-btn"])} onClick={handleShowReviewForm} >
              <ReviewIcon className={clsx(s["avatar-menu__item-icon"], s["icon-review"])} />
            </button>
            <span className={clsx(s["avatar-menu__item-text"])}>review</span>
          </li>
          <li className={clsx(s["avatar-menu__item"], s["item-4"], isActive && s["active-4"])}>
            <Link className={clsx(s["avatar-menu__item-btn"])} to="/payment">
              <PayIcon className={clsx(s["avatar-menu__item-icon"], s["icon-payment"])} />
            </Link>
            <span className={clsx(s["avatar-menu__item-text"])}>pay</span>
          </li>
          <li className={clsx(s["avatar-menu__item"], s["item-5"], isActive && s["active-5"])}>
            <button className={clsx(s["avatar-menu__item-btn"])}  onClick={handleShowProfileForm}>
              <AddAvatar className={clsx(s["avatar-menu__item-icon"], s["icon-avatar"])} />
            </button>
            <span className={clsx(s["avatar-menu__item-text"])}>profile</span>
          </li>
          <li className={clsx(s["avatar-menu__item"], s["item-6"], isActive && s["active-6"])}>
            <Link className={clsx(s["avatar-menu__item-btn"])} to="/">
              <HomeIcon className={clsx(s["avatar-menu__item-icon"], s["icon-home"])} />
            </Link>
            <span className={clsx(s["avatar-menu__item-text"])}>home</span>
          </li>
        </ul>
      </div>
    </div>
    
  );
};

TodoAvatarMenuView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired, 
  isActive: PropTypes.bool.isRequired, 
  toggleMenu: PropTypes.bool.isRequired, 
  handleShowProfileForm: PropTypes.func.isRequired,
  handleShowReviewForm: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default TodoAvatarMenuView;
