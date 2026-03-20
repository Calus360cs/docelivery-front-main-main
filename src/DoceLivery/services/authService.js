import ApiService from './api';

class AuthService {
  // Login de cliente
  async loginCliente(email, senha) {
    const response = await ApiService.post('/auth/cliente/login', { email, senha });
    if (response && response.token && response.user) {
      localStorage.setItem('userToken', response.token);
      localStorage.setItem('userType', response.user.tipo || 'cliente');
      localStorage.setItem('userName', response.user.nome); // Salva o nome do usuário
      localStorage.setItem('userEmail', response.user.email);
    }
    return response;
  }

  // Login de confeiteiro
  async loginConfeiteiro(email, senha) {
    const response = await ApiService.post('/auth/confeiteiro/login', { email, senha });
    if (response && response.token && response.user) {
      localStorage.setItem('userToken', response.token);
      localStorage.setItem('userType', response.user.tipo || 'confeiteiro');
      localStorage.setItem('userName', response.user.nome);
      localStorage.setItem('userEmail', response.user.email);
    }
    return response;
  }

  // Login de admin
  async loginAdmin(email, senha) { // Mantido para consistência, embora possa não ter 'nome'
    return await ApiService.post('/auth/admin/login', { email, senha }); // Este pode não retornar 'user', então não salvamos dados extras
  }
  // Cadastro de cliente
  async cadastroCliente(dadosCliente) {
    return await ApiService.post('/auth/cliente/cadastro', dadosCliente);
  }

  // Cadastro de confeiteiro
  async cadastroConfeiteiro(dadosConfeiteiro) {
    return await ApiService.post('/auth/confeiteiro/cadastro', dadosConfeiteiro);
  }

  // Logout
  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }

  // Verificar se está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('userToken');
  }

  // Obter tipo de usuário
  getUserType() {
    return localStorage.getItem('userType');
  }

  // Obter nome do usuário
  getUserName() {
    return localStorage.getItem('userName');
  }

  // Recuperar senha
  async recuperarSenha(email) {
    return await ApiService.post('/auth/recuperar-senha', { email });
  }
}

export default new AuthService();