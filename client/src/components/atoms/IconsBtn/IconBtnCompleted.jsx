import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnСompleted from "./ElemIconsBtn/ElemIconBtnСompleted";

import s from "./IconsBtn.module.scss"

const IconBtnCompleted = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnСompleted className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnCompleted.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnCompleted;