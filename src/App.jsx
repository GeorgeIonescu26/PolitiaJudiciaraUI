import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AutoLogout from "./components/AutoLogout";
import Layout from "./components/Layout";
import GenerareDocumente from "./components/GenerareDocumente";


export default function App() {
  return (
    <Routes>
      {/* 1. Ruta de Login (fără Sidebar) */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. Zona cu Sidebar (Layout) */}
      {/* Am scos comentariul de pe Layout pentru a permite afișarea Sidebar-ului */}
      <Route element={<Layout />}> 
          <Route path="/generareDocumente" element={<GenerareDocumente />} />
          <Route path="/uploadDocumente" element={<div style={{color: 'white'}}>Pagina Upload</div>} />
      </Route>

      {/* 3. Redirecționare Safe */}
      <Route path="*" element={<Navigate to="/generareDocumente" replace />} /> 
    </Routes>
  );
}