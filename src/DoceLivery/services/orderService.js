import ApiService from './api';

class OrderService {
  // Criar pedido
  async createOrder(dadosPedido) {
    return await ApiService.post('/orders', dadosPedido);
  }

  // Obter pedidos do cliente
  async getClientOrders(clienteId) {
    return await ApiService.get(`/orders/cliente/${clienteId}`);
  }

  // Obter pedidos da loja
  async getStoreOrders(lojaId) {
    return await ApiService.get(`/orders/loja/${lojaId}`);
  }

  // Obter pedido por ID
  async getOrderById(orderId) {
    return await ApiService.get(`/orders/${orderId}`);
  }

  // Atualizar status do pedido
  async updateOrderStatus(orderId, status) {
    return await ApiService.put(`/orders/${orderId}/status`, { status });
  }

  // Cancelar pedido
  async cancelOrder(orderId, motivo) {
    return await ApiService.put(`/orders/${orderId}/cancel`, { motivo });
  }

  // Obter todos os pedidos (admin)
  async getAllOrders(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await ApiService.get(`/orders/admin?${params}`);
  }

  // Processar pagamento
  async processPayment(orderId, dadosPagamento) {
    return await ApiService.post(`/orders/${orderId}/payment`, dadosPagamento);
  }

  // Rastrear pedido
  async trackOrder(orderId) {
    return await ApiService.get(`/orders/${orderId}/tracking`);
  }
}

export default new OrderService();