import clsx from "clsx";
import GoodIcon from "@/components/atoms/Icon/Common/GoodIcon";
import s from "./RatingSelector.module.scss";
import PropTypes from "prop-types";

const RatingSelector = ({ rating, hover, setRating, setHover }) => {
  return (
    <div className={clsx(s["review__raiting"])}>
      <label className={clsx(s["review__raiting-label"])}>Rating:</label>
      <div className={clsx(s["review__raiting-content"])}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            className={clsx(s["review__raiting-content__btn"])}
            key={value}
            type="button"
            onClick={() => setRating(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
          >
            <GoodIcon
              className={clsx(
                s["review__raiting-content__btn-icon"],
                value <= (hover || rating) && s["icon--active"]
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

RatingSelector.propTypes = {
  rating: PropTypes.number.isRequired,
  hover: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  setHover: PropTypes.func.isRequired,
};

export default RatingSelector;
