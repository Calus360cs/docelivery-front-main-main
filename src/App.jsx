import React from 'react';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Header from './DoceLivery/Components/Header';
import './index.css';
import PaginaEntregador from './DoceLivery/paginas/PaginaEntregador';
import CadastroConfeiteiro from './DoceLivery/paginas/CadastroConfeiteiro';
import ConfeiteiroDashboard from './DoceLivery/paginas/ConfeiteiroDashboard';
import CadastroEntregador from './DoceLivery/paginas/CadastroEntregador';
import ApresentacaoProjeto from './DoceLivery/paginas/ApresentacaoProjeto';
import HomePage from './DoceLivery/paginas/HomePage';
import CadastroCliente from './DoceLivery/paginas/CadastroCliente';
import LoginEntregador from './DoceLivery/paginas/LoginEntregador';
import LoginCliente from './DoceLivery/paginas/LoginCliente';
import LoginConfeiteiro from './DoceLivery/paginas/LoginConfeiteiro';
import RecuperarSenha from './DoceLivery/paginas/RecuperarSenha';
import Pagamento from './DoceLivery/paginas/Pagamento';
import { CartProviderStore } from './DoceLivery/context/CartProviderStore';
import { FavoritesProvider } from './DoceLivery/context/FavoritesContext';
import { StoreProvider } from './DoceLivery/context/StoreContext';
import { DashboardProvider } from './DoceLivery/context/DashboardContext';
import { CardapioProvider } from './DoceLivery/context/CardapioContext';
import { LojaProvider } from './DoceLivery/context/LojaContext';
import LojaIndividual from './DoceLivery/paginas/LojaIndividual';
import PaginaCompleta from './DoceLivery/paginas/PaginaCompleta';
import PerfilCliente from './DoceLivery/paginas/PerfilCliente';
import OrderStatus from './DoceLivery/paginas/OrderStatus';
import LoginAdmin from './DoceLivery/paginas/LoginAdmin';
import AdminDashboard from './DoceLivery/paginas/AdminDashboard';


function App() {
  return (
    <DashboardProvider>
      <StoreProvider>
        <LojaProvider>
          <CardapioProvider>
            <FavoritesProvider>
              <CartProviderStore>
            <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PaginaCompleta />} />

          <Route exact path="/docelivery/cliente/Home-Page" element={<HomePage />} />
          <Route exact path="/docelivery/confeiteiro/Confeiteiro-Dashboard" element={<ConfeiteiroDashboard />} />
          <Route exact path="/docelivery/entregador/pagina-entregador" element={<PaginaEntregador />} />
          <Route exact path="/docelivery/confeiteiro/cadastro" element={<CadastroConfeiteiro />} />
          <Route exact path="/docelivery/entregador/cadastro-entregador" element={<CadastroEntregador />} />
          <Route exact path="/docelivery/entregador/login-entregador" element={<LoginEntregador />} />
          <Route exact path="/docelivery/home/apresentacao-projeto" element={<ApresentacaoProjeto />} />
          <Route exact path="/docelivery/cliente/cadastro-cliente" element={<CadastroCliente />} />
          <Route exact path="/docelivery/cliente/login-cliente" element={<LoginCliente />} />
          <Route exact path="/docelivery/confeiteiro/login-confeiteiro" element={<LoginConfeiteiro />} />
          <Route exact path="/docelivery/cliente/recuperar-senha" element={<RecuperarSenha />} />
          <Route exact path="/docelivery/cliente/pagamento" element={<Pagamento />} />
          <Route exact path="/docelivery/cliente/perfil" element={<PerfilCliente />} />
          <Route exact path="/docelivery/cliente/pedido-status" element={<OrderStatus />} />
          <Route exact path="/docelivery/loja/:lojaId" element={<LojaIndividual />} />
          <Route exact path="/docelivery/admin/login" element={<LoginAdmin />} />
          <Route exact path="/docelivery/admin/dashboard" element={<AdminDashboard />} />
          
          
            </Routes>
            </BrowserRouter>
              </CartProviderStore>
            </FavoritesProvider>
          </CardapioProvider>
        </LojaProvider>
      </StoreProvider>
    </DashboardProvider>
  )
}

export default App;

