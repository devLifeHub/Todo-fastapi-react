import { useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import s from "./RatingRender.module.scss"
import GoodIcon from "@/components/atoms/Icon/Common/GoodIcon"

const RatingRender = ({ value, onChange, readOnly = false }) => {
  const [hover, setHover] = useState(0)
  const displayValue = readOnly ? value : hover || value

  return (
    <div className={clsx(s["rating-selector"], readOnly && s["read-only"])}>
      <div className={clsx(s["rating-selector__stars"])}>
        {[1, 2, 3, 4, 5].map((v) => {
          const isActive = v <= displayValue

          return (
            <button
              key={v}
              type="button"
              className={clsx(
                s["rating-selector__btn"],
                readOnly && s["rating-selector__btn--disabled"]
              )}
              onClick={!readOnly ? () => onChange(v) : undefined}
              onMouseEnter={!readOnly ? () => setHover(v) : undefined}
              onMouseLeave={!readOnly ? () => setHover(0) : undefined}
              disabled={readOnly}
            >
              <GoodIcon
                className={clsx(
                  s["rating-selector__icon"],
                  isActive && s["icon--active"]
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

RatingRender.propTypes = {
  value:     PropTypes.number.isRequired,
  onChange:  PropTypes.func,
  readOnly:  PropTypes.bool,
}

export default RatingRender
