const NotFoundPage = {
render: () => `
 <section aria-labelledby="not-found-title">
   <h2 id="not-found-title">404 - Page Not Found</h2>
   <p>Halaman yang Anda cari tidak ada. Kembali ke <a href="#/">beranda</a>.</p>
 </section>
`,
afterRender: () => {
 // Fokus ke judul untuk aksesibilitas
 document.getElementById('not-found-title').focus();
},
};

export default NotFoundPage;