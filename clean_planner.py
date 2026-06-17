import re

with open('d:/Project Praticium/FindYourTrip/trip_planner.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to remove from {/* Distance & Fuel Calculator */} up to the {/* Footer */} (exclusive of Footer? wait, destinations.html doesn't have a footer).
# Actually, let's just remove from {/* Distance & Fuel Calculator */} up to the end of the sections, right before the Drawer or closing tags.
# Let's remove from {/* Distance & Fuel Calculator */} up to {/* Province Detail Slide-out Drawer */}
# Since trip_planner.html does not need the Drawer (because it's the Trip Planner, not the Gems viewer... wait, Trip Planner suggests places and when clicked, does it open a drawer?)
# Let's check trip planner logic. 
# `setActiveProvince(p)` is used in the trip planner result! Yes, so we DO need the Province Drawer!

# We should remove:
# {/* Distance & Fuel Calculator */} section
# {/* Hidden Gems Section */} section
# {/* Booking Form */} section
# {/* Setting Panel */} section
# {/* About Us (Developer Profile Card) */} section
# {/* Contact Us Section */} section
# {/* Footer */} (destinations doesn't have it, but we can leave it or remove it).

pattern_calc = re.compile(r'\{\/\*\s*Distance & Fuel Calculator\s*\*\/\}.*?(?=\{\/\*\s*Hidden Gems Section\s*\*\/\})', re.DOTALL)
pattern_gems = re.compile(r'\{\/\*\s*Hidden Gems Section\s*\*\/\}.*?(?=\{\/\*\s*Booking Form\s*\*\/\})', re.DOTALL)
pattern_booking = re.compile(r'\{\/\*\s*Booking Form\s*\*\/\}.*?(?=\{\/\*\s*Setting Panel\s*\*\/\})', re.DOTALL)
pattern_settings = re.compile(r'\{\/\*\s*Setting Panel\s*\*\/\}.*?(?=\{\/\*\s*About Us \(Developer Profile Card\)\s*\*\/\})', re.DOTALL)
pattern_about = re.compile(r'\{\/\*\s*About Us \(Developer Profile Card\)\s*\*\/\}.*?(?=\{\/\*\s*Contact Us Section\s*\*\/\})', re.DOTALL)
pattern_contact = re.compile(r'\{\/\*\s*Contact Us Section\s*\*\/\}.*?(?=\{\/\*\s*Footer\s*\*\/\})', re.DOTALL)
pattern_footer = re.compile(r'\{\/\*\s*Footer\s*\*\/\}.*?(?=\{\/\*\s*Province Detail Slide-out Drawer\s*\*\/\})', re.DOTALL)

content = pattern_calc.sub('', content)
content = pattern_gems.sub('', content)
content = pattern_booking.sub('', content)
content = pattern_settings.sub('', content)
content = pattern_about.sub('', content)
content = pattern_contact.sub('', content)
content = pattern_footer.sub('', content) # removing footer as well to match other standalone pages

with open('d:/Project Praticium/FindYourTrip/trip_planner.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Cleaned up trip_planner.html')
