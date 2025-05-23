import { BrowserRouter, Route, Routes } from "react-router-dom";
import AskPage from "../features/ai/page/ask-page";
import AnaliticaPage from "../features/analytics/page/page";
import LoginPage from "../features/auth/page/login/page-login";
import RegisterPage from "../features/auth/page/register/page";
import ClientesPage from "../features/clients/page/page";
import { FacturaProvider } from "../features/invoices/context/factura.context";
import PageDataTableFactura from "../features/invoices/page/page";
import CategoryPage from "../features/products/components/category/table-category";
import ProductosPage from "../features/products/components/table-productos/table-productos";
import { ProfitProvider } from "../features/profit/context/profit.context";
import { SettingsProvider } from "../features/settings/context/settings-context";
import SettingsPage from "../features/settings/page/page";
import Layout from "../layouts/layout";
import DashboardPage from "../pages/dashboard/page";

export const RoutesApp = () => {
  return (
    <SettingsProvider>
      <FacturaProvider>
        <ProfitProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/analitics" element={<AnaliticaPage />} />
                <Route path="/reportes" element={<PageDataTableFactura />} />
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/categorias" element={<CategoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/ask-llm" element={<AskPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProfitProvider>
      </FacturaProvider>
    </SettingsProvider>
  );
};
