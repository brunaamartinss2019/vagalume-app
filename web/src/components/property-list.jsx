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
                    <Link to={`/propriedad/${property.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
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
            ))}
        </div>
    );
}

export default PropertyList;


//     return (
//         <div className='list-properties'>
//             {properties.map((property) => (
//                 <div key={property.id} className='property-card' style={{
//                     border: '1px solid #ddd',
//                     borderRadius: '12px',
//                     padding: '16px',
//                     marginBottom: '20px',
//                     boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: '20px',
//                     minHeight: '250px'
//                 }}>
//                     {property.photos?.length > 0 && (
//                         <div style={{ flex: '0 0 400px', maxWidth: '400px', height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
//                             <Link to={`/propiedad/${property.id}`}>
//                                 <img
//                                     src={property.photos[0]}
//                                     alt={property.title}
//                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                 />
//                             </Link>
//                         </div>
//                     )}

//                     <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                         <div>
//                             <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>
//                                 <Link className='text-decoration-none text-reset' to={`/propiedad/${property.id}`}>
//                                     {property.title}
//                                 </Link>
//                             </h2>
//                             <p style={{ margin: '0 0 5px 0', color: '#666' }}>
//                                 <strong>{property.location?.ria}</strong> — {property.location?.address}
//                             </p>
//                             <p style={{ margin: '0 0 15px 0', color: '#333', lineHeight: '1.5' }}>
//                                 {property.description?.substring(0, 150)}...
//                             </p>
//                         </div>

//                         <div>
//                             <div style={{ marginBottom: '10px', display: 'flex', gap: '15px' }}>
//                                 <span>👥 {property.capacity} huéspedes</span>
//                                 <span>🏠 {property.type === 'entire' ? 'Alojamiento completo' : 'Habitación'}</span>
//                             </div>
//                             <p style={{ margin: '0', fontSize: '1.8rem', fontWeight: 'bold', color: '#2563a8' }}>
//                                 {property.price} €
//                                 <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#666', marginLeft: '8px' }}>
//                                     / noche
//                                 </span>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default PropertyList;