import { useState } from "react";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/authSlice";

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const Register = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = (): boolean => {
        const { firstName, lastName, email, password } = formData;

        if (!firstName.trim()) {
            toast.error("El nombre es requerido");
            return false;
        }

        if (!lastName.trim()) {
            toast.error("El apellido es requerido");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("Correo electrónico inválido");
            return false;
        }

        const errors = validatePassword(password);

        if (errors.length > 0) {
            toast.error(errors.join("\n"));
            return false;
        }

        return true;
    };

    const validatePassword = (password: string): string[] => {
        const errors: string[] = [];

        if (password.length < 6) {
            errors.push("La contraseña debe tener al menos 6 caracteres.");
        }

        if (!/[a-z]/.test(password)) {
            errors.push("Debe tener al menos una letra minúscula.");
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Debe tener al menos una letra mayúscula.");
        }

        if (!/[^a-zA-Z0-9]/.test(password)) {
            errors.push("Debe tener al menos un carácter especial.");
        }

        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("submit")
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await authService.register(formData);
            
            if (response.status === 200) {
                toast.success("Registro exitoso");
                // redirect or clear form here if needed
                const { email, password } = formData;
                const responseLogin = await authService.login({email, password});
                dispatch(loginSuccess(responseLogin.data.token));
                navigate('/my-products');
            } else {
                const errors = response.data;
                const messages = Array.isArray(errors)
                    ? errors.map(err => err.description)
                    : ["Ocurrió un error inesperado"];
                messages.forEach(msg => toast.error(msg));
            }
        } catch (err) {
            toast.error("Error al registrar usuario");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-100 p-4 border rounded shadow-sm bg-white">
                <h2 className="mb-3">Registro</h2>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    )
}

export default Register;