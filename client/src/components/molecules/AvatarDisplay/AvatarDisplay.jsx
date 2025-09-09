import PropTypes from "prop-types";
import clsx from "clsx";
import s from './AvatarDisplay.module.scss';

import avatar_default from '../../../assets/avatar_default.png'
import Spinner from "@/components/atoms/Loading/Spinner/SpinCircular";


const AvatarDisplay = ({url, isLoading}) => {

  if (isLoading) return <Spinner mode={"item"} size={50} />

  return (
    url 
      ? <img className={clsx(s["avatar-menu__avatar-img"])} src={url} alt="Avatar" />
      : <img className={clsx(s["avatar-menu__avatar-img"])} src={avatar_default} alt="Avatar" />
  )
}

AvatarDisplay.propTypes = {
    url: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default AvatarDisplay;
