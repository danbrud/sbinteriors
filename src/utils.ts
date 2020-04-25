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
  for(let key of fields) {
    if (!obj[key]) { return false }
  }

  return true
}