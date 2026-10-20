import React from 'react';
import { useNavigate } from 'react-router-dom';
import { playBeep } from '../utils/sound';

export default function DrawerModal({ province, activePlace, setActivePlace, onClose, soundEnabled }) {
    const navigate = useNavigate();

    if (!province) return null;

    const prefillBooking = (pkgName) => {
        playBeep(soundEnabled);
        localStorage.setItem('pending-booking', JSON.stringify({
            item: pkgName,
            type: 'hotel',
            redirectUrl: '/booking'
        }));
        navigate('/booking');
    };

    return (
        <div className="drawer-overlay" onClick={() => { playBeep(soundEnabled); onClose(); }}>
            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                <button className="drawer-close" onClick={() => { playBeep(soundEnabled); onClose(); }}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {activePlace ? (
                    /* Place details view */
                    <div className="place-detail-view">
                        <div className="place-detail-back" onClick={() => { playBeep(soundEnabled); setActivePlace(null); }}>
                            <i className="fa-solid fa-arrow-left-long"></i> Back to {province.name}
                        </div>
                        <div className="drawer-header-img" style={{ backgroundImage: `url('${activePlace.img}')` }}>
                            <div className="drawer-header-overlay">
                                <span className="badge badge-light" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>{province.name}</span>
                                <h2 className="drawer-province-title">{activePlace.name}</h2>
                            </div>
                        </div>

                        <h4 className="drawer-section-title">History & Information</h4>
                        <div className="place-history-text">{activePlace.history}</div>

                        <button
                            className="btn-primary w-100 mt-4"
                            onClick={() => {
                                playBeep(soundEnabled);
                                onClose();
                                prefillBooking(`Trip to ${activePlace.name}`);
                            }}
                        >
                            Book Trip to This Place
                        </button>
                    </div>
                ) : (
                    /* Province details view */
                    <div>
                        <div className="drawer-header-img" style={{ backgroundImage: `url('${province.detailImg || province.coverImg}')` }}>
                            <div className="drawer-header-overlay">
                                <h2 className="drawer-province-title">{province.name}</h2>
                            </div>
                        </div>

                        <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '20px' }}>
                            "{province.tagline}"
                        </p>

                        <h4 className="drawer-section-title">Interactive Map</h4>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', height: '220px', marginBottom: '30px' }}>
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(province.name + ' Province Cambodia')}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
                            ></iframe>
                        </div>

                        <h4 className="drawer-section-title">Places of Interest</h4>
                        <div className="drawer-places-list">
                            {province.places?.map((place, idx) => (
                                <div
                                    key={place.id}
                                    className="drawer-place-card"
                                    onClick={() => {
                                        playBeep(soundEnabled);
                                        setActivePlace(place);
                                    }}
                                >
                                    <img src={place.img} alt={place.name} className="drawer-place-img" />
                                    <div className="drawer-place-info">
                                        <h5 className="drawer-place-name">{idx + 1}. {place.name}</h5>
                                        <p className="drawer-place-desc">{place.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
