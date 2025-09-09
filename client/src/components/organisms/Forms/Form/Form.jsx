import PropTypes from "prop-types"
import { useState } from "react"
import clsx from "clsx"
import s from "./Form.module.scss"
import InputForm from "@/components/atoms/InputForm/InputForm"
import Button from "@/components/atoms/Button/Button"

const Form = ({fields, onSubmit, submitLabel, formClass, children, initialValues = {} }) => {
  const initialState = Object.fromEntries(
    fields.map(f => [f.name, initialValues[f.name] ?? ""])
  );

  const [formData, setFormData] = useState(initialState)

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
        <form className={clsx(formClass, s["form"])} onSubmit={handleSubmit}>
          <fieldset className={s["form__field"]}>
              { children }
              {fields.map(field => (
                <InputForm
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={(val) => handleChange(field.name, val)}
                  inputClass
                  />
              ))}
          </fieldset>
        <Button type="submit" name={submitLabel} extraClass={s["form__btn-submit"]} />
        </form>
  )
}

Form.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            autoComplete: PropTypes.string,
        })
        ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    formClass: PropTypes.string,
    children: PropTypes.node,
    initialValues: PropTypes.object
}

export default Form
