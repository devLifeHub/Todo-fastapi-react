import localforage from "localforage"

export const avatarStorage = localforage.createInstance({
  name: "myApp",
  storeName: "avatars",
})

export async function saveAvatarBlob(avatarId, blob) {
  const key = `avatar-${avatarId}`
  await avatarStorage.setItem(key, blob)
  return URL.createObjectURL(blob)
}

export async function hasAvatarBlob(avatarId) {
  const key = `avatar-${avatarId}`
  const blob = await avatarStorage.getItem(key)
  return blob 
}

export async function removeAvatarBlob(avatarId, avatarUrl) {
 if (avatarId) {
    const key = `avatar-${avatarId}`
    const before = await avatarStorage.keys()
    console.log("keys before remove:", before)

    await avatarStorage.removeItem(key)

    const got = await avatarStorage.getItem(key)
    console.log(`getItem("${key}") after remove:`, got)

    const after = await avatarStorage.keys()
    console.log("keys after remove:", after)
  }
  if (avatarUrl) {
    URL.revokeObjectURL(avatarUrl)
  }
}
