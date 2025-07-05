import { login } from '../data/api.js';

class LoginPresenter {
  constructor(view) {
    this.view = view;
    this._attachFormSubmitListener();
  }

  _getToken() {
    return localStorage.getItem('token');
  }

  _setToken(token) {
    localStorage.setItem('token', token);
  }

  _attachFormSubmitListener() {
    this.view.getLoginForm().addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const { email, password } = this.view.getFormData();

      if (!email || !password) {
        return this.view.onLoginFailed('Email and password cannot be empty.');
      }

      try {
        const result = await login({ email, password });
        if (!result.error) {
          this._setToken(result.loginResult.token);
          this.view.onLoginSuccess();
        } else {
          this.view.onLoginFailed(result.message);
        }
      } catch (error) {
        this.view.onLoginFailed('Login failed. Please check your connection.');
      }
    });
  }
}

export default LoginPresenter;