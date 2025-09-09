import PropTypes from "prop-types"
import clsx from "clsx"
import s from "./FormContainer.module.scss"

const FormContainer = ({variant, isAnimate, children }) => (
    <div className={clsx(s["form__container"], s[`form__container-${variant}`], isAnimate && s["animate"])}>
        <div className={clsx(s["form-wrap"])}>
            {children}
        </div>
    </div>
)

FormContainer.propTypes = {
    variant: PropTypes.oneOf(["profile", "rewiews"]),
    isAnimate: PropTypes.bool,
    children: PropTypes.node.isRequired
}

export default FormContainer