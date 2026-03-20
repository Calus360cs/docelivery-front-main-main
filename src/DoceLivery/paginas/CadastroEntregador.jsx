import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Formulario.module.css'; 
import logoImage from '../assests/img/doce_Livre_3.jpg';
import ApiService from '../services/api';


const Cadastro_Entregador = () => {
    const navigate = useNavigate();
    // Estado atualizado com todos os campos necessários para o Entregador
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '', 
        cnh: '', 
        contato: '', 
        endereco: '', 
        cep: '', 
        veiculo: '', 
        placaVeiculo: '', 
        email: '',
        senha: '',
        confirmarSenha: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        /*if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }*/

        console.log(JSON.stringify(formData));

        var entregador = {
            nome: formData.nome,
            cpf : formData.cpf,
            cnh : formData.cnh,
            contato : formData.contato,
            endereco : formData.endereco,
            cep : formData.cep,
            veiculo : formData.veiculo,
            placaVeiculo : formData.placaVeiculo,
            email : formData.email
        };
        
        ApiService.post('/entregadores', entregador, {});

        console.log('Dados de cadastro do Entregador enviados:', formData);
        alert('Cadastro de Entregador realizado com sucesso!');
        navigate('/docelivery/entregador/login-entregador');
    };

    return (
        <div className={Styles.form_container}>
            <div className={Styles.form_card}>
                <img src={logoImage} alt="DoceLivery Logo" className={Styles.form_logo} />
                <h2>Cadastre-se como Entregador</h2>
                <form onSubmit={handleSubmit}>
                    
                    {/* Nome Completo */}
                    <div className={Styles.form_group}>
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* CPF */}
                    <div className={Styles.form_group}>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* CNH */}
                    <div className={Styles.form_group}>
                        <label htmlFor="cnh">Número da CNH</label>
                        <input
                            type="text"
                            id="cnh"
                            name="cnh"
                            value={formData.cnh}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Contato */}
                    <div className={Styles.form_group}>
                        <label htmlFor="contato">Telefone / Contato</label>
                        <input
                            type="tel"
                            id="contato"
                            name="contato"
                            value={formData.contato}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Endereço */}
                    <div className={Styles.form_group}>
                        <label htmlFor="endereco">Endereço (Rua, Número, Bairro)</label>
                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* CEP */}
                    <div className={Styles.form_group}>
                        <label htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={formData.cep}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Veículo */}
                    <div className={Styles.form_group}>
                        <label htmlFor="veiculo">Tipo de Veículo (Moto/Carro/Bicicleta)</label>
                        <input
                            type="text"
                            id="veiculo"
                            name="veiculo"
                            value={formData.veiculo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Placa do Veículo */}
                    <div className={Styles.form_group}>
                        <label htmlFor="placaVeiculo">Placa do Veículo</label>
                        <input
                            type="text"
                            id="placaVeiculo"
                            name="placaVeiculo"
                            value={formData.placaVeiculo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className={Styles.form_group}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Senha */}
                    <div className={Styles.form_group}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Confirme a Senha */}
                    <div className={Styles.form_group}>
                        <label htmlFor="confirmarSenha">Confirme a Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className={Styles.form_button}>
                        Cadastrar
                    </button>
                </form>
                
                <p className={Styles.form_link}>
                Já tem uma conta? <Link to="/docelivery/entregador/login-entregador">Faça login</Link>
                </p>
            </div>
        </div>
    );
}

export default Cadastro_Entregador;