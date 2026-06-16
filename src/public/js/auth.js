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
  // 1. Limpa o cookie de token definindo uma data passada
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // 2. Se você usa LocalStorage por garantia, limpe também
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  // 3. O PASSO CRUCIAL: Redireciona fisicamente a página para o login
  window.location.href = "/login";
}