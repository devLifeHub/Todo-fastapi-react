import PropTypes from "prop-types"
import ReviewItemView from "@/components/molecules/ReviewItemView/ReviewItemView"
import useAvatar from "@/hooks/useAvatar"
import useAvatarLoading from "@/hooks/useAvatarLoading"


const ReviewItem = ({ data }) => {
  const avatarId  = data.avatar
  const { avatarUrl } = useAvatar(avatarId)
  const { isLoading } = useAvatarLoading(avatarId)

   return (
    <ReviewItemView
      data={data}
      url={avatarUrl}
      isLoading={isLoading}
    />
  )
}

ReviewItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ReviewItem
