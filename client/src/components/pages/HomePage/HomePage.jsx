import PropTypes from "prop-types";
import Header from "@/components/organisms/Headers/Header/Header";
import HomeTemplate from "@/components/templates/HomeTemplate/HomeTemplate";
import Footer from "@/components/organisms/Footers/Footer/Footer";

const HomePage = ({ isUser }) => {
    return (
        <>
        <Header isUser = {isUser} />
        <HomeTemplate />
        <Footer />
        </>
    );
};

HomePage.propTypes = {
    isUser: PropTypes.bool.isRequired,
} 


export default HomePage