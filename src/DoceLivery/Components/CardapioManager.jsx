import React, { useState, useEffect } from 'react';
import { IoAdd, IoCreate, IoTrash, IoImage, IoGrid, IoList, IoSearch, IoFilter } from 'react-icons/io5';
import { IMAGE_MAP } from '../data/imageImports';
import { useCardapio } from '../context/CardapioContext';
import ImageUploader from './ImageUploader';
import Styles from './CardapioManager.module.css';

const CardapioManager = ({ lojaId = 1 }) => {
    const { getCardapio, updateCardapio } = useCardapio();
    const cardapioAtual = getCardapio(lojaId);
    
    const [produtos, setProdutos] = useState(cardapioAtual.produtos || []);
    const [combos, setCombos] = useState(cardapioAtual.combos || []);
    
    useEffect(() => {
        updateCardapio(lojaId, produtos, combos);
    }, [produtos, combos, lojaId, updateCardapio]);
    
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('produto'); // 'produto', 'combo', 'kit'
    const [editingItem, setEditingItem] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [filtroCategoria, setFiltroCategoria] = useState('todos');
    const [busca, setBusca] = useState('');
    
    const [formData, setFormData] = useState({
        nome: '',
        preco: '',
        categoria: 'bolos',
        imagem: '',
        descricao: '',
        disponivel: true,
        produtos: [],
        tipo: 'combo'
    });

    const categorias = ['bolos', 'cupcakes', 'doces', 'tortas', 'combos'];
    const imagensDisponiveis = Object.keys(IMAGE_MAP);

    const handleOpenModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        if (item) {
            setFormData(item);
        } else {
            setFormData({
                nome: '',
                preco: '',
                categoria: 'bolos',
                imagem: '',
                imagemCustom: null,
                descricao: '',
                disponivel: true,
                produtos: [],
                tipo: 'combo'
            });
        }
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formData.nome || !formData.preco) {
            alert('Preencha nome e preço');
            return;
        }

        const newItem = {
            ...formData,
            id: editingItem ? editingItem.id : Date.now(),
            preco: parseFloat(formData.preco)
        };

        if (modalType === 'produto') {
            if (editingItem) {
                setProdutos(produtos.map(p => p.id === editingItem.id ? newItem : p));
            } else {
                setProdutos([...produtos, newItem]);
            }
        } else {
            if (editingItem) {
                setCombos(combos.map(c => c.id === editingItem.id ? newItem : c));
            } else {
                setCombos([...combos, newItem]);
            }
        }
        
        setShowModal(false);
    };

    const handleDelete = (id, type) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            if (type === 'produto') {
                setProdutos(produtos.filter(p => p.id !== id));
            } else {
                setCombos(combos.filter(c => c.id !== id));
            }
        }
    };

    const toggleDisponibilidade = (id) => {
        setProdutos(produtos.map(p => 
            p.id === id ? { ...p, disponivel: !p.disponivel } : p
        ));
    };

    const produtosFiltrados = produtos.filter(produto => {
        const matchCategoria = filtroCategoria === 'todos' || produto.categoria === filtroCategoria;
        const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
        return matchCategoria && matchBusca;
    });

    return (
        <div className={Styles.cardapioManager}>
            <div className={Styles.header}>
                <div className={Styles.headerLeft}>
                    <h2>Gerenciar Cardápio</h2>
                    <p>Adicione, edite e organize seus produtos</p>
                </div>
                <div className={Styles.headerActions}>
                    <div className={Styles.viewToggle}>
                        <button 
                            className={`${Styles.toggleBtn} ${viewMode === 'grid' ? Styles.active : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <IoGrid size={20} />
                        </button>
                        <button 
                            className={`${Styles.toggleBtn} ${viewMode === 'list' ? Styles.active : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <IoList size={20} />
                        </button>
                    </div>
                    <button 
                        className={Styles.addBtn}
                        onClick={() => handleOpenModal('produto')}
                    >
                        <IoAdd size={20} />
                        Produto
                    </button>
                    <button 
                        className={Styles.comboBtn}
                        onClick={() => handleOpenModal('combo')}
                    >
                        <IoAdd size={20} />
                        Combo/Kit
                    </button>
                </div>
            </div>

            <div className={Styles.filters}>
                <div className={Styles.searchBox}>
                    <IoSearch size={20} />
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
                <div className={Styles.categoryFilter}>
                    <IoFilter size={20} />
                    <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                        <option value="todos">Todas Categorias</option>
                        {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={`${Styles.produtosGrid} ${viewMode === 'list' ? Styles.listView : ''}`}>
                {produtosFiltrados.map(produto => (
                    <div key={produto.id} className={`${Styles.produtoCard} ${!produto.disponivel ? Styles.indisponivel : ''}`}>
                        <div className={Styles.produtoImagem}>
                            <img src={produto.imagemCustom || IMAGE_MAP[produto.imagem] || IMAGE_MAP['brigadeiro']} alt={produto.nome} />
                            {!produto.disponivel && <div className={Styles.indisponivelOverlay}>Indisponível</div>}
                        </div>
                        <div className={Styles.produtoInfo}>
                            <h3>{produto.nome}</h3>
                            <p>{produto.descricao}</p>
                            <div className={Styles.produtoMeta}>
                                <span className={Styles.preco}>R$ {produto.preco.toFixed(2)}</span>
                                <span className={Styles.categoria}>{produto.categoria}</span>
                            </div>
                        </div>
                        <div className={Styles.produtoActions}>
                            <button 
                                className={Styles.toggleBtn}
                                onClick={() => toggleDisponibilidade(produto.id)}
                            >
                                {produto.disponivel ? 'Desativar' : 'Ativar'}
                            </button>
                            <button 
                                className={Styles.editBtn}
                                onClick={() => handleOpenModal('produto', produto)}
                            >
                                <IoCreate size={16} />
                            </button>
                            <button 
                                className={Styles.deleteBtn}
                                onClick={() => handleDelete(produto.id, 'produto')}
                            >
                                <IoTrash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {combos.length > 0 && (
                <div className={Styles.combosSection}>
                    <h3>Combos e Kits</h3>
                    <div className={Styles.combosGrid}>
                        {combos.map(combo => (
                            <div key={combo.id} className={Styles.comboCard}>
                                <div className={Styles.comboInfo}>
                                    <h4>{combo.nome}</h4>
                                    <p>{combo.descricao}</p>
                                    <span className={Styles.comboPreco}>R$ {combo.preco.toFixed(2)}</span>
                                </div>
                                <div className={Styles.comboActions}>
                                    <button onClick={() => handleOpenModal('combo', combo)}>
                                        <IoCreate size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(combo.id, 'combo')}>
                                        <IoTrash size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showModal && (
                <div className={Styles.modalOverlay}>
                    <div className={Styles.modal}>
                        <div className={Styles.modalHeader}>
                            <h3>{editingItem ? 'Editar' : 'Adicionar'} {modalType === 'produto' ? 'Produto' : 'Combo/Kit'}</h3>
                            <button onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <div className={Styles.modalContent}>
                            <div className={Styles.formGroup}>
                                <label>Nome *</label>
                                <input
                                    type="text"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                />
                            </div>
                            
                            <div className={Styles.formRow}>
                                <div className={Styles.formGroup}>
                                    <label>Preço *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.preco}
                                        onChange={(e) => setFormData({...formData, preco: e.target.value})}
                                    />
                                </div>
                                {modalType === 'produto' && (
                                    <div className={Styles.formGroup}>
                                        <label>Categoria</label>
                                        <select
                                            value={formData.categoria}
                                            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                                        >
                                            {categorias.slice(0, -1).map(cat => (
                                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {modalType === 'produto' && (
                                <>
                                    <div className={Styles.formGroup}>
                                        <label>Upload de Imagem Personalizada</label>
                                        <ImageUploader 
                                            onImageSelect={(imageUrl) => setFormData({...formData, imagemCustom: imageUrl})}
                                            currentImage={formData.imagemCustom}
                                        />
                                    </div>
                                    <div className={Styles.formGroup}>
                                        <label>Ou escolha uma imagem da galeria</label>
                                        <select
                                            value={formData.imagem}
                                            onChange={(e) => setFormData({...formData, imagem: e.target.value, imagemCustom: null})}
                                        >
                                            <option value="">Selecione uma imagem</option>
                                            {imagensDisponiveis.map(img => (
                                                <option key={img} value={img}>{img.replace(/_/g, ' ')}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className={Styles.formGroup}>
                                <label>Descrição</label>
                                <textarea
                                    value={formData.descricao}
                                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                                    rows="3"
                                />
                            </div>

                            {modalType !== 'produto' && (
                                <div className={Styles.formGroup}>
                                    <label>Produtos do Combo</label>
                                    <div className={Styles.produtosList}>
                                        {produtos.map(produto => (
                                            <label key={produto.id} className={Styles.checkboxItem}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.produtos.includes(produto.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFormData({...formData, produtos: [...formData.produtos, produto.id]});
                                                        } else {
                                                            setFormData({...formData, produtos: formData.produtos.filter(id => id !== produto.id)});
                                                        }
                                                    }}
                                                />
                                                {produto.nome} - R$ {produto.preco.toFixed(2)}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={Styles.modalActions}>
                            <button className={Styles.cancelBtn} onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                            <button className={Styles.saveBtn} onClick={handleSave}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardapioManager;