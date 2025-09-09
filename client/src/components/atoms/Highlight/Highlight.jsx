import PropTypes from "prop-types";
import clsx from "clsx";
import s from "./Highlight.module.scss";

const Highlight = ({ children, extraClass, type }) => {
  const typeClass = type ? s[`highlight-${type}`] : null;

  return (
    <span className={clsx(s.highlight, typeClass, extraClass)}>
      {children}
    </span>
  );
};

Highlight.propTypes = {
  children: PropTypes.node.isRequired,
  extraClass: PropTypes.string,
  type: PropTypes.string,
};

export default Highlight;
