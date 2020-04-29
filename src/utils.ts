export const toProperCase = word => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const removeOptionalFields = (fields: string[], obj) => {
  fields.forEach(key => {
    if (!obj[key]) { delete obj[key] }
  })

  return obj
}

export const checkRequiredFields = (fields: string[], obj) => {
  for (let key of fields) {
    if (!obj[key]) { return false }
  }

  return true
}

export const convertDurationToString = (duration: number): string => {
  const hours = duration < 60 ? 0 : Math.floor(duration / 60)
  const minutes = duration < 60 ? Math.floor(duration) : Math.floor(duration % 60)
  return `${hours}:${!minutes ? '00' : minutes < 10 ? `0${minutes}` : minutes}`
}