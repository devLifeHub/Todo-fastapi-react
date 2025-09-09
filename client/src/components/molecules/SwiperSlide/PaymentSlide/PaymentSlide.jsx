import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import paymentThunks from "@/store/payment/paymentThunks";
import { showAlert } from "@/store/alert/alertSlice";
import clsx from "clsx";
import s from "./PaymentSlide.module.scss";
import PropTypes from "prop-types";
import Button from "@/components/atoms/Button/Button";
import "swiper/css";
import useSubscriptionPrices from "@/hooks/useSubscriptionPrices";
import PaymentForm from "@/components/organisms/Forms/PaymentForm/PaymentForm";
import { selectPaymentError, selectPaymentLoading, selectPaymentSuccess } from "@/store/payment/paymentSelectors";
import FormTitle from "@/components/atoms/FormElems/FormTitle/FormTitle";


const PaymentSlide = ({ data, name }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createPaymentThunk } = paymentThunks

  const isSuccess = useSelector(selectPaymentSuccess);
  const paymentLoading = useSelector(selectPaymentLoading);
  const paymentError = useSelector(selectPaymentError);
  const { prices, isLoading, isError, } = useSubscriptionPrices();

  useEffect(() => {
    if (isSuccess) {
      dispatch(showAlert({ message: "Data updated!", type: "success" }));
      navigate("/todo");
    }
  }, [isSuccess, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    
    if (!cardElement) {
      return;
    }

    const { paymentMethod, error: stripeError } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError) {
      return;
    }

    const paymentPayload = {
      subscription_type: name.toUpperCase(),
      payment_method_id: paymentMethod.id,
    };

    dispatch(createPaymentThunk(paymentPayload));
  };

  if (!data || !data.descr) {
    return
  }

  const arr_data_descr = Object.values(data.descr)

  return (
    <div className={clsx(s["slide"])}>
      <div className={clsx(s["slide__descr"])}>
        <h2 className={clsx(s["slide-title"])}>
          {name.toUpperCase()} Subscription
        </h2>
        <ul className={s["slide__descr__list"]}>
          {arr_data_descr.map((item, index) => (
            <li key={index} className={s["slide__descr__item"]}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={clsx(s["slide__content"], s[`slide__content-${name}`])}>
        <div className={clsx(s["slide__price"])}>
          <p className={clsx(s["slide__price-text"])}>
            {
            isLoading ? ("Loading...") 
            : isError ? ("Error!") 
            :`$${(prices[name.toUpperCase()])}`}
          </p>
        </div>

        {name.toUpperCase() !== "BASIC" ? (
          <>
          <FormTitle variant={name}/>
          <PaymentForm onSubmit={handleSubmit} />
          </>
        ) : (
          <>
          <FormTitle variant={name}/>
            <p className={clsx(s["form__content-basic"])}>
              Basic level of access to the platform, providing key features for free, but with limitations
            </p>
            <Button
              extraClass={clsx(s["form__btn-go"])}
              name="Go to todo"
              onClick={() => {
                dispatch(
                  showAlert({
                    message: "Basic tariff selected!",
                    type: "success",
                  })
                );
                navigate("/todo");
              }}
            />
          </>
        )}
        {paymentLoading && <p>Payment is being processed...</p>}
        {paymentError && <p>Payment error: {paymentError}</p>}
      </div>
    </div>
  );
};










PaymentSlide.propTypes = {
  data: PropTypes.shape({
    descr: PropTypes.object.isRequired,
    price: PropTypes.number, // цена в копейках/центах (fallback)
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default PaymentSlide
