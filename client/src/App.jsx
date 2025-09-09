import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "@/components/pages/HomePage/HomePage";
import TodoPage from "./components/pages/TodoPage/TodoPage";
import AuthPage from "@/components/pages/AuthPage/AuthPage";
import PaymentPage from "@/components/pages/PaymentPage/PaymentPage";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import Alert from "@/components/atoms/Alert/Alert";
import { selectIsVisibleAlert } from "./store/alert/alertSelectors";
import useWaitAlert from "./hooks/useWaitAlert";

import SpinCircular from "./components/atoms/Loading/Spinner/SpinCircular";



const App = () => {
  const isVisibleAlert = useSelector(selectIsVisibleAlert)
  const { isUser, user, initialized } = useAuth()
  useWaitAlert()
  if (!initialized) return <SpinCircular mode={"common"} size={100} />

  return (
    <>
    {isVisibleAlert && <Alert />}
    <Routes>
      <Route path="/login" element={<AuthPage isUser={isUser} />} />
      <Route path="/todo" element={ isUser ? <TodoPage user={user} /> : <Navigate to="/login" /> } />
      <Route path="/payment" element={ isUser ? <PaymentPage /> : <Navigate to="/login" replace /> } />
      <Route path="/" element={<HomePage isUser={isUser} />} />
    </Routes>
  </>
  );
};

export default App;
