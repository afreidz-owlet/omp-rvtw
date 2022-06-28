import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import MainLayout from "./layouts/Main";
import { useAuth } from "./contexts/Auth";
import SplashLayout from "./layouts/Splash";

function Protected({
  children,
  authenticated,
}: {
  children: JSX.Element;
  authenticated?: boolean;
}) {
  if (!authenticated) return <Navigate to="/authentication" replace />;

  return children;
}

export default function App() {
  const auth = useAuth();

  if (auth?.loading) return <figure data-testid="loading-page">Loading...</figure>;

  return (
    <Routes>
      <Route
        path="/authentication"
        element={
          <SplashLayout>
            <Auth data-testid="auth-page" />
          </SplashLayout>
        }
      />
      <Route path="/" element={<Navigate to="/devices" replace />} />
      <Route
        path="/devices"
        element={
          <Protected authenticated={!!auth?.user}>
            <MainLayout>
              <h2 data-testid="devices-page">Devices</h2>
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/accounts"
        element={
          <Protected authenticated={!!auth?.user}>
            <MainLayout>
              <h2 data-testid="accounts-page">Accounts</h2>
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/employees"
        element={
          <Protected authenticated={!!auth?.user}>
            <MainLayout>
              <h2 data-testid="employees-page">Employees</h2>
            </MainLayout>
          </Protected>
        }
      />
      <Route
        path="/manufacturing"
        element={
          <Protected authenticated={!!auth?.user}>
            <MainLayout>
              <h2 data-testid="manufacturing-page">Manufacturing</h2>
            </MainLayout>
          </Protected>
        }
      />
    </Routes>
  );
}
