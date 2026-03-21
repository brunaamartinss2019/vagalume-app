import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home-page";
import SearchPage from "./pages/search-page";
import PropertyDetailPage from "./pages/property-detail";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import Layout from "./components/layout";
import ReservationPage from "./pages/reservation-page";
import { MyBookingsPage } from "./pages/dashboard";


function App() {
 
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/buscar" element={<SearchPage />} />
      <Route path="/propiedad/:id" element={<PropertyDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/reservar/:id" element={<ReservationPage />} />
      <Route path="/dashboard/mis-reservas" element={<MyBookingsPage />} />
    </Routes> 
    </Layout>
  );
}

export default App
