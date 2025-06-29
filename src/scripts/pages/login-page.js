// src/scripts/pages/login-page.js
import { login } from '../data/api.js';

const LoginPage = {
  render: () => `
    <section>
      <h2>Login</h2>
      <form id="login-form">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </section>
  `,

  afterRender: () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      const result = await login({ email, password });
      if (!result.error) {
        localStorage.setItem('token', result.loginResult.token);
        window.location.hash = '#/stories';
      } else {
        alert(result.message);
      }
    });
  },
};

export default LoginPage;