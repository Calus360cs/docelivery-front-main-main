/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// IMPORTAÇÃO CORRETA: Sair da pasta Components/ (..), entrar em Context/
import { useCartStore } from "../context/CartContext.jsx";
// IMPORTAÇÃO CORRETA: O CSS Module está na mesma pasta.
import Styles from "./CartComponent.module.css";
import { IoCloseCircleOutline, IoTrashOutline, IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';


const CartComponent = () => {
    const [showPayment, setShowPayment] = useState(false);
    
    // 1. FUNÇÃO DE FORMATAÇÃO DE PREÇO
    const formatPrice = (value) => {
        // Correção: Se o valor for nulo ou indefinido, retorna 0
        const safeValue = value || 0;
        
        return safeValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    // 2. DESESTRUTURAÇÃO ÚNICA E COMPLETA do Contexto
    const {
        cartItems,
        activeStore,
        removeItemFromCart,
        removeAllOfItem,
        addItemToCart,
        clearCart,
        toggleCart,
    } = useCartStore();
    
    // 3. CÁLCULO DO TOTAL
    // Garante que cartItems é uma array vazia se for undefined ou null.
    const totalPrice = (cartItems || []).reduce((acc, item) => {
        // Garante que os campos de cálculo são seguros
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return acc + (price * quantity);
    }, 0);
    
    const totalFormatado = formatPrice(totalPrice);
    
    // 4. LOJA ATIVA
    const storeName = activeStore ? activeStore.name : "Carrinho Vazio";

    // 5. Função de adicionar item (para o botão '+')
    const handleAddItem = (item) => {
        // Passando null para newStore, indicando que é apenas um incremento
        addItemToCart(item, null, 1);
    };

    return (
        <>
            <div className={Styles.cart_container}>
                <button
                    className={Styles.close_btn}
                    onClick={toggleCart}
                    aria-label="Fechar Carrinho"
                >
                    <IoCloseCircleOutline size={24} />
                </button>
                
                <h3 className={Styles.cart_title}>
                    {storeName}
                </h3>

                <div className={Styles.item_list}>
                    {(cartItems || []).length === 0 ? (
                        <div className={Styles.empty_cart}>
                            <div className={Styles.empty_cart_icon}>🛒</div>
                            <p>Seu carrinho está vazio.<br/>Comece a adicionar delícias!</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className={Styles.cart_item}>
                                <img 
                                    src={item.imageUrl || item.image} 
                                    alt={item.name || item.title}
                                    className={Styles.item_image}
                                />
                                
                                <div className={Styles.item_info}>
                                    <div className={Styles.item_name}>
                                        {item.name || item.title}
                                    </div>
                                    
                                    <div className={Styles.item_controls}>
                                        <button
                                            onClick={() => removeItemFromCart(item.id)}
                                            aria-label="Remover uma unidade"
                                        >
                                            -
                                        </button>
                                        <span className={Styles.item_quantity}>{item.quantity}</span>
                                        <button
                                            onClick={() => handleAddItem(item)}
                                            aria-label="Adicionar uma unidade"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <div className={Styles.item_price}>
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => removeAllOfItem(item.id)}
                                    className={Styles.remove_btn}
                                    aria-label="Remover item"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            
                {(cartItems || []).length > 0 && (
                    <>
                        <div className={Styles.cart_summary}>
                            <span>Total: {totalFormatado}</span>
                        </div>
                        <button 
                            className={Styles.checkout_btn}
                            onClick={() => {
                                let deliveryFee = 5.00;
                                if (activeStore?.fee) {
                                    if (activeStore.fee === 'Grátis' || activeStore.fee === 'Grátis') {
                                        deliveryFee = 0.00;
                                    } else {
                                        const feeStr = activeStore.fee.replace('R$ ', '').replace(',', '.');
                                        deliveryFee = parseFloat(feeStr) || 5.00;
                                    }
                                }
                                const checkoutData = {
                                    cartItems: cartItems || [],
                                    activeStore: activeStore,
                                    subtotal: totalPrice,
                                    deliveryFee: deliveryFee
                                };
                                console.log('Dados salvos para checkout:', checkoutData);
                                console.log('Total price sendo salvo:', totalPrice);
                                localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
                                window.location.href = '/docelivery/cliente/pagamento';
                            }}
                        >
                            Finalizar Pedido
                        </button>
                    </>
                )}
            </div>
            

        </>
    );
};

export default CartComponent;