import os, glob

script_tag = '<script type="module" src="auth_state.js"></script>'
files = glob.glob('*.html')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if script_tag not in content:
        # Insert right before </body>
        if '</body>' in content:
            new_content = content.replace('</body>', f'{script_tag}\n</body>')
        else:
            new_content = content + f'\n{script_tag}\n'
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file}')
