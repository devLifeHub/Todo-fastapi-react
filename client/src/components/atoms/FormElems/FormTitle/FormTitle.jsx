import PropTypes from "prop-types"
import clsx from "clsx"
import s from "./FormTitle.module.scss"

import titleLogin from "@/assets/titles/title-login.png";
import titleRegister from "@/assets/titles/title-register.png";
import titleProfile from "@/assets/titles/title-profile.png";
import titleReview from "@/assets/titles/title-review.png";
import titleBasic from "@/assets/titles/title-basic.png";
import titlePremium from "@/assets/titles/title-premium.png";
import titleVip from "@/assets/titles/title-vip.png";

const images = {
  login: titleLogin,
  register: titleRegister,
  profile: titleProfile,
  review: titleReview,
  basic: titleBasic,
  premium: titlePremium,
  vip: titleVip,
};

const FormTitle = ({ variant }) => {
  return (
    <h2 className={clsx(s["form__title"])}>
      <img className={clsx(s["form__title-img"])} src={images[variant]} alt={variant} />
    </h2>
  );
};

FormTitle.propTypes = {
  variant: PropTypes.oneOf(["login", "register", "profile", "review", "basic", "premium", "vip"]).isRequired,
};

export default FormTitle;