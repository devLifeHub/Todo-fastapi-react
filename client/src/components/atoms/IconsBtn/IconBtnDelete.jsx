import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnDelete from "./ElemIconsBtn/ElemIconBtnDelete";

import s from "./IconsBtn.module.scss"

const IconBtnDelete = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnDelete className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnDelete.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnDelete;