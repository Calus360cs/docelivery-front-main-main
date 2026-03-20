import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore deve ser usado dentro de StoreProvider');
    }
    return context;
};

export const StoreProvider = ({ children }) => {
    const [storeData, setStoreData] = useState({
        name: 'Minha Confeitaria',
        description: 'Doces artesanais feitos com carinho',
        phone: '(11) 99999-9999',
        email: 'contato@minhaconfeitaria.com',
        address: 'Rua das Flores, 123 - Centro',
        workingHours: '08:00 - 18:00',
        logo: null,
        banner: null,
        specialties: ['Bolos', 'Cupcakes', 'Tortas'],
        deliveryFee: 5.00,
        minOrder: 20.00,
        isOpen: true
    });

    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Bolo de Chocolate',
            description: 'Delicioso bolo de chocolate com cobertura',
            price: 35.00,
            category: 'Bolos',
            image: null,
            available: true
        }
    ]);

    const updateStoreData = (newData) => {
        setStoreData(prev => ({ ...prev, ...newData }));
    };

    const addProduct = (product) => {
        setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <StoreContext.Provider value={{
            storeData,
            products,
            updateStoreData,
            addProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </StoreContext.Provider>
    );
};