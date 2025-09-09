import Footer from "@/components/organisms/Footers/Footer/Footer";  
import AuthHeader from "@/components/organisms/Headers/AuthHeader/AuthHeader";
import PaymentSwiper from "@/components/organisms/Swipers/PaymentSwiper/PaymentSwiper";
  

const PaymentPage = () => {
    return (
      <>
        <AuthHeader />
        <PaymentSwiper />
        <Footer />
      </>
    );
  };

  export default PaymentPage;