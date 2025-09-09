import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from "./store";
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import '@/styles/reset.css';
import '@/styles/fonts.css';
import '@/styles/global.scss';


const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>
);

// Если ты хочешь, чтобы твое приложение работало офлайн и загружалось быстрее, ты можешь изменить 
// unregister() на register() ниже. Это имеет свои подводные камни.
// Узнай больше о сервисных работниках: http://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
