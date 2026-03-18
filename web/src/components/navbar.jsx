    import { Link } from "react-router-dom";
    import { useAuth } from "../context/auth-context";
    import { useEffect, useRef } from "react";

    function Navbar(){
        const { user, userLogout } = useAuth();
        const dropDown = useRef();

        useEffect(() => {
            dropDown.current && new window.bootstrap.Dropdown(dropDown.current);
        }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
            <Link className="navbar-brand fs-3 fw-bold text-primary" to="/">
            Vagalume 🌊
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                <Link className="nav-link fw-bold" to="/buscar">Buscar alojamiento</Link>
                </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
                {!user ? (
                <>
                    <Link to="/login" className="btn btn-outline-primary fw-bold">Acceder</Link>
                    <Link to="/registro" className="btn btn-primary fw-bold">Registrarse</Link>
                </>
                ) : (
                <div className="dropdown">
                    
                    className="btn btn-outline-primary fw-bold dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    ref={dropDown}
                    <a>
                    {user.name}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item" to="/dashboard/reservas">Mis reservas</Link>
                    </li>
                    {(user.role === "host" || user.role === "dual") && (
                        <li>
                        <Link className="dropdown-item" to="/dashboard/propiedades">Mis propiedades</Link>
                        </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button className="dropdown-item text-danger" onClick={userLogout}>
                        Cerrar sesión
                        </button>
                    </li>
                    </ul>
                </div>
                )}
            </div>
            </div>
        </div>
        </nav>
    );
    }

    export default Navbar;
