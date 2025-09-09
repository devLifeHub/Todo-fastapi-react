import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import s from "./AuthForm.module.scss";
import clsx from "clsx";
import FormTitle from "@/components/atoms/FormElems/FormTitle/FormTitle";
import FormContainer from "@/components/atoms/FormElems/FormWrap/FormContainer";
import Form from "@/components/organisms/Forms/Form/Form";
import authThunks from "@/store/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { loginFieldParameters, registerFieldParameters } from "@/storeData";



const AuthForm = ({isUser, isLogin}) => {
  const { loginThunk, registerThunk } = authThunks;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [redirectRoute, setRedirectRoute] = useState('');

  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });


  const updateField = useCallback(
    (field) => (value) => setFormValues(prev => ({ ...prev, [field]: value })),
    []
  );

  useEffect(() => {
    if (isUser && redirectRoute) {
      navigate(redirectRoute);
      setRedirectRoute('');
    }
  }, [isUser, redirectRoute, navigate]);

  const handleLogin = useCallback(async (email, password, route) => {
    const result = await dispatch(loginThunk({ username: email, password }));
    if (result.meta.requestStatus === 'fulfilled') setRedirectRoute(route);
  }, [dispatch, loginThunk]);

  const handleRegister = useCallback(async (name, surname, email, password) => {
    const result = await dispatch(registerThunk({
      name,
      surname,
      email,
      password,
      is_active: true,
      is_superuser: false,
      is_verified: false,
      plan: 'BASIC'
    }));
    if (result.meta.requestStatus === 'fulfilled') {
      handleLogin(email, password, '/payment');
    }
  }, [dispatch, registerThunk, handleLogin]);

  const handleSubmit = useCallback(({ name, surname, email, password }) => {
    if (isLogin) {
      handleLogin(email, password, '/todo');
    } else {
      handleRegister(name, surname, email, password);
    }
  }, [isLogin, handleLogin, handleRegister]);

  const fields = useMemo(() => {
    const base = isLogin ? loginFieldParameters : registerFieldParameters;
    return base.map(f => ({
      ...f,
      value: formValues[f.name],
      onChange: updateField(f.name),
    }));
  }, [isLogin, formValues, updateField]);

  return (
      <FormContainer variant={isLogin ? 'login' : 'register'} >
        <FormTitle variant={isLogin ? 'login' : 'register'} />
        <Form
                    type={isLogin ? 'login' : 'register'}
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel={isLogin ? 'Login' : 'Register'}
                    formClass={clsx(s["form"])}
                  />

        </FormContainer>
  );
};

export default AuthForm;
