import clsx from "clsx";
import PropTypes from "prop-types";
import s from "./Modal.module.scss"

const Modal = ({ mode, children }) => {
  return (
    <div className={clsx(s["modal-wrap"])}>
      <div className={clsx(s["modal-container"], s[`modal-${mode}`])}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  mode: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal