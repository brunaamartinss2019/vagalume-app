import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProfile, login, logout } from "../services/api-service";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const user = await getProfile();
                setUser(user);
            } catch(err) {
                navigate("/login");
            }
        }
        fetchProfile();
    }, []);

    async function userLogin(credentials) {
        const user = await login(credentials);
        setUser(user);
        navigate("/");
    }

    async function userLogout() {
        await logout();
        setUser(null);
        navigate("/login");
    }

    if (
        user === null &&
    location.pathname !== "/login" &&
    location.pathname !== "/registro"
  ) {
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout }}>
        {children}
    </AuthContext.Provider>
  );
}
export function useAuth(){
    return useContext(AuthContext);
}