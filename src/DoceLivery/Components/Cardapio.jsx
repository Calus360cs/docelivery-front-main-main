import React, { useState } from 'react';
import ProdutoForm from './ProdutoForm'; // Componente de Modal/Formulário

// Dados simulados
const produtosMock = [
{ id: 101, nome: 'Bolo de Cenoura com Brigadeiro', preco: 45.00, disponivel: true },
{ id: 102, nome: 'Torta Red Velvet (Fatia)', preco: 18.00, disponivel: true },
{ id: 103, nome: 'Pão de Mel (Esgotado)', preco: 5.50, disponivel: false },
];

const Cardapio = () => {
const [produtos, setProdutos] = useState(produtosMock);
const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null); // Para editar um produto existente

const handleAbrirModal = (produto = null) => {
    setProdutoEmEdicao(produto);
    setModalAberto(true);
};

const handleSalvarProduto = (dadosProduto) => {
    // Lógica para salvar (POST/PUT) no backend
    console.log('Dados a serem salvos:', dadosProduto);
    setModalAberto(false);
    // Aqui você faria o fetch e atualizaria a lista de `produtos`
};

const handleToggleDisponibilidade = (id) => {
    setProdutos(produtos.map(p => 
    p.id === id ? { ...p, disponivel: !p.disponivel } : p
    ));
    // Lógica para enviar a atualização para o backend
};

return (
    <div>
        <button 
        onClick={() => handleAbrirModal(null)}
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', marginBottom: '20px', cursor: 'pointer' }}
    >
        + Adicionar Novo Doce
    </button>

    {modalAberto && (
        <ProdutoForm 
        produto={produtoEmEdicao} 
        onClose={() => setModalAberto(false)} 
        onSave={handleSalvarProduto} 
        />
    )}

      {/* Lista de Produtos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {produtos.map(produto => (
            <div key={produto.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: produto.disponivel ? '#fff' : '#f8f8f8' }}>
            <span>
            <strong>{produto.nome}</strong> - R$ {produto.preco.toFixed(2)} 
            {produto.disponivel ? null : <span style={{ marginLeft: '10px', color: 'red' }}>(ESGOTADO)</span>}
            </span>
            <div>
            <button onClick={() => handleToggleDisponibilidade(produto.id)} style={{ marginRight: '10px', padding: '5px', backgroundColor: produto.disponivel ? '#ffc107' : '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {produto.disponivel ? 'Esgotar' : 'Disponibilizar'}
            </button>
            <button onClick={() => handleAbrirModal(produto)} style={{ padding: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Editar
            </button>
            </div>
            </div>
        ))}
    
        </div>
    </div>
    );
};

export default Cardapio;