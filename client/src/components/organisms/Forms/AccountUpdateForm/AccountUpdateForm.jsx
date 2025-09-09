import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./AccountUpdateForm.module.scss";
import clsx from "clsx";
import BtnClose from "@/components/atoms/Icon/Common/BtnClose";
import { profileFieldParameters } from "@/storeData";
import Form from "../Form/Form";
import PropTypes from "prop-types";
import avatarThunk from "@/store/avatar/avatarThunks";
import { selectCurAvatarId } from "@/store/avatar/avatarSelectors";
import { clearAvatarUrl, resetCurrent } from "@/store/avatar/avatarSlice";
import useUploadAvatar from "@/hooks/useUploadAvatar";
import useAvatar from "@/hooks/useAvatar";
import avatar_default from "@/assets/avatar_default.png";
import Button from "@/components/atoms/Button/Button";

import ButtonIcon from "@/components/atoms/ButtonIcon/ButtonIcon";
import { fetchUserThunk, patchUserThunk } from "@/store/user/userThunks";

const AccountUpdateForm = ({ user, requestClose, toggleDeleteMode }) => {
  const dispatch = useDispatch();
  const { uploadAvatarThunk } = avatarThunk;


  const currentAvatarId = useSelector(selectCurAvatarId);
  const { uploadAvatarId } = useUploadAvatar();
  const avatarId = uploadAvatarId ?? currentAvatarId;
  const { avatarUrl } = useAvatar(avatarId);

  const avatarText = "Avatar";

  const getInitialValues = (u) => ({
    name: u?.name || "",
    surname: u?.surname || "",
    email: u?.email || "",
    password: "",
    current_password: ""
  });

  const [formValues, setFormValues] = useState(getInitialValues(user));
  const [avatar, setAvatar] = useState(null);
  const [descrAvatar, setDescrAvatar] = useState(avatarText);

  useEffect(() => {
    setFormValues(getInitialValues(user));
  }, [user]), 

  useEffect(() => {
  if (avatar?.name) {
    setDescrAvatar(avatar.name);
  } else {
    setDescrAvatar(avatarText);
  }
}, [avatar]);

  const handleSubmit = async ({ name, surname, email, password }) => {
    console.log("user", user)

    const payload = {
      name,
      surname,
      email,
      ...(password ? { password: password } : {})
    };
    
    console.log("payload", payload);

    await dispatch(patchUserThunk(payload)).unwrap();
    
    if (avatar) {
      await dispatch(resetCurrent());
      await dispatch(clearAvatarUrl(avatarId));
      await dispatch(uploadAvatarThunk({ file: avatar, avatarId, avatarUrl }));
    }
    
    await dispatch(fetchUserThunk());
    requestClose();
};


  const fields = profileFieldParameters;


  return (
    <>
        <Form
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Update"
        formClass={clsx(s["form"])}
        initialValues={formValues}
        >
        <div className={clsx(s["avatar-field"])}>
            <p className={clsx(s["avatar-field-text"])}>{descrAvatar}</p>
            <div className={clsx(s["avatar-block__avatar"])}>
            <div className={clsx(s["avatar-menu__avatar"])}>
                {avatarUrl 
                    ? <img className={clsx(s["avatar-img"])} src={avatarUrl} alt="Avatar" />
                    : <img className={clsx(s["avatar-img"])} src={avatar_default} alt="Avatar" />
                }
            </div>
            <input
                className={clsx(s["avatar__field-input"])}
                id="avatar"
                type="file"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files[0] || null)}
            />
            </div>
        </div>
        </Form>

        <Button name="Delete account" extraClass={clsx(s["form__acc-delete__btn"])} type="button" onClick={toggleDeleteMode}  />

        <ButtonIcon btnClass={clsx(s["form__btn-close"])} handle={requestClose}>
            <BtnClose className={clsx(s["btn__icon-close"])} />
        </ButtonIcon> 
    </>

  )};

AccountUpdateForm.propTypes = {
  user: PropTypes.object.isRequired,
  requestClose: PropTypes.func.isRequired,
  toggleDeleteMode: PropTypes.func.isRequired,
}

export default AccountUpdateForm;
