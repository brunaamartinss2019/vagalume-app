import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useState } from "react";

function Navbar() { 
    const { user, userLogout } = useAuth();
    //const dropDown = useRef();
    const navigate = useNavigate();
    const [destino, setDestino] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [viajeros, setViajeros] = useState("");

    /*useEffect(() => {
        dropDown.current && new window.bootstrap.Dropdown(dropDown.current);
    }, []);*/

    function handleSearch(e) {
        e.preventDefault();

        const today = new Date().toISOString().split("T")[0];

        if (checkin && checkout < today) {
            alert("La fecha de entrada no puede ser anterior al dia de hoy");
            return;
        }
        if (checkin && checkout && checkout <= checkin) {
            alert("La fecha de salida debe ser posterior a la entrada");
            return;
        }
        const params = new URLSearchParams();
        if (destino) params.append("ria", destino);
        if (checkin) params.append("checkIn", checkin);
        if (checkout) params.append("checkOut", checkout);
        if (viajeros) params.append("capacity", viajeros);
        navigate(`/buscar?${params.toString()}`);
    }

    return (
        <nav className="navbar navbar-dark navbar-vagalume" style={{ backgroundColor: '#2563a8', borderBottom: '1px solid #1a4a8a' }}>
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between w-100">

                    {/* Logo */}
                    <Link to="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: '700', color: '#ffffff', textDecoration: 'none' }}>
                        🌊 Vagalume
                    </Link>

                    {/* Buscador */}
                    <form onSubmit={handleSearch} className="d-flex align-items-center" style={{
                        border: 'none',
                        borderRadius: '40px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                    }}>
                        <div className="px-4 py-3" style={{ borderRight: '1px solid #ddd', minWidth: '160px' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#333' }}>Destino</div>
                            <input
                                type="text"
                                placeholder="¿A qué Ría vas?"
                                value={destino}
                                onChange={(e) => setDestino(e.target.value)}
                                style={{ border: 'none', outline: 'none', fontSize: '1rem', width: '100%' }}
                            />
                        </div>
                        <div className="px-4 py-3" style={{ borderRight: '1px solid #ddd', minWidth: '130px' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#333' }}>Entrada</div>
                            <input
                                type="date"
                                value={checkin}
                                onChange={(e) => setCheckin(e.target.value)}
                                style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                            />
                        </div>
                        <div className="px-4 py-3" style={{ borderRight: '1px solid #ddd', minWidth: '130px' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#333' }}>Salida</div>
                            <input
                                type="date"
                                value={checkout}
                                onChange={(e) => setCheckout(e.target.value)}
                                style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                            />
                        </div>
                        <div className="px-4 py-3" style={{ minWidth: '120px' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#333' }}>Viajeros</div>
                            <input
                                type="number"
                                placeholder="Añade viajeros"
                                min="1"
                                value={viajeros}
                                onChange={(e) => setViajeros(e.target.value)}
                                style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%' }}
                            />
                        </div>
                        <button type="submit" style={{
                            backgroundColor: '#2563a8',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            margin: '6px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            🔍
                        </button>
                    </form>

                    {/* Usuario */}
                    <div className="d-flex align-items-center gap-3">
                        {!user ? (
                            <>
                                <Link to="/login" className="btn fw-bold" style={{ color: '#ffffff', border: '1px solid #ffffff', borderRadius: '20px' }}>Acceder</Link>
                                <Link to="/registro" className="btn fw-bold" style={{ backgroundColor: '#ffffff', color: '#2563a8', borderRadius: '20px' }}>Registrarse</Link>
                            </>
                        ) : (
                            <div className="dropdown">
                                <button
                                    className="btn fw-bold dropdown-toggle"
                                    style={{ border: '1px solid #ffffff', borderRadius: '20px', color: '#ffffff' }}
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    //ref={dropDown}
                                    >
                                
                                    {user.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/dashboard/mis-reservas">Mis reservas</Link>
                                    </li>
                                    {(user.role === "host" || user.role === "dual") && (
                                        <li>
                                            <Link className="dropdown-item" to="/dashboard/mis-propiedades">Mis propiedades</Link>
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



// import { Link } from "react-router-dom";
    // import { useAuth } from "../context/auth-context";
    // import { useEffect, useRef } from "react";

    //     const { user, userLogout } = useAuth();
    //     const dropDown = useRef();

    //     useEffect(() => {
    //         dropDown.current && new window.bootstrap.Dropdown(dropDown.current);
    //     }, []);
    // return (
    //     <nav className="navbar navbar-expand-lg navbar-vagalume shadow-sm">
    //     <div className="container">
    //         <Link className="navbar-brand navbar-brand-vagalume" to="/">
    //         🌊 Vagalume 
    //         </Link>

    //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    //         <span className="navbar-toggler-icon"></span>
    //         </button>

    //         <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav me-auto">
    //             <li className="nav-item">
    //             <Link className="nav-link nav-link-vagalume fw-bold" to="/buscar">Buscar alojamiento</Link>
    //             </li>
    //         </ul>

    //         <div className="d-flex align-items-center gap-3">
    //             {!user ? (
    //             <>
    //                 <Link to="/login" className="btn btn-outline-primary fw-bold">Acceder</Link>
    //                 <Link to="/registro" className="btn btn-primary fw-bold">Registrarse</Link>
    //             </>
    //             ) : (
    //             <div className="dropdown">
                    
    //                 className="btn btn-outline-primary fw-bold dropdown-toggle"
    //                 href="#"
    //                 role="button"
    //                 data-bs-toggle="dropdown"
    //                 ref={dropDown}
    //                 <a>
    //                 {user.name}
    //                 </a>
    //                 <ul className="dropdown-menu dropdown-menu-end">
    //                 <li>
    //                     <Link className="dropdown-item" to="/dashboard/reservas">Mis reservas</Link>
    //                 </li>
    //                 {(user.role === "host" || user.role === "dual") && (
    //                     <li>
    //                     <Link className="dropdown-item" to="/dashboard/propiedades">Mis propiedades</Link>
    //                     </li>
    //                 )}
    //                 <li><hr className="dropdown-divider" /></li>
    //                 <li>
    //                     <button className="dropdown-item text-danger" onClick={userLogout}>
    //                     Cerrar sesión
    //                     </button>
    //                 </li>
    //                 </ul>
    //             </div>
    //             )}
    //         </div>
    //         </div>
    //     </div>
    //     </nav>
    // );

    // export default Navbar;
