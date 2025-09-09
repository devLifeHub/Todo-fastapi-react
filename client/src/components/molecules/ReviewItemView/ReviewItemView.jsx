import PropTypes from "prop-types"

import avatar_default from "@/assets/avatar_default.png"
import s from "./ReviewItemView.module.scss"
import clsx from "clsx"
import RatingRender from "@/components/molecules/RatingRender/RatingRender"
import Spinner from "@/components/atoms/Loading/Spinner/SpinCircular"

const ReviewItemView = ({ data, url, isLoading }) => {
  return (
    <li className={clsx(s["item"])}>
        <div className={clsx(s["item__container"])}>
            <div className={clsx(s["item__info"])}>
                <div className={clsx(s["item__info__avatar"])}>
                    
                    {url ? (<img src={url} className={clsx(s["item__avatar-img"])} alt="Avatar" />
                    ) : isLoading ? (
                    <Spinner mode={"item"} size={50} />
                    ) : (
                    <img src={avatar_default} className={clsx(s["item__avatar-img"])} alt="Avatar default"/>
                    )}
                </div>

                <div className={clsx(s["item__info__fullname"])}>
                    <p className={clsx(s["item__fullname-name"], s["info__user"])}>{data.name}</p>
                    <p className={clsx(s["item__fullname-surname"], s["info__user"])}>
                    {data.surname}
                    </p>
                </div>

            </div>

            <div className={clsx(s["item__content"])}>
                <div className={clsx(s["item__content__raiting"])}>
                    <RatingRender value={data.rating} readOnly />
                </div>

                <div className={clsx(s["item__content__comment"])}>
                    <p className={clsx(s["slide__comment-text"])}>
                        {data.comment || "No comment"}
                    </p>
                </div>
            </div>

        </div>
    </li>
  )
}

ReviewItemView.propTypes = {
  data: PropTypes.shape({
    avatar:  PropTypes.string,
    name:    PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    comment: PropTypes.string,
    rating:  PropTypes.string,
  }).isRequired,
  url: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default ReviewItemView