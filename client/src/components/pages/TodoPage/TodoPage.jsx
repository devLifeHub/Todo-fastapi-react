import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TodoHeader from "@/components/organisms/Headers/TodoHeader/TodoHeader";
import ReviewForm from "@/components/organisms/Forms/ReviewForm/ReviewForm";
import TodoTemplate from "@/components/templates/TodoTemplate/TodoTemplate";
import { selectIsProfileForm, selectIsReviewForm } from "@/store/actionForm/actionFormSelectors";
import ProfileForm from "@/components/organisms/Forms/ProfileForm/ProfileForm";


const TodoPage = ({ user }) => {

  const isProfileForm = useSelector(selectIsProfileForm)
  const isReviewForm = useSelector(selectIsReviewForm)

  return (
    <>
        {isProfileForm && <ProfileForm user={user} />}
        {isReviewForm && <ReviewForm />}
        <TodoHeader name={user?.name} surname={user?.surname} plan={user?.plan}/>
        <TodoTemplate />
    </>
  );
};

TodoPage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    plan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
}

export default TodoPage;
