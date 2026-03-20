// src/pages/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from './Formulario.module.css';
import logoImage from '../assests/img/doce_Livre_3.jpg';

const LoginConfeiteiro = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/login/confeiteiro`;
      const response = await axios.post(API_URL, formData);

      const { token, nome } = response.data;

      // Salvar dados do usuário
      localStorage.setItem('userToken', token);
      localStorage.setItem('userType', 'confeiteiro');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('nomeConfeiteiro', nome);

      window.open('/docelivery/confeiteiro/Confeiteiro-Dashboard', '_blank');
      navigate('/');
    } catch (error) {
      // Fallback para desenvolvimento - permite login com qualquer email/senha
      if (!import.meta.env.VITE_API_BASE_URL || error.code === 'ERR_NETWORK') {
        console.warn('API não disponível, usando login de desenvolvimento');
        
        // Login de desenvolvimento
        localStorage.setItem('userToken', 'dev-token-' + Date.now());
        localStorage.setItem('userType', 'confeiteiro');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('nomeConfeiteiro', formData.email.split('@')[0]);
        localStorage.setItem('nomeLoja', 'Confeitaria Demo');
        
        window.open('/docelivery/confeiteiro/Confeiteiro-Dashboard', '_blank');
        navigate('/');
      } else {
        const errorMsg = error.response?.data || "Erro ao fazer login. Verifique suas credenciais.";
        alert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.form_container}>
      <div className={Styles.form_card}>
        <img src={logoImage} alt="DoceLivery Logo" className={Styles.form_logo} />
        <h2>Login</h2>
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
          <button type="submit" className={Styles.form_button} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className={Styles.form_link}>
          Não tem uma conta? <Link to="/docelivery/confeiteiro/cadastro">Cadastre-se</Link>
          <br /> Esqueceu sua senha? <Link to="/docelivery/cliente/recuperar-senha">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginConfeiteiro;