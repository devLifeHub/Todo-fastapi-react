import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import subscriptionThunks from "@/store/subscription/subscriptionThunks";
import { selectSubscriptionPrices, selectSubscriptionLoading, selectSubscriptionError } from "@/store/subscription/subscriptionSelectors";

const useSubscriptionPrices = () => {
  const { fetchPriceThunk } = subscriptionThunks;

  const dispatch = useDispatch();

  const prices = useSelector(selectSubscriptionPrices);
  const isLoading = useSelector(selectSubscriptionLoading);
  const isError = useSelector(selectSubscriptionError);

  useEffect(() => { dispatch(fetchPriceThunk()) }, [dispatch, fetchPriceThunk]);

  return { prices, isLoading, isError };
};

export default useSubscriptionPrices;
