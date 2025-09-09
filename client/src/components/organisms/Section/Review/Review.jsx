import ReviewList from "../../ReviewList/ReviewList";
import s from "./Review.module.scss";

const Review = () => {
  return (
    <div className={`${s["review"]}`}>
      <div className={`${s["review-container"]} container container__indent`}>
        <h2 className={`${s["review-title"]}`}>Reviews</h2>
        <p className={`${s["review-text"]}`}>
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
  );
};

export default Review;
