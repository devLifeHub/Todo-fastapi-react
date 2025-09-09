import { configureStore } from "@reduxjs/toolkit"

import subscriptionReducer from "./subscription/subscriptionSlice"
import paymentReducer from "./payment/paymentSlice"
import alertReducer from "./alert/alertSlice"
import avatarReducer from "./avatar/avatarSlice"
import reviewsReducer from "./reviews/reviewsSlice"
import todosReducer from "./todo/todoSlice"
import authReducer from "./auth/authSlice"
import userReducer from "./user/userSlice"
import statsReducer from "./stats/statsSlice"
import loadingReducer from "./loading/loadingSlice"
import actionFormReducer from "./actionForm/actionFormSlice"

const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    auth: authReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    payment: paymentReducer,
    alert: alertReducer,
    reviews: reviewsReducer,
    todos: todosReducer,
    actionForm: actionFormReducer,
    stats: statsReducer,
    loading: loadingReducer,
  },
})

export default store
