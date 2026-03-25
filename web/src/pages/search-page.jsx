import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProperties } from "../services/api-service";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Convertimos los parámetros de la URL (?ria=Aldan...) en objeto
        const params = Object.fromEntries(searchParams.entries());

        async function fetchProperties() {
            setLoading(true);
            try {
                const data = await getProperties(params);
                setProperties(data);
            } catch (error) {
                console.error("Error al buscar:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProperties();
    }, [searchParams]);

    return (
        <div className="container py-5">
            <h2 className="mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Resultados en {searchParams.get("ria") || "las Rías Baixas"}
            </h2>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Buscando tu refugio ideal...</p>
                </div>
            ) : (
                <div className='row row-cols-1 row-cols-md-3 g-4'>
                    {properties.length > 0 ? (
                        properties.map((property) => (
                            <div key={property.id} className='col'>
                                <Link to={`/propiedad/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card h-100 border-0 shadow-sm property-card">
                                        
                                        {/* Foto */}
                                        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0', height: '220px' }}>
                                            {property.photos?.length > 0 && (
                                                <img
                                                    src={property.photos[0]}
                                                    alt={property.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                                    className="property-img"
                                                />
                                            )}
                                            {/* Badge Ría */}
                                            <span style={{
                                                position: 'absolute', top: '12px', left: '12px',
                                                backgroundColor: '#2563a8', color: 'white',
                                                padding: '4px 10px', borderRadius: '20px',
                                                fontSize: '0.75rem', fontWeight: '600'
                                            }}>
                                                {property.location?.ria}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="card-body px-2 pt-3">
                                            <h5 className="card-title fw-bold mb-1" style={{ fontSize: '1rem' }}>
                                                {property.title}
                                            </h5>
                                            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>
                                                {property.location?.address}
                                            </p>
                                            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '12px' }}>
                                                👥 {property.capacity} huéspedes · 🏠 {property.type === 'entire' ? 'Completo' : 'Habitación'}
                                            </p>

                                            {/* Rating */}
                                            {property.rating > 0 && (
                                                <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                                                    ⭐ {property.rating.toFixed(1)}
                                                </p>
                                            )}

                                            {/* Precio */}
                                            <p style={{ margin: '0', fontWeight: '700', fontSize: '1.1rem', color: '#2563a8' }}>
                                                {property.price} €
                                                <span style={{ fontWeight: '400', fontSize: '0.85rem', color: '#888', marginLeft: '4px' }}>/ noche</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <h3 className="text-muted">No hemos encontrado casas que coincidan...</h3>
                            <p>Prueba buscando en otra ría o cambiando los filtros.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;