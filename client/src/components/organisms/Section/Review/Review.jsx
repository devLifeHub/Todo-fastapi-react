import ReviewList from "../../ReviewList/ReviewList";
import clsx from "clsx";
import s from "./Review.module.scss";

const Review = () => {
  return (
    <div id="reviews" className={`${s["review"]}`}>
      <div className={clsx(s["review-container"], "container", "container__indent")}>
        <h2 className={clsx(s["review-title"])}>Reviews</h2>
        <div className={clsx(s["review__content"])}>
          <p className={clsx(s["review__content-text"])}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, vitae
            magnam quisquam, ipsum nesciunt ut quia iste autem esse vero impedit
            aspernatur itaque placeat voluptatem dolorem sunt obcaecati sapiente
            facilis! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Asperiores dignissimos consequatur impedit perspiciatis culpa magnam
            totam nemo nulla accusantium, tempora, porro illum veniam natus iure
            modi commodi iusto laboriosam sint!
          </p>
          <ReviewList />
        </div>
      </div>
    </div>
  );
};

export default Review;
