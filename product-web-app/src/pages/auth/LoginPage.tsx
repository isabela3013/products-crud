import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { loginSuccess } from "../../redux/slices/authSlice";
import type { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authService.login({ email, password });
            dispatch(loginSuccess(response.data.token));
            navigate('/my-products');
        } catch (error) {
            toast.error("Ocurrió un error al iniciar sesíon. Intente nuevamente.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <form onSubmit={handleLogin} className="p-4 border rounded shadow-sm bg-white" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="mb-4 text-center">Iniciar Sesión</h2>

                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        id="emailInput"
                        className={`form-control`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="ejemplo@dominio.com"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="passwordInput"
                        className={`form-control`}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                >
                    Iniciar Sesión
                </button>

                <p className="text-center text-muted">
                    ¿No tienes una cuenta? <a href="/register" className="text-decoration-none">Regístrate aquí</a>
                </p>
            </form>
        </div>
    );
};

export default Login;