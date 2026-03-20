// src/pages/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Formulario.module.css';
import logoImage from '../assests/img/doce_Livre_3.jpg';

const LoginEntregador = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    /*
    Fazer algo como
      ApiService.post('/entregadores', entregador, {});
    */

    // Lógica de simulação de login
    if (formData.email && formData.senha) {
      const nomeEntregador = formData.email.split('@')[0].replace(/[._]/g, ' ');
      
      // Salva os dados no localStorage
      localStorage.setItem('userToken', 'simulated_entregador_token');
      localStorage.setItem('userType', 'entregador');
      localStorage.setItem('nomeEntregador', nomeEntregador);
      localStorage.setItem('veiculo', 'Veículo não informado');

      window.open('/docelivery/entregador/pagina-entregador', '_blank');
      navigate('/');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className={Styles.form_container}>
      <div className={Styles.form_card}>
        <img src={logoImage} alt="DoceLivery Logo" className={Styles.form_logo} />
        <h2>Login Entregador</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className={Styles.form_button}>
            Entrar
          </button>
        </form>
        <p className={Styles.form_link}>
          Não tem uma conta? <Link to="/docelivery/entregador/cadastro-entregador">Cadastre-se</Link>
          <br /> Esqueceu sua senha? <Link to="/docelivery/cliente/recuperar-senha">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};


export default LoginEntregador;