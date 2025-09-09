import "swiper/css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentContent from "@/components/organisms/PaymentContent/PaymentContent";

const stripePromise = loadStripe(
  "pk_test_51RMETO4Jf4AW4Or5UDAJjoLpwXxvXWrlP6wiMyUIm86Ht5uiNQPqmrV9XYxMntmVnTTVaWAMgkZj0rqgJsKOYNXd00DA3vdnaL"
);


const PaymentSwiper = () => {
  return (
    <Elements stripe={stripePromise} options={{ locale: "en" }}>
      <PaymentContent />
    </Elements>
  );
};

export default PaymentSwiper;
