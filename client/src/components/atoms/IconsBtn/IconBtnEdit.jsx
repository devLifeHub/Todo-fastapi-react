import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnEdit from "./ElemIconsBtn/ElemIconBtnEdit";

import s from "./IconsBtn.module.scss"

const IconBtnEdit = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnEdit className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnEdit.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnEdit;