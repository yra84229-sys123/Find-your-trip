import os
import re

dir_path = 'd:/Project Praticium/FindYourTrip'

new_footer = """                    {/* Footer */}
                    <footer className="footer-modern bg-gradient-dark text-light" style={{ background: '#050a15', paddingTop: '60px', paddingBottom: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="container">
                            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '40px' }}>
                                {/* Brand Column */}
                                <div className="col-lg-4 col-md-6" style={{ flex: '1 1 300px' }}>
                                    <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                        <i className="fa-solid fa-location-dot" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}>FIND YOU TRIP</h3>
                                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Discover. Explore. Enjoy.</span>
                                        </div>
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                                        Your trusted travel companion. We help you find the best places, plan your perfect trip and make memories that last a lifetime.
                                    </p>
                                    <div className="footer-socials" style={{ display: 'flex', gap: '10px' }}>
                                        <a href="https://www.facebook.com" target="_blank" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: '0.3s' }}><i className="fa-brands fa-facebook-f"></i></a>
                                        <a href="https://www.instagram.com" target="_blank" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: '0.3s' }}><i className="fa-brands fa-instagram"></i></a>
                                        <a href="https://twitter.com" target="_blank" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: '0.3s' }}><i className="fa-brands fa-twitter"></i></a>
                                        <a href="https://youtube.com" target="_blank" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: '0.3s' }}><i className="fa-brands fa-youtube"></i></a>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="col-lg-2 col-md-6" style={{ flex: '1 1 150px' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600', position: 'relative' }}>Quick Links<span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '30px', height: '2px', background: 'var(--primary)' }}></span></h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <li><a href="index.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Home</a></li>
                                        <li><a href="destinations.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Destinations</a></li>
                                        <li><a href="packages.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Tour Packages</a></li>
                                        <li><a href="trip_planner.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Trip Planner</a></li>
                                        <li><a href="hidden_gems.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Hidden Gems</a></li>
                                        <li><a href="about.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> About Us</a></li>
                                    </ul>
                                </div>

                                {/* Popular Destinations */}
                                <div className="col-lg-2 col-md-6" style={{ flex: '1 1 150px' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600', position: 'relative' }}>Popular Destinations<span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '30px', height: '2px', background: 'var(--primary)' }}></span></h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <li><a href="destinations.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Siem Reap</a></li>
                                        <li><a href="destinations.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Phnom Penh</a></li>
                                        <li><a href="destinations.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Kampot</a></li>
                                        <li><a href="destinations.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Battambang</a></li>
                                        <li><a href="destinations.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Koh Rong</a></li>
                                        <li><a href="destinations.html" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Kep</a></li>
                                    </ul>
                                </div>

                                {/* Support */}
                                <div className="col-lg-2 col-md-6" style={{ flex: '1 1 150px' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600', position: 'relative' }}>Support<span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '30px', height: '2px', background: 'var(--primary)' }}></span></h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> FAQ</a></li>
                                        <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Terms & Conditions</a></li>
                                        <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Privacy Policy</a></li>
                                        <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Refund Policy</a></li>
                                        <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Booking Guide</a></li>
                                        <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-angle-right" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i> Customer Support</a></li>
                                    </ul>
                                </div>

                                {/* Newsletter */}
                                <div className="col-lg-3 col-md-6" style={{ flex: '1 1 250px' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600', position: 'relative' }}>Newsletter<span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '30px', height: '2px', background: 'var(--primary)' }}></span></h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '15px' }}>Subscribe to get special offers and travel inspiration.</p>
                                    <div style={{ position: 'relative', display: 'flex' }}>
                                        <input type="email" placeholder="Your email address" style={{ width: '100%', padding: '12px 45px 12px 15px', borderRadius: '30px', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }} />
                                        <button style={{ position: 'absolute', right: '4px', top: '4px', bottom: '4px', width: '38px', borderRadius: '50%', background: 'var(--primary)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Bar */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '20px' }}>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>&copy; 2024 <span style={{ color: 'var(--primary)' }}>Find You Trip</span>. All rights reserved.</p>
                                <div style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px', fontStyle: 'italic' }}>
                                    <i className="fa-solid fa-plane"></i> - Let's find your next adventure.
                                </div>
                            </div>
                        </div>
                    </footer>"""

for file_name in os.listdir(dir_path):
    if file_name.endswith('.html'):
        file_path = os.path.join(dir_path, file_name)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if an old footer exists and replace it
        pattern = r"\{\/\*\s*Footer\s*\*\/\}\s*<footer.*?<\/footer>"
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, new_footer, content, flags=re.DOTALL)
            print(f"Replaced existing footer in {file_name}")
        else:
            # If no footer, insert it before the drawer overlay if it exists
            drawer_marker = "{/* Province Detail Slide-out Drawer */}"
            if drawer_marker in content:
                content = content.replace(drawer_marker, new_footer + "\n\n                    " + drawer_marker)
                print(f"Inserted footer before drawer in {file_name}")
            else:
                # If no drawer, find the last closing div of the app and insert before it
                # Looking for:
                #                 </div>
                #             );
                #         }
                app_end_pattern = r"(\s+<\/div>\s+);\s+}"
                if re.search(app_end_pattern, content):
                    content = re.sub(app_end_pattern, "\n" + new_footer + r"\1", content)
                    print(f"Inserted footer at end of App in {file_name}")
                else:
                    print(f"Could not find a place to insert footer in {file_name}")

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
