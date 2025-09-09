// import PropTypes from "prop-types"
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   fetchAvatarTaskIdThunk,
//   statusAvatarThunk,
//   fetchAvatarBlobThunk,
// } from "@/store/avatar/avatarThunks"
// import {
//   selectFetchIdState,
//   selectTaskStatusState,
//   selectBlobState,
// } from "@/store/avatar/avatarSelectors"

// import avatar_default from "@/assets/avatar_default.png"

// import s from "./ReviewSlide.module.scss"
// import clsx from "clsx"

// const ReviewContentSlide = ({ data }) => {
//   const dispatch   = useDispatch()
//   const avatarId   = data.avatar

//   const { status: fetchIdStatus, taskId }      =
//     useSelector(s => selectFetchIdState(s, avatarId))
//   const { status: taskStatus }                  =
//     useSelector(s => selectTaskStatusState(s, avatarId))
//   const { status: blobStatus, url: blobUrl }    =
//     useSelector(s => selectBlobState(s, avatarId))


//   useEffect(() => {
//     if (avatarId) {
//       dispatch(fetchAvatarTaskIdThunk(avatarId))
//     }
//   }, [avatarId, dispatch])

//   useEffect(() => {
//     if (fetchIdStatus === "succeeded" && taskId) {
//       dispatch(statusAvatarThunk({ avatarId, taskId }))
//     }
//   }, [fetchIdStatus, taskId, avatarId, dispatch])

//   useEffect(() => {
//     if (
//       fetchIdStatus === "succeeded" &&
//       taskStatus    === "SUCCESS" &&
//       taskId &&
//       blobStatus    === "idle"
//     ) {
//       dispatch(fetchAvatarBlobThunk({ avatarId, taskId }))
//     }
//   }, [
//     fetchIdStatus,
//     taskStatus,
//     taskId,
//     blobStatus,
//     avatarId,
//     dispatch,
//   ])

//   const isLoading =
//     fetchIdStatus === "loading" ||
//     taskStatus    === "loading" ||
//     blobStatus    === "loading"

//   return (
//     <div className={clsx(s["slide"])}>
//       <div className={clsx(s["slide-wrap"])}>
//         <div className={clsx(s["slide__content"])}>
//           <div className={clsx(s["slide__content__avatar"])}>
//             {blobUrl ? (
//             <img src={blobUrl} className={clsx(s["slide__avatar-img"])} alt="Avatar" />
//             ) : isLoading ? (
//             <div>Загрузка аватара…</div>
//             ) : (
//             <img src={avatar_default} className={clsx(s["slide__avatar-img"])} alt="Avatar default"/>
//             )}
//           </div>

//           <div className={clsx(s["slide__content__fullname"])}>
//             <p className={clsx(s["slide__fullname-name"], s["info__user"])}>{data.name}</p>
//             <p className={clsx(s["slide__fullname-surname"], s["info__user"])}>
//               {data.surname}
//             </p>
//           </div>

//           <div className={clsx(s["slide__content__comment"])}>
//           <p className={clsx(s["slide__comment-text"])}>
//             {data.comment || "No comment"}
//           </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// ReviewContentSlide.propTypes = {
//   data: PropTypes.shape({
//     avatar:   PropTypes.string,       // ID или URL аватара
//     name:     PropTypes.string.isRequired,
//     surname:  PropTypes.string.isRequired,
//     comment:  PropTypes.string,
//     error:  PropTypes.string,
//   }).isRequired,
// }

// export default ReviewContentSlide



// // import { useEffect, useState } from "react"
// // import PropTypes from "prop-types"
// // import clsx from "clsx"
// // import { useDispatch, useSelector } from "react-redux"

// // import {
// //   fetchAvatarTaskIdThunk,
// //   statusAvatarThunk,
// // } from "@/store/avatar/avatarThunks"
// // import {
// //   selectFetchIdState,
// //   selectTaskStatusState,
// // } from "@/store/avatar/avatarSelectors"

// // import api from "@/api/index"   // чтобы узнать baseURL
// // import s from "./ReviewSlide.module.scss"

// // const ReviewContentSlide = ({ data }) => {
// //   const dispatch = useDispatch()
// //   const avatarId = data.avatar

// //   const { status: fetchIdStatus, taskId } = useSelector(state =>
// //     selectFetchIdState(state, avatarId)
// //   )
// //   const { status: taskStatus } = useSelector(state =>
// //     selectTaskStatusState(state, avatarId)
// //   )

// //   const [imgUrl, setImgUrl] = useState(null)

// //   // 1) завести таску
// //   useEffect(() => {
// //     if (avatarId) dispatch(fetchAvatarTaskIdThunk(avatarId))
// //   }, [avatarId, dispatch])

// //   // 2) опросить статус, когда получили taskId
// //   useEffect(() => {
// //     if (fetchIdStatus === "succeeded" && taskId) {
// //       dispatch(statusAvatarThunk({ avatarId, taskId }))
// //     }
// //   }, [fetchIdStatus, taskId, avatarId, dispatch])

// //   // 3) когда таска закончилась — строим URL на скачивание
// //   useEffect(() => {
// //     if (taskStatus === "SUCCESS" && taskId) {
// //       setImgUrl(`${api.defaults.baseURL}/avatar/file/${taskId}`)
// //     }
// //   }, [taskStatus, taskId])

// //   const isLoading = fetchIdStatus === "loading" || taskStatus === "loading"

// //   console.log("imgUrl", imgUrl) 

// //   return (
// //     <div className={clsx(s.slide)}>
// //       <div className={clsx(s["slide-wrap"])}>
// //         <div className={clsx(s["slide__content"])}>
// //           {imgUrl ? (
// //             <img
// //               className={clsx(s["slide__content-img"])}
// //               src={imgUrl}
// //               alt="Review Avatar"
// //             />
// //           ) : isLoading ? (
// //             <div className={clsx(s["slide__loading"])}>Загрузка аватара…</div>
// //           ) : (
// //             <div className={clsx(s["slide__loading"])}>Аватар отсутствует</div>
// //           )}

// //           <div className={clsx(s["slide__content__fullname"])}>
// //             <p className={clsx(s["slide__fullname-name"])}>{data.name}</p>
// //             <p className={clsx(s["slide__fullname-surname"])}>
// //               {data.surname}
// //             </p>
// //           </div>

// //           <div className={clsx(s["slide__content__comment"])}>
// //             <p className={clsx(s["slide__comment-text"])}>
// //               {data.comment || "No comment"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // ReviewContentSlide.propTypes = {
// //   data: PropTypes.shape({
// //     avatar: PropTypes.string,
// //     name: PropTypes.string.isRequired,
// //     surname: PropTypes.string.isRequired,
// //     comment: PropTypes.string,
// //   }).isRequired,
// // }

// // export default ReviewContentSlide
