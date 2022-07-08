import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Auth from "./pages/Auth";
import Roles from "./pages/Roles";
import MainLayout from "./layouts/Main";
import { useAuth } from "./contexts/Auth";
import SplashLayout from "./layouts/Splash";

import AuthProvider from "./contexts/Auth";
import RolesProvider from "./contexts/Roles";
import DarkModeProvider from "./contexts/DarkMode";
import NotificationProvider from "./contexts/Notifications";

interface IPageProps {
  protect?: boolean;
  children: JSX.Element;
  layout: typeof SplashLayout | typeof MainLayout;
}

function Page({ protect, children, layout }: IPageProps) {
  const Layout = layout;
  const location = useLocation();
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <strong data-testid="loading-page">Loading...</strong>
      </Layout>
    );
  } else if (!authenticated && protect) {
    return <Navigate to="/authenticate" state={{ from: location }} replace />;
  } else {
    return <Layout>{children}</Layout>;
  }

}

function AuthPage() {
  return (
    <SplashLayout>
      <Auth data-testid="auth-page" />
    </SplashLayout>
  );
}

function DevicesPage() {
  return (
    <Page layout={MainLayout} protect>
      <h2 data-testid="devices-page">Devices</h2>
    </Page>
  );
}

function AccountsPage() {
  return (
    <Page layout={MainLayout} protect>
      <h2 data-testid="accounts-page">Accounts</h2>
    </Page>
  );
}

function EmployeesPage() {
  return (
    <Page layout={MainLayout} protect>
      <h2 data-testid="employees-page">Employees</h2>
    </Page>
  );
}

function RolesPage() {
  return (
    <Page layout={MainLayout} protect>
      <RolesProvider>
        <Roles data-testid="roles-page" />
      </RolesProvider>
    </Page>
  );
}

function ManufacturingPage() {
  return (
    <Page layout={MainLayout} protect>
      <h2 data-testid="manufacturing-page">Manufacturing</h2>
    </Page>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <DarkModeProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/devices" replace />} />
            <Route path="/authenticate" element={<AuthPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/manufacturing" element={<ManufacturingPage />} />
          </Routes>
        </DarkModeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
