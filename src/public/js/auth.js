(() => {
  const token = localStorage.getItem('token');
  const path = window.location.pathname;

  // Lista de rotas que dispensam autenticação no front-end
  const rotasPublicas = ['/login', '/registrar'];

  if (!token && !rotasPublicas.includes(path)) {
    window.location.href = '/login';
    return;
  }

  // Configuração automática dos interceptors do Axios se ele já estiver carregado
  if (window.axios) {
    window.axios.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    window.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
})();

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}