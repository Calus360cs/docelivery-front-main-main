import ApiService from './api';

class ConfeiteiroService {
  // Obter todas as confeiteiras
  async getConfeiteiros() {
    return await ApiService.get('/confeiteiras');
  }

  // Obter uma confeiteira específica pelo ID
  async getConfeiteiro(id) {
    return await ApiService.get(`/confeiteiras/${id}`);
  }

  // Criar uma nova confeiteira
  async createConfeiteiro(dadosConfeiteiro) {
    return await ApiService.post('/confeiteiras', dadosConfeiteiro);
  }

  // Atualizar uma confeiteira existente
  async updateConfeiteiro(id, dadosConfeiteiro) {
    return await ApiService.put(`/confeiteiras/${id}`, dadosConfeiteiro);
  }

  // Deletar uma confeiteira
  async deleteConfeiteiro(id) {
    return await ApiService.delete(`/confeiteiras/${id}`);
  }

  // Obter pedidos atribuídos a uma confeiteira
  async getPedidosAtribuidos(id) {
    return await ApiService.get(`/confeiteiras/${id}/pedidos`);
  }
}

export default new ConfeiteiroService();