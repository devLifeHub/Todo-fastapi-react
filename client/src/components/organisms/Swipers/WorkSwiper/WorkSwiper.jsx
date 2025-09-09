import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import SwiperControler from "@/components/molecules/SwiperControler/SwiperControler";

import clsx from "clsx";
import s from "./WorkSwiper.module.scss";

import { useRef } from "react";
import WorkSlide from "@/components/molecules/SwiperSlide/WorkSlide/WorkSlide";
import workSlideOne from "@/assets/work-slide/work_slide-1.png"
import workSlideTwo from "@/assets/work-slide/work_slide-2.png"

const WorkSwiper = () => {

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const arr_work = [workSlideOne, workSlideTwo];

  return (
    <div className={clsx(s["swiper"])}>
      <SwiperControler prevRef={prevRef} nextRef={nextRef} />

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        wrapperTag="ul"
        slidesPerView={1}
        spaceBetween={20}
        className={clsx(s["swiper-wrap"])}

        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
      >
        {arr_work.map((img, index) => (
            <SwiperSlide key={index} tag="li" className={clsx(s["slide"])}>
                <WorkSlide img={img} />
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSwiper;

