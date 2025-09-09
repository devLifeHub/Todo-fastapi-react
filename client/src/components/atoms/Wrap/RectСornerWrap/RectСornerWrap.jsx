import PropTypes from "prop-types";
import CornerTLWrap from "./CornerTLWrap";
import CornerBLWrap from "./CornerBLWrap";
import CornerTRWrap from "./CornerTRWrap";
import CornerBRWrap from "./CornerBRWrap";

import s from "./RectСornerWrap.module.scss"
import clsx from "clsx";


const RectСornerWrap = ({ className, extraClass }) => {
    return (
        <>
            <CornerTLWrap className={clsx(className, extraClass, s["cornerTL"])} />
            <CornerBLWrap className={clsx(className, s["cornerBL"])} />
            <CornerTRWrap className={clsx(className, s["cornerTR"])} />
            <CornerBRWrap className={clsx(className, s["cornerBR"])}/>
        </>
    )
}

RectСornerWrap.propTypes = {
    className: PropTypes.string,
    extraClass: PropTypes.string,
};


export default RectСornerWrap;