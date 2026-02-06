import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AutoLogout from "./components/AutoLogout";
import Layout from "./components/Layout";
import GenerareDocumente from "./components/GenerareDocumente";


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AutoLogout logoutMinutes={30}><Layout /></AutoLogout>}>
          <Route path="/generareDocument" element={<GenerareDocumente />} />
          {/* <Route path="/uploadDocumente" element={<UploadDocumente />} /> */}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}