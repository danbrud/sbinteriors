export const toProperCase = word => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const removeOptionalFields = (fields, obj) => {
  fields.forEach(key => {
    if (!obj[key]) { delete obj[key] }
  })

  return obj
}