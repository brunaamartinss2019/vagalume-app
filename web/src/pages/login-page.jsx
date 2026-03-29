import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

function LoginPage() {
    const { register, handleSubmit, setError, formState: { errors }} = useForm({ mode: 'all' });
    const { userLogin } = useAuth();

    const handleUserLogin = async (credentials) => {
        try {
            await userLogin(credentials);
        } catch (error) {
            if (error.response?.status === 401) {
                setError('email', { type: 'custom', message: 'Email o contraseña incorrectos'});
            } 
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card border-0 shadow-sm p-4" style={{ width: '100%', maxWidth: '420px', borderRadius: '16px' }}>
                
                <div className="text-center mb-4">
                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#2563a8', fontWeight: '700' }}>
                        🌊 Vagalume
                    </h2>
                    <p className="text-muted">Inicia sesión para continuar</p>
                </div>

                <form onSubmit={handleSubmit(handleUserLogin)}>
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

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="••••••••"
                            {...register('password', { required: 'La contraseña es obligatoria' })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <div className="d-grid gap-2">
                        <button className="btn fw-bold text-white" type="submit" style={{ backgroundColor: '#2563a8', borderRadius: '8px' }}>
                            Iniciar sesión
                        </button>
                        <hr className="m-0" />
                        <p className="text-center text-muted mb-0">
                            ¿No tienes cuenta? <Link to="/registro" style={{ color: '#2563a8' }}>Regístrate</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;