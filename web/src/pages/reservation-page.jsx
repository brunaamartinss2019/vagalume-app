import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProperty, createBooking } from "../services/api-service";

function ReservationPage() {
    //obtenemos el id de la propiedad de la URL
    const { id } = useParams();
    const navigate = useNavigate();

    //Estado para guardar los datos de la propidad
    const [property, setProperty] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const { register, handleSubmit, watch, formState: { errors }} = useForm({ mode: 'all'});
    //cargamos la propiedad para mostrar el precio y los detalles
    useEffect(() => {
        async function fetchProperty() {
            const data = await getProperty(id);
                setProperty(data);
            }
            fetchProperty();
        }, [id]);

        //calculamos el precio total en tiempo real cuando cambian las fechas
        const checkIn = watch("checkIn");
        const checkOut = watch("checkOut");

        useEffect(() => {
            if (checkIn && checkOut && property) {
                //calculamos el numero de noches entre check.in y check-out
                const nights = Math.ceil(
                    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
                );
                if (nights > 0) {
                    setTotalPrice(nights * property.price);
                } else {
                    setTotalPrice(0);
                } 
            }
        }, [checkIn, checkOut, property]);

        const handleReservation = async (data) => {
            try {
                await createBooking({
                    property: id,
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    guests: Number(data.guests),
                    totalPrice,
                });
                //Redirigimos al dashboard de reserva tras confirmar
                navigate("/dashboard/mis-reservas");
            } catch (error) {
                console.error("Error al crear la reserva", error);
            }
        }

        if (!property) return <></>;

        return(
         <div className="d-flex justify-content-center align-items-center py-5">
            <div className="card border-0 shadow-sm p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px' }}>

                {/* Resumen de la propiedad */}
                <div className="d-flex gap-3 mb-4 align-items-center">
                    <img
                        src={property.photos?.[0]}
                        alt={property.title}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div>
                        <h6 className="fw-bold mb-0">{property.title}</h6>
                        <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                            {property.location?.ria}
                        </p>
                        <p style={{ color: '#2563a8', fontWeight: '700', margin: 0 }}>
                            {property.price} € / noche
                        </p>
                    </div>
                </div>

                <hr />

                <h5 className="fw-bold mb-3">Detalles de tu reserva</h5>

                <form onSubmit={handleSubmit(handleReservation)}>

                    {/* Check-in */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Fecha de entrada</label>
                        <input
                            type="date"
                            className={`form-control ${errors.checkIn ? 'is-invalid' : ''}`}
                            {...register('checkIn', { required: 'La fecha de entrada es obligatoria' })}
                        />
                        {errors.checkIn && <div className="invalid-feedback">{errors.checkIn.message}</div>}
                    </div>

                    {/* Check-out */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Fecha de salida</label>
                        <input
                            type="date"
                            className={`form-control ${errors.checkOut ? 'is-invalid' : ''}`}
                            {...register('checkOut', { required: 'La fecha de salida es obligatoria' })}
                        />
                        {errors.checkOut && <div className="invalid-feedback">{errors.checkOut.message}</div>}
                    </div>

                    {/* Número de huéspedes */}
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Número de huéspedes</label>
                        <input
                            type="number"
                            min="1"
                            max={property.capacity}
                            className={`form-control ${errors.guests ? 'is-invalid' : ''}`}
                            {...register('guests', {
                                required: 'El número de huéspedes es obligatorio',
                                min: { value: 1, message: 'Mínimo 1 huésped' },
                                max: { value: property.capacity, message: `Máximo ${property.capacity} huéspedes` }
                            })}
                        />
                        {errors.guests && <div className="invalid-feedback">{errors.guests.message}</div>}
                    </div>

                    {/* Precio total calculado */}
                    {totalPrice > 0 && (
                        <div className="alert" style={{ backgroundColor: '#f0f5ff', border: '1px solid #2563a8', borderRadius: '8px' }}>
                            <p className="mb-0" style={{ color: '#2563a8', fontWeight: '700' }}>
                                Total: {totalPrice} €
                            </p>
                            <p className="mb-0" style={{ color: '#888', fontSize: '0.85rem' }}>
                                {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} noches × {property.price} €
                            </p>
                        </div>
                    )}

                    <div className="d-grid mt-3">
                        <button
                            className="btn fw-bold text-white"
                            type="submit"
                            style={{ backgroundColor: '#2563a8', borderRadius: '8px', padding: '12px' }}
                        >
                            Confirmar reserva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReservationPage;