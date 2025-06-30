import { NavLink, useNavigate } from "react-router-dom"
import regalo from "../../assets/img/regalo.png"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

export const Menu = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                
                <NavLink to="/" className="navbar-brand">
                    <img src={regalo} alt="Product Manager Logo" width="30" height="30" className="d-inline-block align-text-top me-2" />
                    Product Manager
                </NavLink>
                
                {/* Botón para móviles (hamburguesa) */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenedor de enlaces que se colapsa */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> {/* ms-auto para alinear a la derecha */}
                        <li className="nav-item">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                aria-current="page"
                            >
                                Productos
                            </NavLink>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <NavLink 
                                    to="/my-products" 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                >
                                    Mis Productos
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="ms-auto">
                    {isAuthenticated ? (
                        <>
                            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
                            <button className="btn btn-outline-light" onClick={() => navigate('/register')}>Registro</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}