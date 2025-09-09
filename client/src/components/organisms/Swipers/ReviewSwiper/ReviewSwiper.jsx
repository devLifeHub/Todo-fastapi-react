// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// import ReviewContentSlide from "@/components/molecules/SwiperSlide/ReviewSlide/ReviewSlide";
// import SwiperControler from "@/components/molecules/SwiperControler/SwiperControler";

// import clsx from "clsx";
// import s from "./ReviewSwiper.module.scss";

// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectFetchAllReviews } from "@/store/reviews/reviewsSelectors";
// import reviewsThunks from "@/store/reviews/reviewsThunks";

// const ReviewSwiper = () => {
//   const { fetchAllReviewsThunk } = reviewsThunks;
//   const dispatch = useDispatch();

//   const reviews = useSelector(selectFetchAllReviews) || [];

//   const prevRef = useRef(null)
//   const nextRef = useRef(null)


//   useEffect(() => {
//     dispatch(fetchAllReviewsThunk());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const arr_reviews = Object.entries(reviews);

//   return (
//     <div className={clsx(s["swiper"])}>
//       <SwiperControler prevRef={prevRef} nextRef={nextRef} />

//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         wrapperTag="ul"
//         // slideTag="li" 
//         slidesPerView={3}
//         spaceBetween={20}

//         // autoHeight={true}            // вот это включает «динамическую» высоту
//         // observer={true}              // следит за изменением DOM внутри слайдов
//         // observeParents={true} 

//         onBeforeInit={(swiper) => {
//           swiper.params.navigation.prevEl = prevRef.current
//           swiper.params.navigation.nextEl = nextRef.current
//           swiper.navigation.init()
//           swiper.navigation.update()
//         }}
//       >
//         {arr_reviews.map(([key, data]) => (
//           <SwiperSlide key={key} tag="li" className={clsx(s["slide"])}>
//             <ReviewContentSlide data={data}/>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ReviewSwiper;

