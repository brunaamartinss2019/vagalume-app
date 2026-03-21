import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { register as registerUser } from '../services/api-service';

function RegisterPage() {
    // register lo renombramos a registerUser para no confundirlo con el register de react-hook-form
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({ mode: 'all' });
    const navigate = useNavigate();

    const handleUserRegister = async (data) => {
        try {
            // llamamos a la API para crear el usuario
            await registerUser(data);
            reset();
            // después del registro redirigimos al login
            navigate('/login');
        } catch (error) {
            // error 400 — validaciones del servidor
            if (error.response?.status === 400) {
                const serverErrors = error.response?.data?.errors;
                if (serverErrors) {
                    Object.keys(serverErrors).forEach((inputName) => {
                        setError(inputName, { type: 'custom', message: serverErrors[inputName] });
                    });
                }
            }
            // error 409 — email ya registrado
            if (error.response?.status === 409) {
                setError('email', { type: 'custom', message: 'Este email ya está registrado' });
            }
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            {/* Card centrada igual que el login */}
            <div className="card border-0 shadow-sm p-4" style={{ width: '100%', maxWidth: '420px', borderRadius: '16px' }}>

                {/* Logo */}
                <div className="text-center mb-4">
                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#2563a8', fontWeight: '700' }}>
                        🌊 Vagalume
                    </h2>
                    <p className="text-muted">Crea tu cuenta</p>
                </div>

                <form onSubmit={handleSubmit(handleUserRegister)}>

                    {/* Nombre */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Nombre</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Tu nombre"
                            {...register('name', { required: 'El nombre es obligatorio' })}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="tu@email.com"
                            {...register('email', { required: 'El email es obligatorio' })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="••••••••"
                            {...register('password', { required: 'La contraseña es obligatoria' })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    {/* Rol — importante para Vagalume, define qué puede hacer el usuario */}
                    <div className="mb-4">
                        <label className="form-label fw-semibold">¿Qué quieres hacer?</label>
                        <select
                            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                            {...register('role', { required: 'Selecciona un rol' })}
                        >
                            <option value="">Selecciona...</option>
                            <option value="guest">Buscar alojamiento</option>
                            <option value="host">Publicar mi propiedad</option>
                            <option value="dual">Las dos cosas</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn fw-bold text-white" type="submit" style={{ backgroundColor: '#2563a8', borderRadius: '8px' }}>
                            Crear cuenta
                        </button>
                        <hr className="m-0" />
                        {/* Link al login para usuarios que ya tienen cuenta */}
                        <p className="text-center text-muted mb-0">
                            ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#2563a8' }}>Inicia sesión</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;