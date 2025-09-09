import PropTypes from "prop-types";
import clsx from "clsx";
import s from "./TextareaWrap.module.scss"
import TextareaSvgWrap from "./TextareaSvgWrap";


const TextareaWrap = ({className }) => {
    return (
        <div className={clsx(s["textarea-bg"])}>
            <TextareaSvgWrap className={clsx(className, s["textarea-bg-wrap"])} />
            <div className={clsx(s["textarea-bg-elem"])}></div>
        </div>
    )
}

TextareaWrap.propTypes = {
    className: PropTypes.string,
};

export default TextareaWrap;