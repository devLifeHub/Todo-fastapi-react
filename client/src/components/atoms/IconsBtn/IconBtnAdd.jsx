import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnAdd from "./ElemIconsBtn/ElemIconBtnAdd";

import s from "./IconsBtn.module.scss"

const IconBtnAdd = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnAdd className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnAdd.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnAdd;