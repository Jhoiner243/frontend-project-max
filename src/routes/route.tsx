import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "../components/ui/custom/error-element";
import AskPage from "../features/ai/page/ask-page";
import AnaliticaPage from "../features/analytics/page/page";
import LoginPage from "../features/auth/page/login/page-login";
import RegisterPage from "../features/auth/page/register/page";
import ClientesPage from "../features/clients/page/page";
import ProximamentePage from "../features/data/components/principal";
import EditPageInvoices from "../features/invoices/components/ui/principal-edit";
import { InvoiceSkeleton } from "../features/invoices/components/ui/skeleton-visualizer";
import { FacturaProvider } from "../features/invoices/context/factura.context";
import PageDataTableFactura from "../features/invoices/page/page";
import CategoryPage from "../features/products/components/category/table-category";
import ProductosPage from "../features/products/components/table-productos/table-productos";
import { ProfitProvider } from "../features/profit/context/profit.context";
import RegisterEntityManager from "../features/setps-entidades/componentes/ui/register-entity-manager";
import EntityDetailsPage from "../features/setps-entidades/componentes/ui/successfull-regiter";
import HomePage from "../features/setps-entidades/page/page-steps";
import { SettingsProvider } from "../features/settings/context/settings-context";
import SettingsPage from "../features/settings/page/page";
import FillstepLanding from "../landing/page/page";
import Layout from "../layouts/layout";
import DashboardPage from "../pages/dashboard/page";

export const RoutesApp = () => {
  return (
    <SettingsProvider>
      <FacturaProvider>
        <ProfitProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<FillstepLanding />}
                errorElement={<ErrorPage />}
              />
              <Route path="/select-step-entity" element={<HomePage />} />
              //Registro de entidad
              <Route
                path="/registro-entidad"
                element={<RegisterEntityManager />}
                errorElement={<ErrorPage />}
              />
              <Route path="/entidad/:id" element={<EntityDetailsPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Layout />} errorElement={<ErrorPage />}>
                <Route path="/dashboard" index element={<DashboardPage />} />
                <Route
                  path="/pedidos-register"
                  element={<ProximamentePage />}
                />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/analitics" element={<AnaliticaPage />} />
                <Route path="/reportes" element={<PageDataTableFactura />}>
                  <Route
                    path="edit-data/:id"
                    element={<EditPageInvoices />}
                    loader={InvoiceSkeleton}
                  />
                </Route>
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/categorias" element={<CategoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/ask-llm" element={<AskPage />} />
                <Route
                  path="/edit-data/:id"
                  element={<EditPageInvoices />}
                  loader={InvoiceSkeleton}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProfitProvider>
      </FacturaProvider>
    </SettingsProvider>
  );
};
