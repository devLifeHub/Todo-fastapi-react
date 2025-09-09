import PropTypes from "prop-types"
import clsx from "clsx"
import s from "./AccountDelete.module.scss"
import Button from "@/components/atoms/Button/Button"
import { useDispatch } from "react-redux"
import { deleteUserThunk } from "@/store/user/userThunks"


const AccountDelete = ({ toggleDeleteMode }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
      dispatch(deleteUserThunk())
      .unwrap()
      .then(() => {
        window.location.href = "/login"
      })
      .catch((err) => {
        console.error("Ошибка при удалении:", err)
      })
    }

    return (
        <div className={clsx(s["account-delete"])}>
            <p className={clsx(s["account-delete__text"])}>Are you sure you want to delete your account? <br /> All data will be erased without recovery!</p>
            <div className={clsx(s["account-delete__block-btn"])}>
                <Button name="Yes!" type="button" onClick={handleDelete} />
                <Button name="No!" type="button" onClick={toggleDeleteMode} />
            </div>
        </div>
    )
}

AccountDelete.propTypes = {
    toggleDeleteMode: PropTypes.func.isRequired,
}

export default AccountDelete