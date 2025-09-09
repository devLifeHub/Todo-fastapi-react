import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnTimer from "./ElemIconsBtn/ElemIconBtnTimer";

import s from "./IconsBtn.module.scss"

const IconBtnTimer = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnTimer className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnTimer.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnTimer;