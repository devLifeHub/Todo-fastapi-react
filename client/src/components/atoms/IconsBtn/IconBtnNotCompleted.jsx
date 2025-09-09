import PropTypes from "prop-types";
import clsx from "clsx";

import ElemIconBtnWrap from "./ElemIconsBtn/ElemIconBtnWrap";
import ElemIconBtnNotСompleted from "./ElemIconsBtn/ElemIconBtnNotСompleted"

import s from "./IconsBtn.module.scss"

const IconBtnNotCompleted = ({ wrapClass, iconClass }) => {
    return (
        <div className={clsx(s["icon"])}>
            <ElemIconBtnWrap className={clsx(wrapClass, s["icon-wrap"])} />
            <ElemIconBtnNotСompleted className={clsx(iconClass, s["icon-elem"])} />
        </div>
    )
}

IconBtnNotCompleted.propTypes = {
    wrapClass: PropTypes.string,
    iconClass: PropTypes.string,
};

export default IconBtnNotCompleted;