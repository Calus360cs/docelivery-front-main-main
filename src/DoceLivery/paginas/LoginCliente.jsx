import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Formulario.module.css';
import logoImage from '../assests/img/doce_Livre_3.jpg';
import authService from '../services/authService';

const LoginCliente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await authService.loginCliente(formData.email, formData.senha);
      navigate('/docelivery/cliente/Home-Page');
    } catch (error) {
      setErro('Email ou senha inválidos.');
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
          {erro && <p style={{ color: 'red', marginBottom: '8px' }}>{erro}</p>}
          <button type="submit" className={Styles.form_button} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className={Styles.form_link}>
          Não tem uma conta? <Link to="/docelivery/cliente/cadastro-cliente">Cadastre-se</Link>
          <br /> Esqueceu sua senha? <Link to="/docelivery/cliente/recuperar-senha">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCliente;