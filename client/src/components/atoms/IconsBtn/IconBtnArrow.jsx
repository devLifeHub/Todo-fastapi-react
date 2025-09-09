import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnArrow from "./ElemIconsBtn/ElemIconBtnArrow";

import s from "./IconsBtn.module.scss"


const IconBtnArrow = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnArrow className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnArrow.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnArrow;