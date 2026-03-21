import { useEffect, useState } from "react";
import { getMyBookings, updateBookingStatus, deleteBooking } from "../../services/api-service";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function MyBookingsPage() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    //cargamos las reservas al montar el componente
    useEffect(() => {
        async function fetchBookings() {
            //si el usuario es host o dual, cargamos también las reservas recibidas
            const guestBookings = await getMyBookings();
            setBookings(guestBookings);
        }
        fetchBookings();
    }, []);

    //cancelar una reserva como guest
    async function handleCancel(bookingId) {
        await deleteBookingId(bookingId);
        //actualizamos el estado local sin recargar la pagina
        setBookings(bookings.map(b =>
            b.id === bookingId ? { ...b, status: "cancelled" } : b
        ));
    }

    //color del badge según el estado de la reserva
    function getStatusBadge(status) {
        const styles = {
            pending: { backgroundColor: '#fef3c7', color: '#92400e' },
            confirmed: { backgroundColor: '#d1fae5', color: '#065f46' },
            cancelled: { backgroundColor: '#d1fae5', color: '#065f46' },
        };
        const labels = {
            pending: 'Pendiente',
            confirmed: 'Confirmada',
            cancelled: 'Cancelada',
        };
        return (
            <span style={{
                ...styles[status],
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
            }}>
                {labels[status]}
            </span>
        );
    }
    return (
        <div className="py-4">
            <h2 className="fw-bold mb-4">Mis reservas</h2>

            {bookings.length === 0 && (
                <div className="text-center py-5">
                    <p style={{ color: '#888' }}>No tiene reservas todavía.</p>
                    <Link to="/" className="btn fw-bold text-white" style={{ backgroundColor: '#2563a8', borderRadius: '8px' }}>
                        Buscar alojamiento
                    </Link>
                </div>
            )}

            {bookings.map((bookings) => (
                <div key={bookings.id} className="card border-0 shadow-sm mb-3 p-3" style={{ borderRadius: '12px' }}>
                    <div className="d-flex gap-3 align-items-center">

                        {/* Foto de la propiedad */}
                        {bookings.property?.photos?.[0] && (
                            <img
                                src={bookings.property.photos[0]}
                                alt={bookings.property.title}
                                style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        )}

                        {/*Detalle de la reserva */}
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                                <h6 className="fw-bold mb-1">
                                    {bookings.property?.title || 'Propiedad no disponible'}
                                </h6>
                                {getStatusBadge(bookings.status)}
                            </div>
                            <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 4px 0' }}>
                                📍 {bookings.property?.location?.ria}
                            </p>
                            <p style={{ color: '#555', fontSize: '0.85rem', margin: '0 0 4px 0' }}>
                                📅 {new Date(bookings.checkIn).toLocaleDateString('es-ES')} → {new Date(bookings.checkOut).toLocaleDateString('es-ES')}
                            </p>
                            <p style={{ color: '#555', fontSize: '0.85rem', margin: 0 }}>
                                👥 {bookings.guests} huéspedes · 💶 {bookings.totalPrice} € total
                            </p>
                        </div>

                        {/* Botón cancelar — solo si está pendiente o confirmada */}
                        {bookings.status !== "cancelled" && (
                            <button
                                className="btn btn-sm"
                                style={{ border: '1px solid #dc3545', color: '#dc3545', borderRadius: '8px' }}
                                onClick={() => handleCancel(bookings.id)}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyBookingsPage;



