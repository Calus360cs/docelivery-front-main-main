import React, { createContext, useContext, useState } from 'react';

const LojaContext = createContext();

export const useLoja = () => {
    const context = useContext(LojaContext);
    if (!context) {
        throw new Error('useLoja deve ser usado dentro de LojaProvider');
    }
    return context;
};

export const LojaProvider = ({ children }) => {
    const [dadosLoja, setDadosLoja] = useState(() => {
        const saved = localStorage.getItem('dadosLoja');
        if (saved) return JSON.parse(saved);
        return {
            id: 1,
            nome: 'Doce Magia Confeitaria',
            endereco: 'Rua das Flores, 123 - Centro',
            telefone: '(11) 99999-9999',
            descricao: 'Confeitaria artesanal com mais de 10 anos de tradição. Especializada em bolos personalizados, cupcakes e doces finos.',
            imagem: '/src/DoceLivery/assests/img/ChatGPT Image_19.png',
            avaliacao: 4.8,
            totalAvaliacoes: 127,
            horarioFuncionamento: {
                segunda: '8:00 - 18:00',
                terca: '8:00 - 18:00',
                quarta: '8:00 - 18:00',
                quinta: '8:00 - 18:00',
                sexta: '8:00 - 18:00',
                sabado: '8:00 - 16:00',
                domingo: 'Fechado'
            }
        };
    });

    const atualizarDadosLoja = (novosDados) => {
        setDadosLoja(prev => {
            const updated = { ...prev, ...novosDados };
            localStorage.setItem('dadosLoja', JSON.stringify(updated));
            return updated;
        });
    };

    const atualizarHorarioFuncionamento = (novoHorario) => {
        setDadosLoja(prev => {
            const updated = {
                ...prev,
                horarioFuncionamento: { ...prev.horarioFuncionamento, ...novoHorario }
            };
            localStorage.setItem('dadosLoja', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <LojaContext.Provider value={{
            dadosLoja,
            atualizarDadosLoja,
            atualizarHorarioFuncionamento
        }}>
            {children}
        </LojaContext.Provider>
    );
};