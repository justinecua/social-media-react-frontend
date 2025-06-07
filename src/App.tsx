import RootLayout from "./features/dashboard/pages/RootLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./features/dashboard/pages/Home";
import About from "./features/dashboard/pages/About";
import LoginPage from "./features/auth/pages/Login";
import { ThemeProvider } from "@/components/themes/theme-provider";
import "./index.css";
import RegisterPage from "./features/auth/pages/Register";
import ProfilePage from "./features/profile/pages/profile";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={null} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
        <Toaster position="bottom-right" />
      </RootLayout>
    </ThemeProvider>
  );
}

export default App;
