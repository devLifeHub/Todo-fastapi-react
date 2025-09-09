import { useState } from "react";
import clsx from "clsx";
import s from "./PaymentContent.module.scss";
import ArrowSlide from "@/components/atoms/Icon/Common/ArrowSlide";
import { paymentData } from "@/storeData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import PaymentSlide from "@/components/molecules/SwiperSlide/PaymentSlide/PaymentSlide";


const PaymentContent = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const names = ["basic", "premium", "vip"];
  const nextSlide = () =>
    setActiveSlide((prev) => Math.min(prev + 1, names.length - 1));
  const prevSlide = () =>
    setActiveSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className={`${s["swiper-wrap"]}`}>
      <div className={`${s["swiper-container"]} container`}>
        <Swiper
          className={clsx(s["swiper"])}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={50}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {activeSlide === 0 && (
            <SwiperSlide>
              <PaymentSlide data={paymentData[names[0]]} name={names[0]} />
            </SwiperSlide>
          )}
          {activeSlide === 1 && (
            <SwiperSlide>
              <PaymentSlide data={paymentData[names[1]]} name={names[1]} />
            </SwiperSlide>
          )}
          {activeSlide === 2 && (
            <SwiperSlide>
              <PaymentSlide data={paymentData[names[2]]} name={names[2]} />
            </SwiperSlide>
          )}
        </Swiper>

        <div className={clsx(s["swiper-controller"])}>
          <div
            className={clsx(
              s["swiper-btn-prev"],
              s["swiper-btn"],
              "swiper-button-prev",
              { [s["disabled"]]: activeSlide === 0 }
            )}
            onClick={() => {
              if (activeSlide > 0) prevSlide();
            }}
          >
            <ArrowSlide className={clsx(s["swiper-btn-icon"], s["icon-prev"])} />
          </div>
          <div
            className={clsx(
              s["swiper-btn-next"],
              s["swiper-btn"],
              "swiper-button-next",
              { [s["disabled"]]: activeSlide === names.length - 1 }
            )}
            onClick={() => {
              if (activeSlide < names.length - 1) nextSlide();
            }}
          >
            <ArrowSlide className={clsx(s["swiper-btn-icon"], s["icon-next"])} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentContent;
