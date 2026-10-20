import React from 'react';

export default function HeroInfoBar() {
    return (
        <div className="hero-info-bar">
            <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="info-text">
                    <h4>Best Price Guarantee</h4>
                    <p>We guarantee the best price for your trips.</p>
                </div>
            </div>
            <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-headset"></i></div>
                <div className="info-text">
                    <h4>24/7 Customer Support</h4>
                    <p>We're here to help you anytime, anywhere.</p>
                </div>
            </div>
            <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-shield"></i></div>
                <div className="info-text">
                    <h4>Safe & Secure Booking</h4>
                    <p>Your safety is our top priority.</p>
                </div>
            </div>
            <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-plane"></i></div>
                <div className="info-text">
                    <h4>Easy & Fast Booking</h4>
                    <p>Book your trip in just a few clicks.</p>
                </div>
            </div>
            <div className="info-item">
                <div className="info-icon"><i className="fa-solid fa-thumbs-up"></i></div>
                <div className="info-text">
                    <h4>Trusted by Travelers</h4>
                    <p>Join thousands of happy travelers worldwide.</p>
                </div>
            </div>
        </div>
    );
}
