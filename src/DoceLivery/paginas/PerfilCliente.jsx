import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import Styles from './Formulario.module.css';
import logoImage from '../assests/img/doce_Livre_3.jpg';

const PerfilCliente = () => {
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('clientProfile');
    if (saved) return JSON.parse(saved);
    return {
      nome: localStorage.getItem('nomeCliente') || '',
      email: localStorage.getItem('userEmail') || '',
      telefone: '',
      preferenciasDoces: {
        bolos: false,
        cupcakes: false,
        brigadeiros: false,
        tortas: false,
        churros: false,
        mousses: false,
        docinhos: false,
        brownies: false
      },
      restricoesAlimentares: {
        semGluten: false,
        semLactose: false,
        vegano: false,
        diabetico: false,
        semAcucar: false,
        semOvos: false,
        semNozes: false
      }
    };
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (category, preference) => {
    setProfileData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [preference]: !prev[category][preference]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Salvar no localStorage
      localStorage.setItem('clientProfile', JSON.stringify(profileData));
      localStorage.setItem('nomeCliente', profileData.nome);
      
      alert('Perfil atualizado com sucesso!');
      navigate('/docelivery/cliente/Home-Page');
    } catch (error) {
      alert('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.form_container}>
      <div className={Styles.form_card}>
        <button 
          className={Styles.back_btn}
          onClick={() => navigate('/docelivery/cliente/Home-Page')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        
        <img src={logoImage} alt="DoceLivery Logo" className={Styles.form_logo} />
        <h2><FontAwesomeIcon icon={faUser} /> Meu Perfil</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Dados Pessoais */}
          <h3>Dados Pessoais</h3>
          
          <div className={Styles.form_group}>
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={profileData.nome}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={Styles.form_row}>
            <div className={Styles.form_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={Styles.form_group}>
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={profileData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
          
          {/* Preferências de Doces */}
          <h3>🍰 Minhas Preferências</h3>
          <div className={Styles.preferences_grid}>
            {Object.entries(profileData.preferenciasDoces).map(([key, value]) => {
              const labels = {
                bolos: '🎂 Bolos',
                cupcakes: '🧁 Cupcakes',
                brigadeiros: '🍫 Brigadeiros',
                tortas: '🥧 Tortas',
                churros: '🥨 Churros',
                mousses: '🍮 Mousses',
                docinhos: '🍬 Docinhos',
                brownies: '🍩 Brownies',
              };
              return (
                <label key={key} className={`${Styles.checkbox_label} ${value ? Styles.checkbox_active : ''}`}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePreferenceChange('preferenciasDoces', key)}
                  />
                  <span>{labels[key] || key}</span>
                </label>
              );
            })}
          </div>
          
          {/* Restrições Alimentares */}
          <h3>🚫 Restrições Alimentares</h3>
          <div className={Styles.preferences_grid}>
            {Object.entries(profileData.restricoesAlimentares).map(([key, value]) => (
              <label key={key} className={Styles.checkbox_label}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handlePreferenceChange('restricoesAlimentares', key)}
                />
                <span>
                  {key === 'semGluten' && 'Sem Glúten'}
                  {key === 'semLactose' && 'Sem Lactose'}
                  {key === 'vegano' && 'Vegano'}
                  {key === 'diabetico' && 'Diabético'}
                  {key === 'semAcucar' && 'Sem Açúcar'}
                  {key === 'semOvos' && 'Sem Ovos'}
                  {key === 'semNozes' && 'Sem Nozes'}
                </span>
              </label>
            ))}
          </div>
          
          <button type="submit" className={Styles.form_button} disabled={loading}>
            <FontAwesomeIcon icon={faSave} />
            {loading ? ' Salvando...' : ' Salvar Perfil'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PerfilCliente;