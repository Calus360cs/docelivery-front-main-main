import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Formulario.module.css';
import logoImage from '../assests/img/doce_Livre_3.jpg';
import authService from '../services/authService';

const STEPS = ['Dados Pessoais', 'Endereço', 'Acesso'];

const CadastroCliente = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [cepLoading, setCepLoading] = useState(false);
    const [cepErro, setCepErro] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        email: '',
        senha: '',
        confirmarSenha: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCepChange = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, cep: e.target.value }));
        setCepErro('');

        if (cep.length === 8) {
            setCepLoading(true);
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();
                if (data.erro) {
                    setCepErro('CEP não encontrado.');
                } else {
                    setFormData(prev => ({
                        ...prev,
                        logradouro: data.logradouro || '',
                        bairro: data.bairro || '',
                        cidade: data.localidade || '',
                        estado: data.uf || '',
                    }));
                }
            } catch {
                setCepErro('Erro ao buscar CEP.');
            } finally {
                setCepLoading(false);
            }
        }
    };

    const nextStep = (e) => {
        e.preventDefault();
        setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        if (formData.senha !== formData.confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        setLoading(true);
        try {
            const { confirmarSenha, cep, logradouro, numero, complemento, bairro, cidade, estado, ...rest } = formData;
            const enderecoCompleto = `${logradouro}, ${numero}${complemento ? ', ' + complemento : ''}, ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;
            await authService.cadastroCliente({ ...rest, enderecoCompleto });
            alert('Cadastro realizado com sucesso!');
            navigate('/docelivery/cliente/login-cliente');
        } catch {
            setErro('Erro ao cadastrar. Verifique os dados ou tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Styles.form_container}>
            <div className={Styles.form_card}>
                <img src={logoImage} alt="DoceLivery Logo" className={Styles.form_logo} />
                <h2>Cadastre-se como Cliente</h2>

                {/* Indicador de etapas */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                    {STEPS.map((label, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: i <= step ? '#c71585' : '#e0e0e0',
                                color: i <= step ? '#fff' : '#999',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold', fontSize: '0.85rem', transition: 'all 0.3s'
                            }}>{i + 1}</div>
                            <span style={{ fontSize: '0.7rem', color: i === step ? '#c71585' : '#999' }}>{label}</span>
                        </div>
                    ))}
                </div>

                <form onSubmit={step === STEPS.length - 1 ? handleSubmit : nextStep}>

                    {/* ETAPA 1 - Dados Pessoais */}
                    {step === 0 && (
                        <>
                            <h3 className={Styles.form_card?.h3}>Dados Pessoais</h3>
                            <div className={Styles.form_group}>
                                <label>Nome Completo</label>
                                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                            </div>
                            <div className={Styles.form_row}>
                                <div className={Styles.form_group}>
                                    <label>CPF</label>
                                    <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" required />
                                </div>
                                <div className={Styles.form_group}>
                                    <label>Data de Nascimento</label>
                                    <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className={Styles.form_group}>
                                <label>Telefone</label>
                                <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" required />
                            </div>
                        </>
                    )}

                    {/* ETAPA 2 - Endereço */}
                    {step === 1 && (
                        <>
                            <h3>Endereço</h3>
                            <div className={Styles.form_row}>
                                <div className={Styles.form_group}>
                                    <label>CEP</label>
                                    <input
                                        type="text" name="cep" value={formData.cep}
                                        onChange={handleCepChange}
                                        placeholder="00000-000" maxLength={9} required
                                    />
                                    {cepLoading && <small style={{ color: '#c71585' }}>Buscando CEP...</small>}
                                    {cepErro && <small style={{ color: 'red' }}>{cepErro}</small>}
                                </div>
                                <div className={Styles.form_group}>
                                    <label>Estado</label>
                                    <input type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="UF" maxLength={2} required />
                                </div>
                            </div>
                            <div className={Styles.form_group}>
                                <label>Logradouro</label>
                                <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} placeholder="Rua, Avenida..." required />
                            </div>
                            <div className={Styles.form_row}>
                                <div className={Styles.form_group}>
                                    <label>Número</label>
                                    <input type="text" name="numero" value={formData.numero} onChange={handleChange} required />
                                </div>
                                <div className={Styles.form_group}>
                                    <label>Complemento</label>
                                    <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto, Bloco..." />
                                </div>
                            </div>
                            <div className={Styles.form_row}>
                                <div className={Styles.form_group}>
                                    <label>Bairro</label>
                                    <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} required />
                                </div>
                                <div className={Styles.form_group}>
                                    <label>Cidade</label>
                                    <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required />
                                </div>
                            </div>
                        </>
                    )}

                    {/* ETAPA 3 - Acesso */}
                    {step === 2 && (
                        <>
                            <h3>Dados de Acesso</h3>
                            <div className={Styles.form_group}>
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className={Styles.form_group}>
                                <label>Senha</label>
                                <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
                            </div>
                            <div className={Styles.form_group}>
                                <label>Confirme a Senha</label>
                                <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required />
                            </div>
                            {erro && <p style={{ color: 'red', marginBottom: '8px' }}>{erro}</p>}
                        </>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        {step > 0 && (
                            <button type="button" onClick={prevStep} className={Styles.form_button}
                                style={{ background: '#aaa' }}>
                                Voltar
                            </button>
                        )}
                        <button type="submit" className={Styles.form_button} disabled={loading}>
                            {step === STEPS.length - 1 ? (loading ? 'Cadastrando...' : 'Cadastrar') : 'Próximo'}
                        </button>
                    </div>
                </form>

                <p className={Styles.form_link}>
                    Já tem uma conta? <Link to="/docelivery/cliente/login-cliente">Faça login</Link>
                </p>
            </div>
        </div>
    );
};

export default CadastroCliente;
