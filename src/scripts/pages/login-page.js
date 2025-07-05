import LoginPresenter from '../presenter/login-presenter.js';

const LoginPage = {
  render: () => `
    <section>
      <h2>Login</h2>
      <form id="login-form">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit"><i class="fas fa-sign-in-alt"></i> Login</button>
      </form>
    </section>
  `,

  afterRender: () => {
    // Inisialisasi presenter untuk mengelola logika halaman ini
    new LoginPresenter(LoginPage);
  },

  // === Metode yang dipanggil oleh Presenter ===

  getLoginForm: () => document.getElementById('login-form'),

  getFormData: () => {
    const form = document.getElementById('login-form');
    return {
      email: form.email.value,
      password: form.password.value,
    };
  },

  onLoginSuccess: () => {
    // Arahkan ke halaman cerita setelah berhasil login
    window.location.hash = '#/stories';
  },

  onLoginFailed: (message) => {
    alert(message);
  },
};

export default LoginPage;