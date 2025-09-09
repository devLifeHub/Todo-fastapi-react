import PropTypes from "prop-types"

const ButtonIcon = ({ btnClass, type = "button", handle, children }) => {
    return (
        <button className={btnClass} type={type} onClick={handle}>
            {children}
        </button>
    )
}
ButtonIcon.propTypes = {
    btnClass: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    handle: PropTypes.func,
    children: PropTypes.node.isRequired,
}

export default ButtonIcon