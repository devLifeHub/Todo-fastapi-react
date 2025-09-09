import PropTypes from "prop-types";
import HiddenPasswordIcon from "./HiddenPasswordIcon";
import ShowPasswordIcon from "./ShowPasswordIcon";
import s from "./ActionPasswordIcon.module.scss"
import clsx from "clsx";

const ActionPasswordIcon = ({ isShow, hiddenClass, showClass }) => (
  <div className={clsx(s["password"])}>
    <HiddenPasswordIcon className={clsx(hiddenClass, s["password--hidden"], isShow && s["hidden"])}/>
    <ShowPasswordIcon className={clsx(showClass, s["password--show"])} />
  </div>
);

ActionPasswordIcon.propTypes = {

  isShow: PropTypes.object.isRequired,
  hiddenClass: PropTypes.string,
  showClass: PropTypes.string,
};

export default ActionPasswordIcon;
