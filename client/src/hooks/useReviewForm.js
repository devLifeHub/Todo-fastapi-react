import { useDispatch } from "react-redux"
import { showForm, hideForm } from "@/store/reviewForm/reviewFormSlice"

const useReviewForm = () => {
  const dispatch = useDispatch()

  const openForm = () => dispatch(showForm())
  const closeForm = () => dispatch(hideForm())

  return { openForm, closeForm }
}

export default useReviewForm