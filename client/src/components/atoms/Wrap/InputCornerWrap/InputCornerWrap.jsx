import PropTypes from "prop-types";
import clsx from "clsx";

import InputCornerTLWrap from "./InputCornerTLWrap";
import InputCornerBLWrap from "./InputCornerBLWrap";
import InputCornerTRWrap from "./InputCornerTRWrap";
import InputCornerBRWrap from "./InputCornerBRWrap";

import s from "./InputCornerWrap.module.scss"

const InputCornerWrap = ({ className, extraClass }) => {

    return (
        <>
            <InputCornerTLWrap className={clsx(className, s["cornerTL"])} />
            <InputCornerBLWrap className={clsx(className, s["cornerBL"])} />
            <InputCornerTRWrap className={clsx(className, extraClass, s["cornerTR"])} />
            <InputCornerBRWrap className={clsx(className, s["cornerBR"])}/>
        </>
    )
}

InputCornerWrap.propTypes = {
    className: PropTypes.string,
    extraClass: PropTypes.string,
};

export default InputCornerWrap;  