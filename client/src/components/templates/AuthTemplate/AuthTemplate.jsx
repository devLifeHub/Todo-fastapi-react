import { useState, useCallback } from 'react';
import AuthPrompt from '@/components/molecules/AuthPrompt/AuthPrompt';
import s from './AuthTemplate.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AuthForm from '@/components/organisms/Forms/AuthForm/AuthForm';

const AuthTemplate = ({isUser}) => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = useCallback(() => setIsLogin(prev => !prev), []);

  return (
    <div className={clsx(s.auth)}>
      <div className={clsx(s["auth-container"], "container")}>
        <AuthPrompt isLogin={isLogin} toggleForm={toggleForm} />
        <div
          className={clsx(s["auth__forms-optional"], isLogin ? s["auth--active"] : "")}
          id="auth-forms-optional"
        >
          <AuthForm isUser={isUser} isLogin={isLogin}/>
        </div>
      </div>
    </div>
  );
};

AuthTemplate.propTypes = {
      isUser: PropTypes.bool.isRequired,
  } 

export default AuthTemplate;
