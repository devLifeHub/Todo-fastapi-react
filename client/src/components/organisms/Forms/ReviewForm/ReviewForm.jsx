import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import reviewsThunks from "@/store/reviews/reviewsThunks";
import s from "./ReviewForm.module.scss";
import clsx from "clsx";
import BtnClose from "@/components/atoms/Icon/Common/BtnClose";
import Button from "@/components/atoms/Button/Button";
import Modal from "@/components/atoms/Modal/Modal";
import { selectIsReviewForm } from "@/store/actionForm/actionFormSelectors";
import FormTitle from "@/components/atoms/FormElems/FormTitle/FormTitle";
import FormContainer from "@/components/atoms/FormElems/FormWrap/FormContainer";
import ButtonIcon from "@/components/atoms/ButtonIcon/ButtonIcon";
import RatingSelector from "@/components/molecules/RatingSelector/RatingSelector";
import CommentField from "@/components/molecules/CommentField/CommentField";
import { useAnimated } from "@/hooks/useAnimated";
import { hideReviewForm } from "@/store/actionForm/actionFormSlice";
import { AnimatePresence } from "framer-motion";
import AnimatedBlock from "@/components/molecules/AnimatedBlock/AnimatedBlock";


const ReviewForm = () => {
  const dispatch = useDispatch();
  const { createReviewThunk } = reviewsThunks
  const isReviewForm = useSelector(selectIsReviewForm);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const { isOpen, requestClose, handleExitComplete } = useAnimated(
      isReviewForm,
      () => dispatch(hideReviewForm())
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createReviewThunk({ rating, comment }));
    requestClose();
  };

  if (!isReviewForm) return null;

  const variant = "review"

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
       {isOpen && (
        <Modal>
          <AnimatedBlock key="reviewForm" preset="slideDown">
            <FormContainer variant={variant}>
              <FormTitle variant={variant} />
              <form className={clsx(s["review__form"])} onSubmit={handleSubmit}>
                <RatingSelector
                  rating={rating}
                  hover={hover}
                  setRating={setRating}
                  setHover={setHover}
                />

                <CommentField comment={comment} setComment={setComment} />


                <Button name="Send" type="submit"></Button>
              </form>
              <ButtonIcon btnClass={clsx(s["form__btn-close"])} handle={requestClose}>
                  <BtnClose className={clsx(s["btn__icon-close"])} />
              </ButtonIcon>
            </FormContainer>
          </AnimatedBlock>
        </Modal>
       )};
    </AnimatePresence>
  );
};

export default ReviewForm;
