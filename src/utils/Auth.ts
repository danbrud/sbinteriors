import axios from 'axios'
import jwt_decode from 'jwt-decode'

export class Auth {
  private _isAuthenticated: boolean

  constructor() {
    this._isAuthenticated = false
    this.checkAuthentication()
  }

  public get isAuthenticated() {
    return this._isAuthenticated
  }

  private checkAuthentication() {
    if (localStorage.token) {
      let authValue = true
      const decoded = this.decodeToken()
      const currentTime = Date.now() / 1000

      if (decoded.exp < currentTime) { authValue = false }

      this.setAuthToken(authValue)
      this._isAuthenticated = authValue
    }
  }

  public decodeToken() {
    const token = localStorage.token
    const decoded = jwt_decode(token)
    return decoded
  }

  public logout() {
    localStorage.removeItem('token')
    this.setAuthToken(false)
    this._isAuthenticated = false
  }

  public login(token) {
    localStorage.setItem('token', token)
    this.setAuthToken(token)
    this._isAuthenticated = true
  }

  private setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }
}