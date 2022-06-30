import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import MainLayout from "./layouts/Main";
import { useAuth } from "./contexts/Auth";
import SplashLayout from "./layouts/Splash";

import AuthProvider from "./contexts/Auth";
import DarkModeProvider from "./contexts/DarkMode";
import NotificationProvider from "./contexts/Notifications";

interface IPageProps {
  protect?: boolean;
  children: JSX.Element;
  layout: typeof SplashLayout | typeof MainLayout;
}

function Page({ protect, children, layout }: IPageProps) {
  const Layout = layout;
  const { authenticated, loading } = useAuth();
  if (loading)
    return (
      <Layout>
        <strong>Loading...</strong>
      </Layout>
    );
  if (!authenticated && protect) return <Navigate to="/authenticate" replace />;

  return <Layout>{children}</Layout>;
}

function AuthPage() {
  return (
    <Page layout={SplashLayout}>
      <Auth data-testid="auth-page" />
    </Page>
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
      <h2 data-testid="roles-page">Roles</h2>
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
