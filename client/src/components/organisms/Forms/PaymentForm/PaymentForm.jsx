import { useState } from "react"
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"
import PropTypes from "prop-types"
import clsx from "clsx"
import s from "./PaymentForm.module.scss"
import Button from "@/components/atoms/Button/Button"

const stripeCardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#fff",
      "::placeholder": { color: "#c5a0fb", transition: "color 0.2s" },
      ":hover": { "::placeholder": { color: "#fff" } },
      ":focus": { "::placeholder": { color: "#000" } },
    },
    invalid: { iconColor: "#ff0000", color: "#ff0000" },
    complete: { color: "#00ff99" },
  },
}

const fieldConfigs = [
  { key: "number", name: "Number", Element: CardNumberElement },
  { key: "expiry", name: "Expiry", Element: CardExpiryElement },
  { key: "cvc",    name: "CVC",    Element: CardCvcElement },
]

const PaymentForm = ({ onSubmit }) => {
  const [focused, setFocused] = useState({
    number: false,
    expiry: false,
    cvc: false,
  })

  const handleFocus = key => setFocused(prev => ({ ...prev, [key]: true }))
  const handleBlur  = key => setFocused(prev => ({ ...prev, [key]: false }))

  return (
    <form className={clsx(s["form__content"])} onSubmit={onSubmit}>
      {fieldConfigs.map(({ key, name, Element }) => (
        <div
          key={key}
          data-name={name}
          className={clsx(
            s["form__field"],
            s[`form__field-${key}`],
            { [s.focused]: focused[key] }
          )}
        >
          <div className={clsx(s["form__field-input"])}>
            <Element
              options={stripeCardStyle}
              onFocus={() => handleFocus(key)}
              onBlur={()  => handleBlur(key)}
            />
          </div>
        </div>
      ))}

      <Button name="Pay" type="submit" />
    </form>
  )
}

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default PaymentForm
