import os
import re

dir_path = 'd:/Project Praticium/FindYourTrip'

old_socials_pattern = r'<div className="footer-socials".*?<\/div>'
new_socials = """<div className="footer-socials" style={{ display: 'flex', gap: '10px' }}>
                                        <a href="https://www.facebook.com/share/14hLmmP1Gvx/?mibextid=wwXIfr" target="_blank" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: '0.3s' }}><i className="fa-brands fa-facebook-f"></i></a>
                                        <a href="https://www.instagram.com/iur.aaaa" target="_blank" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: '0.3s' }}><i className="fa-brands fa-instagram"></i></a>
                                    </div>"""

for file_name in os.listdir(dir_path):
    if file_name.endswith('.html'):
        file_path = os.path.join(dir_path, file_name)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if footer-socials exists and replace it
        if '<div className="footer-socials"' in content:
            new_content = re.sub(old_socials_pattern, new_socials, content, flags=re.DOTALL)
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated socials in {file_name}")
            else:
                print(f"No changes needed in {file_name}")
