import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProperties } from '../services/api-service';

function PropertyList() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function fetch() {
            const properties = await getProperties();
            setProperties(properties);
        }
        fetch();
    }, []);

    return (
        <div className='row row-cols-1 row-cols-md-3 g-4'>
            {properties.map((property) => (
                <div key={property.id} className='col'>
                    <Link to={`/propiedad/${property.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
            <div className="card h-100 border-0 shadow-sm property-card">
                            
                            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0', height: '220px' }}>
                                {property.photos?.length > 0 && (
                                    <img
                                        src={property.photos[0]}
                                        alt={property.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                        className="property-img"
                                    />
                                )}
                                
                                <span style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    backgroundColor: '#2563a8',
                                    color: 'white',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}>
                                    {property.location?.ria}
                                </span>
                            </div>

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

                                {property.rating > 0 && (
                                    <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                                        ⭐ {property.rating.toFixed(1)}
                                    </p>
                                )}

                                <p style={{ margin: '0', fontWeight: '700', fontSize: '1.1rem', color: '#2563a8' }}>
                                    {property.price} €
                                    <span style={{ fontWeight: '400', fontSize: '0.85rem', color: '#888', marginLeft: '4px' }}>/ noche</span>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PropertyList;
