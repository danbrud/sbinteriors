import validator from 'validator'
import isEmpty from 'is-empty'

export const toProperCase = word => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const removeOptionalFields = (fields: string[], obj) => {
  fields.forEach(key => {
    if (!obj[key]) { delete obj[key] }
  })

  return obj
}

export const isAdmin = (role: string): boolean => role.toLowerCase() === 'admin'

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

export const validateLoginInput = function (data) {
  let errors: { username?: string, password?: string } = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (validator.isEmpty(data.username)) {
      errors.username = 'Email field is required'
  }

  if (validator.isEmpty(data.password)) {
      errors.password = 'Password field is required'
  }
  return {
      errors,
      isValid: isEmpty(errors)
  }
}

export const SERVER_URL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_SERVER_URL
  : '/api'