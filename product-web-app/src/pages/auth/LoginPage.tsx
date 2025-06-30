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
        <div className="container mt-4">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    className="form-control mb-2"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="form-control mb-2"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;