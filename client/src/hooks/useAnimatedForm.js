import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideForm } from "@/store/actionForm/actionFormSlice";

export const useAnimatedForm = (isVisible) => {
  const dispatch = useDispatch();
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimate(false);
      requestAnimationFrame(() => {
        setIsAnimate(true);
      });
    } else {
      setIsAnimate(false);
    }
  }, [isVisible]);

  const closeWithDelay = useCallback(() => {
    setTimeout(() => {
      dispatch(hideForm());
    }, 400);
  }, [dispatch]);

  const handleClose = useCallback(() => {
    setIsAnimate(false);
    closeWithDelay();
  }, [closeWithDelay]);

  const handleSubmitClose = useCallback(() => {
    setIsAnimate(false);
    closeWithDelay();
  }, [closeWithDelay]);

  return { isAnimate, handleClose, handleSubmitClose };
};

