import ApiService from './api';

class ProductService {
  // Obter produtos da loja
  async getStoreProducts(storeId) {
    return await ApiService.get(`/products/store/${storeId}`);
  }

  // Obter produto por ID
  async getProductById(productId) {
    return await ApiService.get(`/products/${productId}`);
  }

  // Criar produto (confeiteiro)
  async createProduct(dadosProduto) {
    return await ApiService.post('/products', dadosProduto);
  }

  // Atualizar produto (confeiteiro)
  async updateProduct(productId, dadosProduto) {
    return await ApiService.put(`/products/${productId}`, dadosProduto);
  }

  // Deletar produto (confeiteiro)
  async deleteProduct(productId) {
    return await ApiService.delete(`/products/${productId}`);
  }

  // Obter ofertas
  async getOffers() {
    return await ApiService.get('/products/offers');
  }

  // Obter categorias
  async getCategories() {
    return await ApiService.get('/products/categories');
  }

  // Buscar produtos
  async searchProducts(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters }).toString();
    return await ApiService.get(`/products/search?${params}`);
  }

  // Upload de imagem do produto
  async uploadProductImage(productId, imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    return await ApiService.request(`/products/${productId}/image`, {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type para FormData
    });
  }
}

export default new ProductService();