import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "@/store/alert/alertSlice";
import { AnimatePresence } from "framer-motion";
import { useAnimated } from "@/hooks/useAnimated";
import BtnClose from "../Icon/Common/BtnClose";
import AnimatedBlock from "@/components/molecules/AnimatedBlock/AnimatedBlock";
import { useEffect } from "react";
import clsx from "clsx";
import s from "./Alert.module.scss";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.alert);

  const { isOpen, requestClose, handleExitComplete } = useAnimated(
        isVisible,
        () => dispatch(hideAlert())
      );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        requestClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, requestClose]);




  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isOpen && (
        <div className={s["alert"]}>
          <AnimatedBlock key={`${type}-${message}`} preset="alertDown">
            <div className={clsx(s["alert__content"], s[`alert--${type}`])}>
              <div className={s["alert__message"]}>
                <p className={clsx(s["alert__message-text"], s[`alert__message--${type}`])}>
                  {message}
                </p>
              </div>
              <button onClick={requestClose} className={s["alert__btn-close"]}>
                <BtnClose className={s["alert__icon-close"]} />
              </button>
            </div>
          </AnimatedBlock>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Alert;