import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/Main";
import SplashLayout from "./layouts/Splash";

import Auth from "./Pages/Auth";

function MainPage(component: JSX.Element) {
  return <MainLayout>{component}</MainLayout>;
}

function SplashPage(component: JSX.Element) {
  return <SplashLayout>{component}</SplashLayout>
}

export default function App() {
  return (
    <Routes>
      <Route path="/authentication" element={SplashPage(<Auth/>)} />
      <Route path="/" element={<Navigate to="/devices" />} />
      <Route path="/devices" element={MainPage(<h2>Devices</h2>)} />
      <Route path="/accounts" element={MainPage(<h2>Accounts</h2>)} />
      <Route path="/employees" element={MainPage(<h2>Employees</h2>)} />
      <Route path="/manufacturing" element={MainPage(<h2>Manufacturing</h2>)} />
    </Routes>
  );
}
