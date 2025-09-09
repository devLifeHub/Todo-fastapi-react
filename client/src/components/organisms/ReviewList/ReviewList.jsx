import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFetchAllReviews } from "@/store/reviews/reviewsSelectors";
import reviewsThunks from "@/store/reviews/reviewsThunks";
import ReviewItem from "@/components/containers/ReviewItem";
import s from "./ReviewList.module.scss";

const ReviewList = () => {
  const { fetchAllReviewsThunk } = reviewsThunks;
  const dispatch = useDispatch();

  const reviews = useSelector(selectFetchAllReviews) || [];


  useEffect(() => {
    dispatch(fetchAllReviewsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arr_reviews = Object.entries(reviews);

  return (
    <ul className={s["review-list"]}>
        {arr_reviews.map(([key, data]) => (
            <ReviewItem key={key} data={data} />
        ))}
    </ul>
  );
};

export default ReviewList;

