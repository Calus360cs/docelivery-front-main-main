// src/Components/PerfilLoja.jsx

import React, { useState } from 'react';
import { IoSave, IoTime, IoImage, IoLocation, IoCall } from 'react-icons/io5';
import { useLoja } from '../context/LojaContext';
import ImageUploader from './ImageUploader';
import Styles from './PerfilLoja.module.css';

const PerfilLoja = () => {
    const { dadosLoja, atualizarDadosLoja, atualizarHorarioFuncionamento } = useLoja();
    const [formData, setFormData] = useState({
        nome: dadosLoja.nome,
        endereco: dadosLoja.endereco,
        telefone: dadosLoja.telefone,
        descricao: dadosLoja.descricao,
        imagem: dadosLoja.imagem
    });
    const [horarios, setHorarios] = useState(dadosLoja.horarioFuncionamento);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleHorarioChange = (dia, valor) => {
        setHorarios(prev => ({
            ...prev,
            [dia]: valor
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        atualizarDadosLoja(formData);
        atualizarHorarioFuncionamento(horarios);
        alert('Perfil da loja atualizado com sucesso!');
    };


    const diasSemana = [
        { key: 'segunda', label: 'Segunda-feira' },
        { key: 'terca', label: 'Terça-feira' },
        { key: 'quarta', label: 'Quarta-feira' },
        { key: 'quinta', label: 'Quinta-feira' },
        { key: 'sexta', label: 'Sexta-feira' },
        { key: 'sabado', label: 'Sábado' },
        { key: 'domingo', label: 'Domingo' }
    ];

    return (
        <div className={Styles.perfilContainer}>
            <div className={Styles.header}>
                <h1>Perfil da Loja</h1>
                <p>Gerencie as informações da sua confeitaria</p>
            </div>

            <form onSubmit={handleSubmit} className={Styles.perfilForm}>
                <div className={Styles.section}>
                    <h2>
                        <IoLocation size={20} />
                        Informações Básicas
                    </h2>
                    
                    <div className={Styles.formRow}>
                        <div className={Styles.formGroup}>
                            <label>Nome da Loja *</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Nome da sua confeitaria"
                                required
                            />
                        </div>
                        
                        <div className={Styles.formGroup}>
                            <label>Telefone *</label>
                            <input
                                type="tel"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder="(11) 99999-9999"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className={Styles.formGroup}>
                        <label>Endereço Completo *</label>
                        <input
                            type="text"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            placeholder="Rua, Número, Bairro, Cidade - Estado"
                            required
                        />
                    </div>
                    
                    <div className={Styles.formGroup}>
                        <label>Descrição da Loja</label>
                        <textarea
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Conte sobre sua confeitaria, especialidades e diferenciais..."
                        />
                    </div>
                </div>

                <div className={Styles.section}>
                    <h2>
                        <IoImage size={20} />
                        Imagem da Loja
                    </h2>
                    <ImageUploader 
                        onImageSelect={(imageUrl) => setFormData({...formData, imagem: imageUrl})}
                        currentImage={formData.imagem}
                    />
                </div>

                <div className={Styles.section}>
                    <h2>
                        <IoTime size={20} />
                        Horário de Funcionamento
                    </h2>
                    
                    <div className={Styles.horariosGrid}>
                        {diasSemana.map(dia => (
                            <div key={dia.key} className={Styles.horarioItem}>
                                <label>{dia.label}</label>
                                <input
                                    type="text"
                                    value={horarios[dia.key]}
                                    onChange={(e) => handleHorarioChange(dia.key, e.target.value)}
                                    placeholder="8:00 - 18:00 ou Fechado"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={Styles.formActions}>
                    <button type="submit" className={Styles.saveButton}>
                        <IoSave size={20} />
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PerfilLoja;