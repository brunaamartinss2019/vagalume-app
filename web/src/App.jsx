import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home-page";
import SearchPage from "./pages/search-page";
import PropertyDetailPage from "./pages/property-detail";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import Layout from "./components/layout";


function App() {
 
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/buscar" element={<SearchPage />} />
      <Route path="/propiedad/:id" element={<PropertyDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
    </Routes> 
    </Layout>
  );
}

export default App
