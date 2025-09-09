import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import avatarThunk from '@/store/avatar/avatarThunks';
import TodoAvatarMenuView from '../molecules/TodoAvatarMenuView/TodoAvatarMenuView';
import useAvatar from "@/hooks/useAvatar";
import { selectCurAvatarId } from "@/store/avatar/avatarSelectors";
import { clearAvatarUrl, resetCurrent } from "@/store/avatar/avatarSlice";
import useUploadAvatar from "@/hooks/useUploadAvatar";
import useAvatarLoading from "@/hooks/useAvatarLoading";
import authThunks from "@/store/auth/authThunks";
import { showProfileForm, showReviewForm } from "@/store/actionForm/actionFormSlice";



const TodoAvatarMenu = () => {
  const dispatch = useDispatch();

  const { logoutThunk } = authThunks
  const { uploadAvatarThunk, fetchAvatarUserTaskThunk } = avatarThunk

  const currentAvatarId = useSelector(selectCurAvatarId)
  
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => setIsActive(prev => !prev);
  
  
  useEffect(() => {
    dispatch(fetchAvatarUserTaskThunk());
  },[]);
  
  const { uploadAvatarId } = useUploadAvatar()
  const avatarId = uploadAvatarId ?? currentAvatarId
  const { avatarUrl } = useAvatar(avatarId)
               
    const handleFileChange = async (e) => {
      const file =  e.target.files[0];
      if (file) {
        await dispatch(resetCurrent())
        await dispatch(clearAvatarUrl(avatarId))
        await dispatch(uploadAvatarThunk({ file, avatarId, avatarUrl}));
      } 
  };

	const handleShowProfileForm = () => dispatch(showProfileForm())
	const handleShowReviewForm = () => dispatch(showReviewForm())
  
  const { isLoading } = useAvatarLoading(avatarId)

  const onLogout = () => {
     dispatch(logoutThunk()).unwrap()
      .then(() => {
        window.location.href = "/login"
      })
  }

  return (
   <TodoAvatarMenuView 
   isLoading={isLoading} 
   url={avatarUrl}
   isActive={isActive}
   toggleMenu={toggleMenu}
   handleShowProfileForm={handleShowProfileForm}
   handleShowReviewForm={handleShowReviewForm}
   handleFileChange={handleFileChange} 
   onLogout={onLogout}
   />
    
  );
};

export default TodoAvatarMenu;
