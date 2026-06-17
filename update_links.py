import re

# Update index.html
with open('d:/Project Praticium/FindYourTrip/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the link in index.html
content = content.replace('<a href="#planner" className="nav-link">TRIP PLANNER</a>', '<a href="trip_planner.html" className="nav-link">TRIP PLANNER</a>')

# 2. Remove the Trip Planner section from index.html
# The section starts with {/* Trip Planner Section */} and ends before {/* Distance & Fuel Calculator */}
pattern = re.compile(r'\{\/\*\s*Trip Planner Section\s*\*\/\}.*?(?=\{\/\*\s*Distance & Fuel Calculator\s*\*\/\})', re.DOTALL)
content = pattern.sub('', content)

with open('d:/Project Praticium/FindYourTrip/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update destinations.html and packages.html links just in case
def update_links(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('<a href="index.html#planner" className="nav-link">TRIP PLANNER</a>', '<a href="trip_planner.html" className="nav-link">TRIP PLANNER</a>')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)

update_links('d:/Project Praticium/FindYourTrip/destinations.html')
update_links('d:/Project Praticium/FindYourTrip/packages.html')

print('Updated links and removed section from index.html')
