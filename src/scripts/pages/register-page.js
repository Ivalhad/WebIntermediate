// src/scripts/pages/register-page.js
import { register } from '../data/api.js';

const RegisterPage = {
  render: () => `
    <section>
      <h2>Register</h2>
      <form id="register-form">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" minlength="8" required />
        <button type="submit">Register</button>
      </form>
    </section>
  `,

  afterRender: () => {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const result = await register({ name, email, password });
      if (!result.error) {
        alert('User Created');
        window.location.hash = '#/login';
      } else {
        alert(result.message);
      }
    });
  },
};

export default RegisterPage;