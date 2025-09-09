import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnSend from "./ElemIconsBtn/ElemIconBtnSend";

import s from "./IconsBtn.module.scss"

const IconBtnSend = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnSend className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnSend.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnSend;