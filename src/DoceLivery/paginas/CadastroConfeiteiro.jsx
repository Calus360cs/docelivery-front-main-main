import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Formulario.module.css';
import logoImage from '../assests/img/doce_Livre_3.jpg';

const CadastroConfeiteiro = () => {
const [formData, setFormData] = useState({
    // Dados pessoais
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    
    // Dados da confeitaria
    nomeConfeitaria: '',
    cnpj: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    
    // Dados de acesso
    senha: '',
    confirmarSenha: '',
    
    // Termos
    aceitaTermos: false,
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validações
      if (formData.senha !== formData.confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }
      
      if (!formData.aceitaTermos) {
        alert('Você deve aceitar os termos de uso!');
        return;
      }
      
      // TODO: Integrar com API real
      // const response = await AuthService.cadastroConfeiteiro(formData);
      // localStorage.setItem('userToken', response.token);
      // localStorage.setItem('userType', 'confeiteiro');
      
      console.log('Dados de cadastro enviados:', formData);
      alert('Cadastro realizado com sucesso!');
      
      navigate('/docelivery/confeiteiro/login-confeiteiro');
    } catch (error) {
      alert('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.form_container}>
      <div className={Styles.form_card}>
        <img src={logoImage} alt="DoceLivery Logo" className={Styles.form_logo} />
        <h2>Cadastro de Confeiteiro</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Dados Pessoais */}
          <h3>Dados Pessoais</h3>
          
          <div className={Styles.form_group}>
            <label htmlFor="nome">Nome Completo *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={Styles.form_row}>
            <div className={Styles.form_group}>
              <label htmlFor="email">Email *</label>
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
              <label htmlFor="telefone">Telefone *</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>
          
          <div className={Styles.form_row}>
            <div className={Styles.form_group}>
              <label htmlFor="cpf">CPF *</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                required
              />
            </div>
            
            <div className={Styles.form_group}>
              <label htmlFor="dataNascimento">Data de Nascimento *</label>
              <input
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Dados da Confeitaria */}
          <h3>Dados da Confeitaria</h3>
          
          <div className={Styles.form_group}>
            <label htmlFor="nomeConfeitaria">Nome da Confeitaria *</label>
            <input
              type="text"
              id="nomeConfeitaria"
              name="nomeConfeitaria"
              value={formData.nomeConfeitaria}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={Styles.form_group}>
            <label htmlFor="cnpj">CNPJ (opcional)</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
            />
          </div>
          
          {/* Endereço */}
          <h3>Endereço</h3>
          
          <div className={Styles.form_row}>
            <div className={Styles.form_group}>
              <label htmlFor="cep">CEP *</label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
                required
              />
            </div>
            
            <div className={Styles.form_group}>
              <label htmlFor="endereco">Endereço *</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={Styles.form_row}>
            <div className={Styles.form_group}>
              <label htmlFor="numero">Número *</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={Styles.form_group}>
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={Styles.form_row}>
            <div className={Styles.form_group}>
              <label htmlFor="bairro">Bairro *</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={Styles.form_group}>
              <label htmlFor="cidade">Cidade *</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={Styles.form_group}>
            <label htmlFor="uf">UF *</label>
            <select
              id="uf"
              name="uf"
              value={formData.uf}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o estado</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="PR">Paraná</option>
              <option value="SC">Santa Catarina</option>
              <option value="BA">Bahia</option>
              <option value="GO">Goiás</option>
              <option value="PE">Pernambuco</option>
              <option value="CE">Ceará</option>
            </select>
          </div>
          
          {/* Dados de Acesso */}
          <h3>Dados de Acesso</h3>
          
          <div className={Styles.form_row}>
            <div className={Styles.form_group}>
              <label htmlFor="senha">Senha *</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>
            
            <div className={Styles.form_group}>
              <label htmlFor="confirmarSenha">Confirme a Senha *</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>
          </div>
          
          <div className={Styles.form_checkbox}>
            <input
              type="checkbox"
              id="aceitaTermos"
              name="aceitaTermos"
              checked={formData.aceitaTermos}
              onChange={handleChange}
              required
            />
            <label htmlFor="aceitaTermos">
              Aceito os <Link to="#">termos de uso</Link> e <Link to="#">política de privacidade</Link>
            </label>
          </div>
          
          <button type="submit" className={Styles.form_button} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
        <p className={Styles.form_link}>
          Já tem uma conta? <Link to="/docelivery/confeiteiro/login-confeiteiro">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default CadastroConfeiteiro;