export const API_ENDPOINTS = {
  AUTH: {
    LOGIN_CLIENTE: '/auth/cliente/login',
    LOGIN_CONFEITEIRO: '/auth/confeiteiro/login',
    LOGIN_ADMIN: '/auth/admin/login',
    CADASTRO_CLIENTE: '/auth/cliente/cadastro',
    CADASTRO_CONFEITEIRO: '/auth/confeiteiro/cadastro',
    RECUPERAR_SENHA: '/auth/recuperar-senha',
  },
  STORES: {
    LIST: '/stores',
    FEATURED: '/stores/featured',
    NEARBY: '/stores/nearby',
    SEARCH: '/stores/search',
    BY_ID: (id) => `/stores/${id}`,
    MENU: (id) => `/stores/${id}/menu`,
    REVIEWS: (id) => `/stores/${id}/reviews`,
    HOURS: (id) => `/stores/${id}/hours`,
  },
  ORDERS: {
    CREATE: '/orders',
    CLIENT: (id) => `/orders/cliente/${id}`,
    STORE: (id) => `/orders/loja/${id}`,
    BY_ID: (id) => `/orders/${id}`,
    STATUS: (id) => `/orders/${id}/status`,
    PAYMENT: (id) => `/orders/${id}/payment`,
    TRACKING: (id) => `/orders/${id}/tracking`,
  },
  PRODUCTS: {
    LIST: '/products',
    BY_STORE: (id) => `/products/store/${id}`,
    BY_ID: (id) => `/products/${id}`,
    OFFERS: '/products/offers',
    CATEGORIES: '/products/categories',
    SEARCH: '/products/search',
  },
  USER: {
    PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
    FAVORITES: '/user/favorites',
  }
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERING: 'delivering',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const USER_TYPES = {
  CLIENTE: 'cliente',
  CONFEITEIRO: 'confeiteiro',
  ADMIN: 'admin'
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PIX: 'pix',
  CASH: 'cash'
};