import PropTypes from "prop-types"
import clsx from "clsx"
import s from "./SwiperControler.module.scss"
import ArrowSlide from "@/components/atoms/Icon/Common/ArrowSlide"


const SwiperControler = ({ prevRef, nextRef }) => {
    return (
        <div className="slider-controler">
        <div 
        ref={prevRef}
         className={clsx(
              s["swiper-btn-prev"],
              s["swiper-btn"],
              "swiper-button-prev")}>
          <ArrowSlide className={clsx(s["swiper-btn-icon"], s["icon-prev"])} />
        </div>
        <div
        ref={nextRef}
        className={clsx(
              s["swiper-btn-next"],
              s["swiper-btn"],
              "swiper-button-next",
            )}>
          <ArrowSlide className={clsx(s["swiper-btn-icon"], s["icon-next"])} />
        </div>
      </div>

    )
}

SwiperControler.propTypes = {
  prevRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  nextRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
}

export default SwiperControler