
export const selectLatestReviews = s => s.reviews.review
export const selectCreateReviewsStatus = s => s.reviews.createStatus
export const selectCreateReviewError = s => s.reviews.createError
export const selectIsCreatingReviews = s => selectCreateReviewsStatus(s) === "loading"
export const selectIsReviewsCreated = s => selectCreateReviewsStatus(s) === "succeeded"
export const selectIsCreateReviewsFailed = s => selectCreateReviewsStatus(s) === "failed"



export const selectFetchAllReviews = s => s.reviews.reviewsAll || []
export const selectFetchAllReviewsStatus = s => s.reviews.fetchStatus
export const selectFetchAllReviewsError = s => s.reviews.fetchError