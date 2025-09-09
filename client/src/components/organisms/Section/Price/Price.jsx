import s from "./Price.module.scss";
import { pricesData } from "../../../../storeData";
import useSubscriptionPrices from "@/hooks/useSubscriptionPrices";
import CardPrice from "@/components/molecules/CardPrice/CardPrice";

const Price = () => {
  const { prices, isLoading, isError } = useSubscriptionPrices();

  const arr_prices = Object.entries(prices)

  return (
    <div className={s["price"]}>
      <div className={`${s["price-container"]} container container__indent`}>
        <h2 className={s["price-title"]}>
          {pricesData.prices.pricesTitle}
        </h2>
        <div className={s["price__content"]}>
          <p className={s["price__content-text"]}>
            {pricesData.prices.pricesDescr}
          </p>
          <ul className={s["price-list"]}>
            {arr_prices.map(([type, amount]) => {
              const card = { type, amount };

              return (
                <CardPrice
                  key={type}
                  card={card}
                  title={pricesData[type]?.title}
                  descr={pricesData[type]?.descr}
                  isLoading={isLoading}
                  isError={isError}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Price;
