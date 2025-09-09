import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/atoms/Modal/Modal";
import { selectIsProfileForm } from "@/store/actionForm/actionFormSelectors";
import { hideProfileForm } from "@/store/actionForm/actionFormSlice";
import FormTitle from "@/components/atoms/FormElems/FormTitle/FormTitle";
import FormContainer from "@/components/atoms/FormElems/FormWrap/FormContainer";
import AccountDelete from "@/components/molecules/AccountDelete/AccountDelete";
import AccountUpdateForm from "../AccountUpdateForm/AccountUpdateForm";
import { AnimatePresence } from "framer-motion";
import AnimatedBlock from "@/components/molecules/AnimatedBlock/AnimatedBlock";
import { useAnimated } from "@/hooks/useAnimated";

const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const isProfileForm = useSelector(selectIsProfileForm);

  const { isOpen, requestClose, handleExitComplete } = useAnimated(
    isProfileForm,
    () => dispatch(hideProfileForm())
  );

  const [isDelete, setIsDelete] = useState(false);
  const toggleDeleteMode = () => setIsDelete(v => !v);
  const variant = isDelete ? "delete" : "update"

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isOpen && (
        <Modal mode="profile">
          <AnimatedBlock key="profileForm" preset="slideDown">
            <FormContainer variant="profile">
              <FormTitle variant="profile" />
              <AnimatePresence mode="wait">
                <AnimatedBlock key={variant} preset="fade">
                  {isDelete ? (
                    <AccountDelete toggleDeleteMode={toggleDeleteMode} />
                  ) : (
                    <AccountUpdateForm
                      user={user}
                      requestClose={requestClose}
                      toggleDeleteMode={toggleDeleteMode}
                    />
                  )}
                </AnimatedBlock>

              </AnimatePresence>
            </FormContainer>
          </AnimatedBlock>
        </Modal>
      )}
    </AnimatePresence>
  );
};

ProfileForm.propTypes ={ 
  user: PropTypes.object.isRequired,
}

export default ProfileForm;
