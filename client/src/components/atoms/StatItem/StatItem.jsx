import PropTypes from "prop-types";
import clsx from "clsx";
import s from "./StatItem.module.scss";

const StatItem = ({ label, value, prefix }) => (
  <div className={clsx(s["stat"], s[`${prefix}`])}>
    <p className={clsx(s["stat-text"], s[`${prefix}-text`])}>{label}</p>
    <span className={clsx(s["stat-count"], s[`${prefix}-count`])}>+ {value}</span>
    <div className={clsx(s["stat-decor"], s[`${prefix}-decor`])} />
  </div>
);

StatItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default StatItem