import "@mantine/core/styles.css";
import { MantineProvider, Notification, ScrollArea } from "@mantine/core";
import { theme } from "./theme";
import { CreateApplicationManager } from "./features/applications/components/CreateApplicationManager";
import { useAuthStore } from "./features/auth/authStore";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "./components/MainLayout";
import { SetupPasswordPage } from "./pages/SetupPasswordPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  const token = useAuthStore((s) => s.token);

  return (
    <MantineProvider theme={theme}>
      {/* <Notification/> */}
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/setup-password" element={<SetupPasswordPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/create-application"
                element={<CreateApplicationManager />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
