import makeRequest from "./authHelpers.js";
export default class Auth {
  constructor() {
    this.jwtToken = ''
    this.user = {}
  }

  async login(callback) {
    const password = document.getElementById('password')
    const email = document.getElementById('email')
    const postData = {
      email: email.value,
      password: password.value
    }

    try {
      let tokenResponse = await makeRequest('login', 'POST', postData)
      this.jwtToken = tokenResponse.accessToken
      let user = await this.getCurrentUser(email.value);
      this.user = user[0]

      document.getElementById('login').classList.add('hidden');
      password.value = '';

      if (callback) {
        callback()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getCurrentUser(email) {
    try {
      return makeRequest('users?email=' + email, 'GET', null, this.token)
    } catch (error) {
      console.log(error)
    }
  }

  set token(value) {

  }

  get token() {
    return this.jwtToken
  }
}