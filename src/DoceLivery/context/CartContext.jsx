// src/DoceLivery/Context/CartContext.js

import { createContext, useContext } from 'react';

// 1. Cria o Objeto Contexto
// Será usado pelo Provider e pelo Hook
export const CartContextStore = createContext(null);

// 2. Hook personalizado para consumir o Contexto
// É o que você importa no HomePage.jsx (useCartStore)
export const useCartStore = () => {
    const context = useContext(CartContextStore);
    
    if (!context) {
        // Garantir que o componente está dentro do Provider
        throw new Error('useCartStore deve ser usado dentro de um CartProviderStore');
    }
    
    return context;
};