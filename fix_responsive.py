import os
import re
import glob

DIR = r'd:\Project Praticium\FindYourTrip'

def add_mobile_menu():
    html_files = glob.glob(os.path.join(DIR, '*.html'))
    
    state_line = "            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n"
    
    # Button to insert in nav-bottom
    btn_html = '                            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "white" }}><i className={"fa-solid " + (mobileMenuOpen ? "fa-xmark" : "fa-bars")}></i></button>\n'
    
    # Mobile menu to insert after </nav>
    mobile_menu_html = """
                    {/* Mobile Menu */}
                    <div className={"mobile-menu " + (mobileMenuOpen ? "open" : "")}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
                            <div className="nav-logo" style={{color: 'var(--text-main)'}}>
                                <i className="fa-solid fa-plane-departure"></i>
                                <span>TOURLY</span>
                            </div>
                            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(false)} style={{color: 'var(--text-main)', display: 'block'}}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <a href="index.html" onClick={() => setMobileMenuOpen(false)}>HOME</a>
                        <a href="destinations.html" onClick={() => setMobileMenuOpen(false)}>POPULAR DESTINATIONS</a>
                        <a href="packages.html" onClick={() => setMobileMenuOpen(false)}>PACKAGES</a>
                        <a href="trip_planner.html" onClick={() => setMobileMenuOpen(false)}>TRIP PLANNER</a>
                        <a href="calculator.html" onClick={() => setMobileMenuOpen(false)}>CALCULATOR</a>
                        <a href="hidden_gems.html" onClick={() => setMobileMenuOpen(false)}>HIDDEN GEMS</a>
                        <a href="settings.html" onClick={() => setMobileMenuOpen(false)}>SETTINGS</a>
                        <a href="about.html" onClick={() => setMobileMenuOpen(false)}>ABOUT US</a>
                        <a href="#booking" className="btn-primary" style={{marginTop: '20px', textAlign: 'center'}} onClick={() => {setMobileMenuOpen(false); setTimeout(() => {if(document.getElementById('booking')) document.getElementById('booking').scrollIntoView({behavior: 'smooth'})}, 100);}}>BOOK NOW</a>
                    </div>
"""

    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Check if already has mobileMenuOpen
        if "mobileMenuOpen" in content:
            print(f"Skipping {os.path.basename(filepath)}, already has mobile menu.")
            continue
            
        # 1. Insert state
        # Find `const [theme, setThemeState] = useState`
        content = re.sub(r'(const\s+\[theme,\s*setThemeState\]\s*=\s*useState[^;]+;)', r'\1\n' + state_line, content)
        
        # 2. Insert mobile menu button right before </a></div> (nav-bottom end) or after BOOK NOW
        content = re.sub(r'(<a\s+href="#booking"\s+className="nav-book-btn">BOOK NOW</a>)', r'\1\n' + btn_html, content)
        
        # 3. Insert mobile menu div after </nav>
        content = re.sub(r'(</nav>)', r'\1\n' + mobile_menu_html, content)
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {os.path.basename(filepath)}")
        else:
            print(f"Failed to update {os.path.basename(filepath)} - no regex matched.")

if __name__ == '__main__':
    add_mobile_menu()
