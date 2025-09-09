import AuthTemplate from "@/components/templates/AuthTemplate/AuthTemplate"
import AuthHeader from "@/components/organisms/Headers/AuthHeader/AuthHeader";
import PropTypes from "prop-types";
  

const AuthPage = ({isUser}) => {
    return (
      <>
        <AuthHeader />
        <AuthTemplate isUser={isUser} />
      </>
    );
  };

  AuthPage.propTypes = {
      isUser: PropTypes.bool.isRequired,
  } 

  export default AuthPage;