import React, { useState } from 'react';
import { provincesData } from '../data/provincesData';
import { hiddenGemsData } from '../data/hiddenGemsData';
import CustomSelect from '../components/CustomSelect';
import HeroInfoBar from '../components/HeroInfoBar';
import { playBeep } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export default function HiddenGems() {
    const { t } = useLanguage();

    const [gemProvinceId, setGemProvinceId] = useState('takeo');
    const [gemActiveTab, setGemActiveTab] = useState('about');

    const currentGemProvince = provincesData.find(p => p.id === gemProvinceId) || provincesData[0];
    const currentHiddenGem = (typeof hiddenGemsData !== 'undefined' && hiddenGemsData[gemProvinceId]) || {
        name: "Add Your Hidden Gem",
        khmerName: "កន្លែងលាក់កំបាំង",
        desc: "This is a placeholder. You can add your unique hidden gem information for this province in the hidden_gem_data.js file.",
        history: "Add unique history for this province's hidden gem in hidden_gem_data.js.",
        img: "https://via.placeholder.com/600x400/0d6efd/ffffff?text=Your+Hidden+Gem",
        roadCondition: "Add road conditions here...",
        contactLocalGuide: "Add contact info here..."
    };

    return (
        <div>
            {/* Hero Section */}
            <header id="home" className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title" style={{ color: 'white', textTransform: 'uppercase', fontSize: '4.5rem', lineHeight: '1.2' }}>
                        CAMBODIAN <br/> HIDDEN GEMS
                    </h1>
                    <p className="hero-subtitle">Explore the secret places, historical stories, and off-the-beaten-path paths of each Cambodian province.</p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            className="btn-primary" 
                            style={{ borderRadius: '30px', background: '#0d6efd', padding: '15px 35px', fontWeight: 'bold' }} 
                            onClick={() => document.getElementById('gems')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            EXPLORE GEMS
                        </button>
                    </div>
                </div>

                {/* Features Info Bar */}
                <HeroInfoBar />
            </header>

            {/* Hidden Gems Section */}
            <section id="gems" className="section-padding bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="badge">Off The Beaten Path</span>
                        <h2>{t('gemTitle')}</h2>
                        <p>{t('gemSubtitle')}</p>
                    </div>

                    <div className="gems-filter-bar form-group">
                        <label style={{ justifyContent: 'center' }}>{t('gemPrompt')}</label>
                        <CustomSelect
                            options={provincesData.map(p => ({ value: p.id, label: p.name + " Province" }))}
                            selectedValue={gemProvinceId}
                            onChange={(val) => {
                                playBeep(true);
                                setGemProvinceId(val);
                                setGemActiveTab('about');
                            }}
                        />
                    </div>

                    <div className="gem-layout glass-panel" style={{ padding: '30px', background: 'var(--bg-panel)' }}>
                        <div className="gem-image-card">
                            <img src={currentHiddenGem.img} alt={currentHiddenGem.name} className="gem-img" />
                            <div className="gem-image-overlay">
                                <div className="badge badge-light" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>Hidden Gem</div>
                                <h3>{currentHiddenGem.name}</h3>
                                <p>{currentGemProvince.name} Province</p>
                            </div>
                        </div>

                        <div className="gem-info-card">
                            <h3 className="gem-info-title">{currentHiddenGem.name}</h3>

                            {/* Tabs */}
                            <div className="gem-info-tabs">
                                <button
                                    className={`gem-tab ${gemActiveTab === 'about' ? 'active' : ''}`}
                                    onClick={() => { playBeep(true); setGemActiveTab('about'); }}
                                >
                                    {t('gemTabAbout')}
                                </button>
                                <button
                                    className={`gem-tab ${gemActiveTab === 'history' ? 'active' : ''}`}
                                    onClick={() => { playBeep(true); setGemActiveTab('history'); }}
                                >
                                    {t('gemTabHistory')}
                                </button>
                                <button
                                    className={`gem-tab ${gemActiveTab === 'how-to' ? 'active' : ''}`}
                                    onClick={() => { playBeep(true); setGemActiveTab('how-to'); }}
                                >
                                    {t('gemTabHowTo')}
                                </button>
                            </div>

                            {/* Tab Contents */}
                            <div className="gem-tab-content">
                                {gemActiveTab === 'about' && (
                                    <div>
                                        <p style={{ marginBottom: '15px' }}>{currentHiddenGem.desc}</p>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                                            <span className="tech-tag">Authentic Khmer Heritage</span>
                                            <span className="tech-tag">Eco-friendly Spot</span>
                                        </div>
                                    </div>
                                )}

                                {gemActiveTab === 'history' && (
                                    <div>
                                        <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.92rem', lineHeight: '1.5' }}>{currentHiddenGem.history}</p>
                                    </div>
                                )}

                                {gemActiveTab === 'how-to' && (
                                    <div>
                                        <p style={{ marginBottom: '10px' }}><b>Road condition:</b> {currentHiddenGem.roadCondition}</p>
                                        <p style={{ marginBottom: '10px' }}><b>Contact Local Guide:</b> {currentHiddenGem.contactLocalGuide}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
