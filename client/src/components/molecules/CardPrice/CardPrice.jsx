import s from './CardPrice.module.scss'
import PropTypes from 'prop-types';

const CardPrice = ({card, title, descr, isLoading }) => {
    return (
        <li className={s["price-item"]}>
            <div className={s["price-item__descr"]}>
            <h3 className={s["price-item__descr-title"]}>
                {title}
            </h3>
            <p className={s["price-item__descr-text"]}>
                {descr}
            </p>
            </div>
            <div className={s["price-item__price"]}>
            <p className={s["price-item__price-text"]}>Price</p>
            <p className={s["price-item__price-num"]}>
                {isLoading ? "Loading..." : `$${card.amount}`}
            </p>
            </div>
        </li>

    )
}

CardPrice.propTypes = {
  card:      PropTypes.shape({
    type:    PropTypes.string.isRequired,
    amount:  PropTypes.number.isRequired,
    descr:   PropTypes.string,
  }).isRequired,
  title:     PropTypes.string.isRequired,
  descr:     PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isError:   PropTypes.bool,
};

CardPrice.defaultProps = {
  isLoading: false,
  isError:   false,
};

export default CardPrice;

