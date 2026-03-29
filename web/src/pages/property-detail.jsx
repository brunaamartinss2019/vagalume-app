import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProperty, getPropertyReviews } from "../services/api-service";
import { useAuth } from "../context/auth-context";

function PropertyDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const propertyData = await getProperty(id);
            setProperty(propertyData);

            const reviewsData = await getPropertyReviews(id);
            setReviews(reviewsData);
        }
        fetchData();
    }, [id]);

    if (!property) return <></>;

    function handleReservar() {
        if (user) {
            navigate(`/reservar/${id}`);
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="py-4">

            <h1 className="fw-bold mb-1">{property.title}</h1>
            <p style={{ color: '#666' }}>
                📍 {property.location?.ria} — {property.location?.address}
            </p>

            <div className="row g-2 mb-4" style={{ height: '400px' }}>
                <div className="col-6 h-100">
                    <img
                        src={property.photos?.[0]}
                        alt={property.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 0 0 12px' }}
                    />
                </div>
                <div className="col-6 h-100 d-flex flex-column gap-2">
                    {property.photos?.[1] && (
                        <img
                            src={property.photos[1]}
                            alt={property.title}
                            style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius: '0 12px 0 0' }}
                        />
                    )}
                    {property.photos?.[2] && (
                        <img
                            src={property.photos[2]}
                            alt={property.title}
                            style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius: '0 0 12px 0' }}
                        />
                    )}
                </div>
            </div>

            <div className="row g-4">

                <div className="col-md-7">

                    <div className="d-flex gap-3 mb-3" style={{ color: '#555' }}>
                        <span>👥 {property.capacity} huéspedes</span>
                        <span>🏠 {property.type === 'entire' ? 'Alojamiento completo' : 'Habitación'}</span>
                        {property.rating > 0 && <span>⭐ {property.rating.toFixed(1)}</span>}
                    </div>

                    <hr />

                    <h5 className="fw-bold mt-3">Sobre este alojamiento</h5>
                    <p style={{ color: '#444', lineHeight: '1.7' }}>{property.description}</p>

                    <hr />

                    <div className="d-flex align-items-center gap-3 my-3">
                        <img
                            src={property.host?.avatar}
                            alt={property.host?.name}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                            <p className="fw-bold mb-0">Anfitrión: {property.host?.name}</p>
                            <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>{property.host?.bio}</p>
                        </div>
                    </div>

                    <hr />

                    <h5 className="fw-bold mt-3">
                        ⭐ {reviews.length > 0 ? property.rating?.toFixed(1) : 'Sin valoraciones'} · {reviews.length} reseñas
                    </h5>

                    {reviews.length === 0 && (
                        <p style={{ color: '#888' }}>Todavía no hay reseñas para este alojamiento.</p>
                    )}

                    {reviews.map((review) => (
                        <div key={review.id} className="mb-3">
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <img
                                    src={review.author?.avatar}
                                    alt={review.author?.name}
                                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <div>
                                    <p className="fw-bold mb-0" style={{ fontSize: '0.9rem' }}>{review.author?.name}</p>
                                    <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>
                                        {'⭐'.repeat(review.rating)}
                                    </p>
                                </div>
                            </div>
                            <p style={{ color: '#444', fontSize: '0.9rem' }}>{review.comment}</p>
                            <hr />
                        </div>
                    ))}
                </div>

                <div className="col-md-5">
                    <div className="card border-0 shadow p-4 sticky-top" style={{ borderRadius: '16px', top: '20px' }}>
                        
                        <p className="mb-3">
                            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2563a8' }}>
                                {property.price} €
                            </span>
                            <span style={{ color: '#888', fontSize: '0.9rem' }}> / noche</span>
                        </p>

                        <button
                            className="btn fw-bold text-white w-100"
                            style={{ backgroundColor: '#2563a8', borderRadius: '8px', padding: '12px' }}
                            onClick={handleReservar}
                        >
                            Reservar
                        </button>

                        {!user && (
                            <p className="text-center text-muted mt-2" style={{ fontSize: '0.85rem' }}>
                                Necesitas <a href="/login" style={{ color: '#2563a8' }}>iniciar sesión</a> para reservar
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetailPage;