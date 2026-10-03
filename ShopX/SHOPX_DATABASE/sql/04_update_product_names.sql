-- =============================================================================
-- ShopX Product Name Update Migration
-- =============================================================================
-- Purpose: Replace generic "ShopX <category> Product N" names with realistic
--          e-commerce product names appropriate to each category.
--
-- Safety:  Only updates the 'name' and 'description' columns in 'products'.
--          Preserves: id, price, stock_quantity, category_id, and all
--          relationships (inventory, cart_items, order_items).
--
-- Usage:   \i 'D:/College Work/ShopX/ShopX/SHOPX_DATABASE/sql/04_update_product_names.sql'
-- =============================================================================

BEGIN;

-- Create a temporary table with realistic product names per category
CREATE TEMPORARY TABLE _product_names (
    category_name VARCHAR(255),
    name_index INT,
    product_name VARCHAR(255),
    product_desc TEXT
) ON COMMIT DROP;

-- ============ perfumery ============
INSERT INTO _product_names VALUES
('perfumery', 1, 'Midnight Oud Eau de Parfum', 'Rich and luxurious oud-based fragrance with warm amber notes'),
('perfumery', 2, 'Citrus Bloom Eau de Toilette', 'Fresh citrus and floral blend perfect for everyday wear'),
('perfumery', 3, 'Velvet Rose Perfume', 'Elegant rose-centered perfume with hints of musk and vanilla'),
('perfumery', 4, 'Ocean Mist Fragrance', 'Refreshing aquatic fragrance inspired by coastal breezes'),
('perfumery', 5, 'Amber Noir Cologne', 'Bold amber cologne with smoky undertones and cedarwood'),
('perfumery', 6, 'Lavender Dreams Body Mist', 'Calming lavender body mist with a gentle floral finish'),
('perfumery', 7, 'Jasmine Silk Eau de Parfum', 'Delicate jasmine perfume with silky sandalwood base'),
('perfumery', 8, 'Wild Bergamot Fragrance', 'Zesty bergamot fragrance with green tea accords'),
('perfumery', 9, 'Vanilla Orchid Perfume', 'Warm vanilla and exotic orchid blend for evening wear'),
('perfumery', 10, 'Cedar & Sage Cologne', 'Earthy cedarwood cologne balanced with aromatic sage');

-- ============ art ============
INSERT INTO _product_names VALUES
('art', 1, 'Watercolor Brush Set', 'Professional-grade watercolor brushes in assorted sizes'),
('art', 2, 'Premium Acrylic Paint Kit', 'Vibrant acrylic paint set with 24 colors and mixing palette'),
('art', 3, 'Artist Canvas 12-Pack', 'Pre-stretched cotton canvases for painting in multiple sizes'),
('art', 4, 'Sketching Pencil Collection', 'Graphite drawing pencils ranging from 6H to 8B'),
('art', 5, 'Oil Pastel Set', 'Rich and creamy oil pastels in 36 vivid colors'),
('art', 6, 'Calligraphy Pen Kit', 'Complete calligraphy starter set with nibs and ink'),
('art', 7, 'Easel Display Stand', 'Adjustable wooden easel for studio and plein air painting'),
('art', 8, 'Charcoal Drawing Set', 'Vine and compressed charcoal sticks with blending stumps'),
('art', 9, 'Watercolor Paper Pad', 'Cold-pressed 300gsm watercolor paper pad with 20 sheets'),
('art', 10, 'Palette Knife Set', 'Stainless steel palette knives for texture and mixing');

-- ============ sports_leisure ============
INSERT INTO _product_names VALUES
('sports_leisure', 1, 'ProGrip Training Gloves', 'Durable training gloves with wrist support and ventilation'),
('sports_leisure', 2, 'Adjustable Resistance Bands', 'Set of 5 resistance bands with varying tension levels'),
('sports_leisure', 3, 'Insulated Sports Water Bottle', 'Double-wall insulated bottle keeps drinks cold for 24 hours'),
('sports_leisure', 4, 'Performance Yoga Mat', 'Non-slip yoga mat with alignment guides and carrying strap'),
('sports_leisure', 5, 'Lightweight Running Shoes', 'Breathable mesh running shoes with cushioned soles'),
('sports_leisure', 6, 'Speed Jump Rope', 'Ball-bearing jump rope for cardio and agility training'),
('sports_leisure', 7, 'Compression Sports Socks', 'Moisture-wicking compression socks for athletic performance'),
('sports_leisure', 8, 'Foam Roller Recovery Kit', 'High-density foam roller for post-workout muscle recovery'),
('sports_leisure', 9, 'Dumbbell Weight Set', 'Adjustable dumbbell set with quick-change weight plates'),
('sports_leisure', 10, 'Outdoor Hiking Backpack', 'Water-resistant hiking backpack with hydration compartment');

-- ============ baby ============
INSERT INTO _product_names VALUES
('baby', 1, 'Soft Cotton Baby Romper', 'Breathable cotton romper with snap closures for easy changes'),
('baby', 2, 'Baby Care Essentials Kit', 'Complete baby grooming set with brush, comb, and nail clippers'),
('baby', 3, 'Plush Animal Rattle', 'Soft plush rattle toy perfect for sensory development'),
('baby', 4, 'Organic Cotton Bib Set', 'Set of 5 organic cotton bibs with adjustable snaps'),
('baby', 5, 'Baby Feeding Bottle Set', 'Anti-colic feeding bottles with natural-flow nipples'),
('baby', 6, 'Hooded Baby Towel', 'Ultra-soft hooded towel for bath time comfort'),
('baby', 7, 'Musical Mobile Crib Toy', 'Rotating musical mobile with soft plush characters'),
('baby', 8, 'Baby Blanket Swaddle Set', 'Breathable muslin swaddle blankets in gentle patterns'),
('baby', 9, 'Teething Ring Toy', 'BPA-free silicone teething ring with textured surfaces'),
('baby', 10, 'Baby Milestone Cards', 'Illustrated milestone cards to capture precious moments');

-- ============ housewares ============
INSERT INTO _product_names VALUES
('housewares', 1, 'Stainless Steel Kitchen Organizer', 'Multi-tier organizer for spices, utensils, and supplies'),
('housewares', 2, 'Ceramic Dinner Set', 'Elegant 16-piece ceramic dinner set for four'),
('housewares', 3, 'Airtight Storage Container Set', 'BPA-free food storage containers with locking lids'),
('housewares', 4, 'Bamboo Cutting Board', 'Sustainable bamboo cutting board with juice groove'),
('housewares', 5, 'Stainless Steel Mixing Bowls', 'Nested mixing bowl set with non-slip bases'),
('housewares', 6, 'Glass Baking Dish Set', 'Tempered glass baking dishes for oven and microwave'),
('housewares', 7, 'Silicone Kitchen Utensil Set', 'Heat-resistant silicone utensils with wooden handles'),
('housewares', 8, 'Coffee Mug Collection', 'Set of 4 stylish ceramic coffee mugs in modern designs'),
('housewares', 9, 'Dish Drying Rack', 'Compact stainless steel dish rack with drip tray'),
('housewares', 10, 'Kitchen Timer Digital', 'Magnetic digital kitchen timer with loud alarm');

-- ============ musical_instruments ============
INSERT INTO _product_names VALUES
('musical_instruments', 1, 'Acoustic Guitar Starter Pack', 'Full-size acoustic guitar with tuner, picks, and case'),
('musical_instruments', 2, 'Digital Piano Keyboard', '61-key digital keyboard with touch response and built-in speakers'),
('musical_instruments', 3, 'Drum Practice Pad', 'Realistic-feel practice pad for quiet drumming practice'),
('musical_instruments', 4, 'Ukulele Concert Size', 'Mahogany concert ukulele with geared tuners'),
('musical_instruments', 5, 'Violin Student Kit', 'Student violin outfit with bow, case, and rosin'),
('musical_instruments', 6, 'Guitar Capo Set', 'Quick-change capo for acoustic and electric guitars'),
('musical_instruments', 7, 'Microphone Studio Bundle', 'Condenser microphone with pop filter and boom arm'),
('musical_instruments', 8, 'Harmonica Blues Set', 'Professional harmonica set in multiple keys'),
('musical_instruments', 9, 'Music Stand Adjustable', 'Portable folding music stand with sheet holder'),
('musical_instruments', 10, 'Guitar String Set', 'Premium acoustic guitar strings with bright tone');

-- ============ cool_stuff ============
INSERT INTO _product_names VALUES
('cool_stuff', 1, 'LED Galaxy Projector', 'Starry night projector with color-changing aurora effects'),
('cool_stuff', 2, 'Retro Bluetooth Speaker', 'Vintage-styled Bluetooth speaker with rich bass'),
('cool_stuff', 3, 'Magnetic Levitation Globe', 'Floating globe with LED lighting and magnetic base'),
('cool_stuff', 4, 'Smart LED Strip Lights', 'App-controlled RGB LED strip with music sync'),
('cool_stuff', 5, 'Desktop Mini Zen Garden', 'Relaxing tabletop zen garden with sand and stones'),
('cool_stuff', 6, 'Portable Espresso Maker', 'Compact hand-press espresso maker for travel'),
('cool_stuff', 7, 'Infinity Cube Fidget Toy', 'Satisfying aluminum infinity cube for stress relief'),
('cool_stuff', 8, 'Moon Lamp Night Light', '3D-printed moon lamp with touch-dimming control'),
('cool_stuff', 9, 'Pocket Drone Camera', 'Ultra-compact drone with HD camera and one-key takeoff'),
('cool_stuff', 10, 'Wooden Puzzle Box', 'Handcrafted wooden puzzle box with hidden compartments');

-- ============ furniture_decor ============
INSERT INTO _product_names VALUES
('furniture_decor', 1, 'Modern Table Lamp', 'Minimalist ceramic table lamp with fabric shade'),
('furniture_decor', 2, 'Decorative Throw Pillows', 'Set of 2 textured throw pillows in neutral tones'),
('furniture_decor', 3, 'Wall Art Canvas Print', 'Abstract wall art print on stretched canvas'),
('furniture_decor', 4, 'Floating Wall Shelves', 'Set of 3 wooden floating shelves with hidden mounts'),
('furniture_decor', 5, 'Accent Side Table', 'Round accent table with metal frame and wooden top'),
('furniture_decor', 6, 'Woven Storage Basket', 'Handwoven seagrass basket for storage and decor'),
('furniture_decor', 7, 'Decorative Wall Mirror', 'Round wall mirror with brass-finished metal frame'),
('furniture_decor', 8, 'Indoor Plant Pot Set', 'Ceramic plant pots with drainage holes and saucers'),
('furniture_decor', 9, 'Scented Candle Collection', 'Set of 3 soy wax candles in decorative glass jars'),
('furniture_decor', 10, 'Bookend Set Marble', 'Heavy marble bookends with modern geometric design');

-- ============ home_appliances ============
INSERT INTO _product_names VALUES
('home_appliances', 1, 'Compact Air Purifier', 'HEPA air purifier for rooms up to 250 sq ft'),
('home_appliances', 2, 'Digital Food Scale', 'Precision kitchen scale with tare function and LCD display'),
('home_appliances', 3, 'Electric Kettle Glass', 'Borosilicate glass electric kettle with auto shut-off'),
('home_appliances', 4, 'Handheld Garment Steamer', 'Portable fabric steamer heats up in 30 seconds'),
('home_appliances', 5, 'Robot Vacuum Cleaner', 'Smart robot vacuum with app control and auto-charging'),
('home_appliances', 6, 'Tower Fan Oscillating', 'Slim tower fan with 3 speed settings and remote control'),
('home_appliances', 7, 'Immersion Hand Blender', 'Stainless steel hand blender with whisk attachment'),
('home_appliances', 8, 'Toaster 2-Slice', 'Wide-slot toaster with defrost and bagel functions'),
('home_appliances', 9, 'Electric Rice Cooker', 'One-touch rice cooker with keep-warm function'),
('home_appliances', 10, 'Portable Humidifier', 'Ultrasonic cool-mist humidifier with night light');

-- ============ toys ============
INSERT INTO _product_names VALUES
('toys', 1, 'Building Blocks Mega Set', 'Creative building blocks set with 500 colorful pieces'),
('toys', 2, 'Remote Control Car', 'High-speed RC car with rechargeable battery'),
('toys', 3, 'Board Game Family Edition', 'Classic family board game for 2-6 players'),
('toys', 4, 'Puzzle 1000 Pieces', 'Challenging jigsaw puzzle with beautiful landscape design'),
('toys', 5, 'Plush Teddy Bear', 'Super-soft plush teddy bear in jumbo size'),
('toys', 6, 'Science Experiment Kit', 'STEM science kit with 20 exciting experiments'),
('toys', 7, 'Dollhouse Playset', 'Wooden dollhouse with furniture and accessories'),
('toys', 8, 'Action Figure Collection', 'Poseable action figures with interchangeable accessories'),
('toys', 9, 'Magnetic Drawing Board', 'Erasable magnetic drawing board with stamps and pen'),
('toys', 10, 'Train Set Electric', 'Battery-operated train set with tracks and bridge');

-- ============ bed_bath_table ============
INSERT INTO _product_names VALUES
('bed_bath_table', 1, 'Egyptian Cotton Sheet Set', 'Luxury 400-thread-count cotton sheets in queen size'),
('bed_bath_table', 2, 'Memory Foam Pillow', 'Contour memory foam pillow with cooling gel layer'),
('bed_bath_table', 3, 'Plush Bath Towel Set', 'Set of 4 ultra-absorbent Turkish cotton bath towels'),
('bed_bath_table', 4, 'Duvet Cover Set', 'Soft microfiber duvet cover set with pillow shams'),
('bed_bath_table', 5, 'Table Runner Linen', 'Natural linen table runner with fringed edges'),
('bed_bath_table', 6, 'Shower Curtain Fabric', 'Water-repellent fabric shower curtain in modern design'),
('bed_bath_table', 7, 'Quilted Mattress Protector', 'Hypoallergenic waterproof mattress protector'),
('bed_bath_table', 8, 'Cotton Napkin Set', 'Set of 8 cloth dinner napkins in neutral colors'),
('bed_bath_table', 9, 'Weighted Blanket', 'Calming weighted blanket with glass bead fill'),
('bed_bath_table', 10, 'Non-Slip Bath Mat', 'Quick-dry memory foam bath mat with non-slip backing');

-- ============ computers_accessories ============
INSERT INTO _product_names VALUES
('computers_accessories', 1, 'Wireless Ergonomic Mouse', 'Ergonomic vertical mouse with silent clicks and USB receiver'),
('computers_accessories', 2, 'USB-C Hub Multiport', '7-in-1 USB-C hub with HDMI, USB-A, and SD card reader'),
('computers_accessories', 3, 'Mechanical Keyboard RGB', 'Compact mechanical keyboard with customizable RGB lighting'),
('computers_accessories', 4, 'Laptop Stand Adjustable', 'Aluminum laptop riser with ventilation and cable management'),
('computers_accessories', 5, 'Webcam HD 1080p', 'Full HD webcam with auto-focus and built-in microphone'),
('computers_accessories', 6, 'Mouse Pad Extended', 'Extra-large desk mouse pad with stitched edges'),
('computers_accessories', 7, 'External SSD 500GB', 'Portable SSD with USB 3.2 and fast transfer speeds'),
('computers_accessories', 8, 'Monitor Desk Mount', 'Single monitor arm mount with full articulation'),
('computers_accessories', 9, 'Bluetooth Keyboard Slim', 'Ultra-slim wireless keyboard for multi-device switching'),
('computers_accessories', 10, 'Cable Management Kit', 'Desk cable organizer with clips, ties, and sleeve');

-- ============ health_beauty ============
INSERT INTO _product_names VALUES
('health_beauty', 1, 'Vitamin C Serum', 'Brightening facial serum with hyaluronic acid'),
('health_beauty', 2, 'Natural Lip Balm Set', 'Organic beeswax lip balms in 4 flavors'),
('health_beauty', 3, 'Facial Cleanser Gentle', 'pH-balanced daily facial cleanser for all skin types'),
('health_beauty', 4, 'Hair Care Argan Oil', 'Pure argan oil treatment for shiny and smooth hair'),
('health_beauty', 5, 'Sunscreen SPF 50', 'Lightweight broad-spectrum sunscreen with no white cast'),
('health_beauty', 6, 'Makeup Brush Set', 'Professional makeup brushes with synthetic bristles'),
('health_beauty', 7, 'Night Cream Moisturizer', 'Intensive overnight moisturizer with retinol complex'),
('health_beauty', 8, 'Essential Oils Diffuser Set', 'Ceramic diffuser with 6 pure essential oils'),
('health_beauty', 9, 'Bamboo Toothbrush Pack', 'Eco-friendly bamboo toothbrushes in biodegradable packaging'),
('health_beauty', 10, 'Derma Roller Kit', 'Micro-needling roller for skin rejuvenation and care');

-- ============ electronics ============
INSERT INTO _product_names VALUES
('electronics', 1, 'Wireless Earbuds Pro', 'Active noise-canceling earbuds with 30-hour battery life'),
('electronics', 2, 'Portable Bluetooth Speaker', 'Waterproof Bluetooth speaker with 360-degree sound'),
('electronics', 3, 'Smart Watch Fitness', 'Fitness tracker smartwatch with heart rate and GPS'),
('electronics', 4, 'Power Bank 20000mAh', 'High-capacity portable charger with fast charging'),
('electronics', 5, 'LED Desk Lamp Smart', 'Touch-control LED desk lamp with adjustable color temperature'),
('electronics', 6, 'Digital Alarm Clock', 'Modern digital clock with wireless charging pad'),
('electronics', 7, 'USB Car Charger Dual', 'Quick-charge dual USB car charger with LED indicator'),
('electronics', 8, 'Noise Canceling Headphones', 'Over-ear headphones with ANC and foldable design'),
('electronics', 9, 'Smart Plug Wi-Fi', 'App-controlled smart plug with energy monitoring'),
('electronics', 10, 'Action Camera 4K', 'Waterproof action camera with image stabilization');

-- ============ construction_tools_safety ============
INSERT INTO _product_names VALUES
('construction_tools_safety', 1, 'Safety Goggles Set', 'Anti-fog safety goggles with adjustable strap'),
('construction_tools_safety', 2, 'Work Gloves Heavy Duty', 'Cut-resistant work gloves with reinforced palms'),
('construction_tools_safety', 3, 'Hard Hat Ventilated', 'Lightweight ventilated hard hat with ratchet adjustment'),
('construction_tools_safety', 4, 'Safety Vest Reflective', 'High-visibility reflective safety vest with pockets'),
('construction_tools_safety', 5, 'Ear Protection Muffs', 'Noise-reducing ear muffs with padded headband'),
('construction_tools_safety', 6, 'First Aid Kit Workplace', 'Comprehensive workplace first aid kit in hard case'),
('construction_tools_safety', 7, 'Steel Toe Boot Covers', 'Slip-on steel toe caps for existing footwear'),
('construction_tools_safety', 8, 'Dust Mask Respirator', 'Reusable dust mask with replaceable filters'),
('construction_tools_safety', 9, 'Fall Protection Harness', 'Full-body fall protection harness with D-ring'),
('construction_tools_safety', 10, 'Fire Extinguisher Portable', 'Compact ABC dry chemical fire extinguisher');

-- ============ garden_tools ============
INSERT INTO _product_names VALUES
('garden_tools', 1, 'Pruning Shears Professional', 'Sharp bypass pruning shears with ergonomic grip'),
('garden_tools', 2, 'Garden Trowel Set', 'Stainless steel hand trowel and fork set'),
('garden_tools', 3, 'Watering Can Copper', 'Elegant copper watering can with long spout'),
('garden_tools', 4, 'Kneeling Pad Garden', 'Thick memory foam garden kneeling pad'),
('garden_tools', 5, 'Plant Labels Bamboo', 'Natural bamboo plant markers for garden beds'),
('garden_tools', 6, 'Garden Hose Expandable', 'Lightweight expandable garden hose with spray nozzle'),
('garden_tools', 7, 'Seed Starting Kit', 'Indoor seed starting kit with trays and dome covers'),
('garden_tools', 8, 'Solar Garden Lights', 'Set of 8 solar-powered LED pathway lights'),
('garden_tools', 9, 'Compost Bin Kitchen', 'Countertop compost bin with charcoal odor filter'),
('garden_tools', 10, 'Gardening Gloves Set', 'Thorn-proof gardening gloves with long cuffs');

-- ============ telephony ============
INSERT INTO _product_names VALUES
('telephony', 1, 'Phone Case Protective', 'Shockproof phone case with raised bezel protection'),
('telephony', 2, 'Screen Protector Glass', 'Tempered glass screen protector with easy install kit'),
('telephony', 3, 'Car Phone Mount', 'Universal car phone mount with 360-degree rotation'),
('telephony', 4, 'Wireless Charging Pad', 'Slim wireless charging pad with LED indicator'),
('telephony', 5, 'Phone Grip Ring Stand', 'Foldable phone ring holder and kickstand'),
('telephony', 6, 'Charging Cable Braided', 'Braided nylon charging cable with reinforced connectors'),
('telephony', 7, 'Phone Armband Sports', 'Water-resistant phone armband for running and gym'),
('telephony', 8, 'SIM Card Adapter Kit', 'Multi-size SIM card adapter set with eject tool'),
('telephony', 9, 'Pop Socket Grip', 'Collapsible phone grip with swappable top'),
('telephony', 10, 'Phone Cleaning Kit', 'Screen cleaning spray with microfiber cloth');

-- ============ watches_gifts ============
INSERT INTO _product_names VALUES
('watches_gifts', 1, 'Classic Leather Watch', 'Minimalist analog watch with genuine leather strap'),
('watches_gifts', 2, 'Gift Box Deluxe Set', 'Premium gift box set with ribbon and tissue paper'),
('watches_gifts', 3, 'Digital Sports Watch', 'Rugged digital watch with stopwatch and alarm'),
('watches_gifts', 4, 'Jewelry Box Wooden', 'Handcrafted wooden jewelry box with velvet lining'),
('watches_gifts', 5, 'Luxury Pen Set', 'Metal ballpoint pen set in presentation case'),
('watches_gifts', 6, 'Watch Display Case', 'Leather watch organizer case for 6 watches'),
('watches_gifts', 7, 'Crystal Photo Frame', 'Elegant crystal photo frame for desk display'),
('watches_gifts', 8, 'Personalized Keychain', 'Custom engraved stainless steel keychain'),
('watches_gifts', 9, 'Scented Gift Candle', 'Luxury scented candle in decorative box'),
('watches_gifts', 10, 'Bracelet Charm Set', 'Sterling silver charm bracelet with starter charms');

-- ============ fashion_bags_accessories ============
INSERT INTO _product_names VALUES
('fashion_bags_accessories', 1, 'Leather Crossbody Bag', 'Genuine leather crossbody bag with adjustable strap'),
('fashion_bags_accessories', 2, 'Canvas Tote Bag', 'Durable canvas tote bag with inner pockets'),
('fashion_bags_accessories', 3, 'Minimalist Wallet', 'Slim RFID-blocking wallet with card slots'),
('fashion_bags_accessories', 4, 'Sunglasses Polarized', 'UV400 polarized sunglasses with classic frame'),
('fashion_bags_accessories', 5, 'Silk Scarf Print', 'Elegant silk scarf with artistic print design'),
('fashion_bags_accessories', 6, 'Laptop Sleeve Padded', 'Neoprene laptop sleeve with front accessory pocket'),
('fashion_bags_accessories', 7, 'Belt Genuine Leather', 'Classic leather belt with brushed metal buckle'),
('fashion_bags_accessories', 8, 'Weekend Travel Bag', 'Spacious weekender bag with shoe compartment'),
('fashion_bags_accessories', 9, 'Hat Fedora Classic', 'Wool fedora hat with grosgrain ribbon band'),
('fashion_bags_accessories', 10, 'Backpack Urban Style', 'Water-resistant urban backpack with USB charging port');

-- ============ stationery ============
INSERT INTO _product_names VALUES
('stationery', 1, 'Notebook Leather Bound', 'A5 leather journal with lined pages and bookmark'),
('stationery', 2, 'Fountain Pen Classic', 'Refillable fountain pen with smooth ink flow'),
('stationery', 3, 'Sticky Notes Assorted', 'Colorful sticky notes in 6 sizes and shapes'),
('stationery', 4, 'Desk Organizer Bamboo', 'Bamboo desk organizer with pen holder and drawers'),
('stationery', 5, 'Washi Tape Collection', 'Decorative washi tape set with 12 patterns'),
('stationery', 6, 'Planner Weekly Undated', 'Undated weekly planner with goal-setting pages'),
('stationery', 7, 'Colored Pencils Premium', 'Professional colored pencils in 48 vibrant shades'),
('stationery', 8, 'Paper Clips Assorted', 'Colorful paper clips in decorative tin container'),
('stationery', 9, 'Highlighter Set Pastel', 'Pastel highlighter markers in 6 soft colors'),
('stationery', 10, 'Envelope Set Kraft', 'Kraft paper envelopes and cards for correspondence');

-- ============ pet_shop ============
INSERT INTO _product_names VALUES
('pet_shop', 1, 'Interactive Dog Toy', 'Squeaky chew toy for active dogs with treat pocket'),
('pet_shop', 2, 'Cat Scratching Post', 'Sisal rope scratching post with plush platform'),
('pet_shop', 3, 'Pet Grooming Kit', 'Complete grooming set with brush, clippers, and comb'),
('pet_shop', 4, 'Adjustable Pet Harness', 'Breathable mesh harness with reflective strips'),
('pet_shop', 5, 'Stainless Steel Pet Bowl', 'Non-slip stainless steel food and water bowl set'),
('pet_shop', 6, 'Pet Carrier Travel', 'Airline-approved pet carrier with ventilation panels'),
('pet_shop', 7, 'Catnip Mouse Toy', 'Organic catnip-filled mouse toy for playful cats'),
('pet_shop', 8, 'Dog Leash Retractable', 'Retractable dog leash with comfortable grip handle'),
('pet_shop', 9, 'Pet Bed Orthopedic', 'Memory foam pet bed with washable cover'),
('pet_shop', 10, 'Aquarium LED Light', 'Submersible LED light strip for fish tanks');

-- ============ food_drink ============
INSERT INTO _product_names VALUES
('food_drink', 1, 'Organic Green Tea Box', 'Premium Japanese green tea bags in eco packaging'),
('food_drink', 2, 'Artisan Coffee Beans', 'Single-origin arabica coffee beans medium roast'),
('food_drink', 3, 'Dark Chocolate Collection', 'Assorted dark chocolate bars with 70-85% cacao'),
('food_drink', 4, 'Mixed Nuts Premium', 'Roasted mixed nuts with cashews, almonds, and walnuts'),
('food_drink', 5, 'Honey Raw Organic', 'Pure raw organic wildflower honey in glass jar'),
('food_drink', 6, 'Olive Oil Extra Virgin', 'Cold-pressed extra virgin olive oil from premium olives'),
('food_drink', 7, 'Herbal Tea Sampler', 'Caffeine-free herbal tea collection with 6 flavors'),
('food_drink', 8, 'Granola Bar Variety Pack', 'Wholesome granola bars in assorted flavors'),
('food_drink', 9, 'Spice Rack Set', 'Rotating spice rack with 12 essential spices'),
('food_drink', 10, 'Dried Fruit Mix', 'Natural dried fruit blend with no added sugar');

-- ============ food ============
INSERT INTO _product_names VALUES
('food', 1, 'Gourmet Pasta Set', 'Italian artisan pasta variety pack with 4 shapes'),
('food', 2, 'Organic Quinoa Pack', 'Triple-washed organic quinoa in resealable bag'),
('food', 3, 'Balsamic Vinegar Aged', 'Aged balsamic vinegar from traditional methods'),
('food', 4, 'Protein Energy Bars', 'High-protein snack bars with natural ingredients'),
('food', 5, 'Sea Salt Flakes', 'Hand-harvested sea salt flakes for finishing dishes'),
('food', 6, 'Coconut Oil Virgin', 'Cold-pressed virgin coconut oil for cooking and beauty'),
('food', 7, 'Trail Mix Organic', 'Organic trail mix with seeds, nuts, and berries'),
('food', 8, 'Rice Basmati Premium', 'Aged premium basmati rice with long grains'),
('food', 9, 'Maple Syrup Pure', 'Grade A pure maple syrup in glass bottle'),
('food', 10, 'Chia Seeds Organic', 'Certified organic chia seeds rich in omega-3');

-- ============ drinks ============
INSERT INTO _product_names VALUES
('drinks', 1, 'Sparkling Water Variety', 'Natural sparkling water in assorted fruit flavors'),
('drinks', 2, 'Cold Brew Coffee Pack', 'Ready-to-drink cold brew coffee concentrate'),
('drinks', 3, 'Kombucha Starter Kit', 'Organic kombucha brewing kit with SCOBY'),
('drinks', 4, 'Fruit Juice Pressed', 'Cold-pressed mixed fruit juice with no preservatives'),
('drinks', 5, 'Matcha Powder Ceremonial', 'Stone-ground ceremonial grade matcha green tea powder'),
('drinks', 6, 'Coconut Water Natural', 'Pure coconut water with no added sugar'),
('drinks', 7, 'Protein Shake Mix', 'Whey protein shake powder in chocolate flavor'),
('drinks', 8, 'Herbal Infusion Set', 'Dried herbal infusion flowers for brewing'),
('drinks', 9, 'Energy Drink Natural', 'Plant-based energy drink with green tea extract'),
('drinks', 10, 'Smoothie Bowl Mix', 'Freeze-dried smoothie bowl base with superfoods');

-- ============ luggage_accessories ============
INSERT INTO _product_names VALUES
('luggage_accessories', 1, 'Travel Packing Cubes Set', 'Compression packing cubes in 4 sizes for organized travel'),
('luggage_accessories', 2, 'Luggage Tag Leather', 'Genuine leather luggage tag with privacy flap'),
('luggage_accessories', 3, 'TSA Approved Lock', 'Combination TSA lock for secure luggage'),
('luggage_accessories', 4, 'Travel Pillow Memory Foam', 'Ergonomic memory foam neck pillow for flights'),
('luggage_accessories', 5, 'Passport Holder Wallet', 'RFID-blocking passport wallet with card slots'),
('luggage_accessories', 6, 'Toiletry Bag Hanging', 'Waterproof hanging toiletry bag with compartments'),
('luggage_accessories', 7, 'Luggage Scale Digital', 'Compact digital luggage scale with LCD display'),
('luggage_accessories', 8, 'Travel Adapter Universal', 'Universal power adapter for 150+ countries'),
('luggage_accessories', 9, 'Eye Mask Sleep', 'Silk sleep mask with adjustable elastic strap'),
('luggage_accessories', 10, 'Compression Socks Travel', 'Graduated compression socks for long flights');

-- ============ consoles_games ============
INSERT INTO _product_names VALUES
('consoles_games', 1, 'Wireless Game Controller', 'Ergonomic wireless controller with vibration feedback'),
('consoles_games', 2, 'Gaming Headset Surround', '7.1 surround sound gaming headset with mic'),
('consoles_games', 3, 'Controller Charging Dock', 'Dual controller charging dock with LED indicators'),
('consoles_games', 4, 'Gaming Mouse Pad XL', 'Extended RGB gaming mouse pad with smooth surface'),
('consoles_games', 5, 'Console Cooling Stand', 'Vertical cooling stand with fan and USB hub'),
('consoles_games', 6, 'Game Card Storage Case', 'Portable game card storage case for 24 cards'),
('consoles_games', 7, 'HDMI Cable Gaming', 'High-speed HDMI 2.1 cable for 4K gaming'),
('consoles_games', 8, 'Thumb Grip Caps', 'Silicone thumb grip caps for better control'),
('consoles_games', 9, 'Gaming Chair Cushion', 'Lumbar support cushion for gaming chairs'),
('consoles_games', 10, 'Screen Cleaning Kit Gaming', 'Anti-static screen cleaning spray for gaming displays');

-- ============ audio ============
INSERT INTO _product_names VALUES
('audio', 1, 'Over-Ear Studio Headphones', 'Professional studio monitor headphones with flat response'),
('audio', 2, 'Portable DAC Amplifier', 'Compact USB DAC/amplifier for high-res audio'),
('audio', 3, 'Bookshelf Speakers Pair', 'Passive bookshelf speakers with wood veneer finish'),
('audio', 4, 'In-Ear Monitors', 'Dual-driver in-ear monitors with detachable cable'),
('audio', 5, 'Turntable Record Player', 'Belt-drive turntable with built-in preamp'),
('audio', 6, 'Audio Cable Premium', 'Gold-plated 3.5mm audio cable with braided jacket'),
('audio', 7, 'Soundbar Compact', 'Slim soundbar with Bluetooth and optical input'),
('audio', 8, 'Headphone Amp Desktop', 'Tube headphone amplifier with warm analog sound'),
('audio', 9, 'Replacement Ear Pads', 'Memory foam replacement ear pads for headphones'),
('audio', 10, 'Audio Splitter Hub', '3.5mm audio splitter for sharing music');

-- ============ cine_photo ============
INSERT INTO _product_names VALUES
('cine_photo', 1, 'Camera Tripod Aluminum', 'Lightweight aluminum tripod with ball head mount'),
('cine_photo', 2, 'Camera Lens Filter Set', 'UV, CPL, and ND filter kit for DSLR lenses'),
('cine_photo', 3, 'Memory Card SD 128GB', 'High-speed SD card for 4K video recording'),
('cine_photo', 4, 'Camera Bag Messenger', 'Padded messenger-style camera bag with dividers'),
('cine_photo', 5, 'Photo Backdrop Kit', 'Portable backdrop stand with white and green screens'),
('cine_photo', 6, 'Ring Light LED', 'Adjustable LED ring light with phone holder and remote'),
('cine_photo', 7, 'Camera Cleaning Kit', 'Professional lens cleaning kit with blower and wipes'),
('cine_photo', 8, 'Gimbal Stabilizer Phone', '3-axis gimbal stabilizer for smooth smartphone video'),
('cine_photo', 9, 'Photo Album Linen', 'Self-adhesive linen photo album with 60 pages'),
('cine_photo', 10, 'Flash Diffuser Set', 'Soft box flash diffuser set for portrait photography');

-- ============ fashion_shoes ============
INSERT INTO _product_names VALUES
('fashion_shoes', 1, 'Canvas Sneakers Classic', 'Timeless canvas sneakers with vulcanized rubber sole'),
('fashion_shoes', 2, 'Leather Ankle Boots', 'Full-grain leather ankle boots with side zipper'),
('fashion_shoes', 3, 'Slip-On Loafers', 'Comfortable slip-on loafers with cushioned insole'),
('fashion_shoes', 4, 'Sandals Strappy', 'Adjustable strappy sandals with memory foam footbed'),
('fashion_shoes', 5, 'Running Trainers Mesh', 'Lightweight mesh trainers with responsive cushioning'),
('fashion_shoes', 6, 'Slippers House Cozy', 'Plush lined house slippers with non-slip sole'),
('fashion_shoes', 7, 'Rain Boots Waterproof', 'Stylish waterproof rain boots with pull-on design'),
('fashion_shoes', 8, 'Espadrilles Summer', 'Casual espadrilles with jute sole for summer'),
('fashion_shoes', 9, 'Oxford Dress Shoes', 'Classic oxford shoes with polished leather finish'),
('fashion_shoes', 10, 'Shoe Care Kit', 'Complete shoe care set with polish, brush, and cloth');

-- ============ fashion_male_clothing ============
INSERT INTO _product_names VALUES
('fashion_male_clothing', 1, 'Oxford Button-Down Shirt', 'Classic cotton oxford shirt with button-down collar'),
('fashion_male_clothing', 2, 'Slim Fit Chinos', 'Stretch cotton chinos with modern slim fit'),
('fashion_male_clothing', 3, 'Crew Neck T-Shirt Pack', 'Essential crew neck tee pack in 3 basic colors'),
('fashion_male_clothing', 4, 'Denim Jacket Classic', 'Medium-wash denim jacket with brass button closure'),
('fashion_male_clothing', 5, 'Merino Wool Sweater', 'Fine merino wool sweater with crew neck'),
('fashion_male_clothing', 6, 'Jogger Pants Comfort', 'Tapered jogger pants with elastic waistband'),
('fashion_male_clothing', 7, 'Linen Shirt Summer', 'Breathable linen shirt perfect for warm weather'),
('fashion_male_clothing', 8, 'Puffer Vest Lightweight', 'Packable lightweight puffer vest with zip front'),
('fashion_male_clothing', 9, 'Polo Shirt Classic', 'Piqué cotton polo shirt with ribbed collar'),
('fashion_male_clothing', 10, 'Boxer Brief Pack', 'Comfortable stretch boxer briefs in 4-pack');

-- ============ fashio_female_clothing ============
INSERT INTO _product_names VALUES
('fashio_female_clothing', 1, 'Wrap Dress Floral', 'Flattering wrap dress with botanical print'),
('fashio_female_clothing', 2, 'High-Waist Jeans', 'Stretch denim high-waist jeans with classic wash'),
('fashio_female_clothing', 3, 'Blouse Silk V-Neck', 'Elegant silk blouse with V-neckline and cuffs'),
('fashio_female_clothing', 4, 'Cardigan Knit Oversized', 'Cozy oversized knit cardigan with button front'),
('fashio_female_clothing', 5, 'Midi Skirt Pleated', 'Flowing pleated midi skirt in solid color'),
('fashio_female_clothing', 6, 'Tank Top Ribbed Pack', 'Ribbed tank top essentials in 3-pack'),
('fashio_female_clothing', 7, 'Trench Coat Belted', 'Classic double-breasted trench coat with belt'),
('fashio_female_clothing', 8, 'Leggings High-Waist', 'Buttery-soft high-waist leggings with side pocket'),
('fashio_female_clothing', 9, 'Blazer Tailored', 'Single-breasted tailored blazer for workwear'),
('fashio_female_clothing', 10, 'Jumpsuit Casual', 'Relaxed-fit cotton jumpsuit with waist tie');

-- ============ fashion_sport ============
INSERT INTO _product_names VALUES
('fashion_sport', 1, 'Athletic Shorts Quick-Dry', 'Moisture-wicking athletic shorts with liner'),
('fashion_sport', 2, 'Sports Bra Medium Support', 'Supportive sports bra with racerback design'),
('fashion_sport', 3, 'Track Jacket Zip-Up', 'Lightweight track jacket with zip pockets'),
('fashion_sport', 4, 'Gym Tank Top Mesh', 'Breathable mesh tank top for intense workouts'),
('fashion_sport', 5, 'Sweatpants Fleece', 'Fleece-lined sweatpants with tapered leg'),
('fashion_sport', 6, 'Headband Sport Pack', 'Non-slip sport headbands in assorted colors'),
('fashion_sport', 7, 'Windbreaker Hooded', 'Packable hooded windbreaker with reflective details'),
('fashion_sport', 8, 'Cycling Jersey Short Sleeve', 'Aerodynamic cycling jersey with rear pockets'),
('fashion_sport', 9, 'Compression Tights Long', 'Full-length compression tights for support'),
('fashion_sport', 10, 'Gym Bag Duffel', 'Spacious gym duffel bag with shoe compartment');

-- ============ fashion_underwear_beach ============
INSERT INTO _product_names VALUES
('fashion_underwear_beach', 1, 'Beach Towel Oversized', 'Quick-dry oversized beach towel in tropical print'),
('fashion_underwear_beach', 2, 'Swim Trunks Board Shorts', 'Quick-dry swim trunks with stretch fabric'),
('fashion_underwear_beach', 3, 'Bikini Set Two-Piece', 'Adjustable two-piece bikini set in solid colors'),
('fashion_underwear_beach', 4, 'Sarong Cover-Up', 'Lightweight sarong wrap for beach cover-up'),
('fashion_underwear_beach', 5, 'Flip Flops Comfort', 'Arch-support flip flops with cushioned sole'),
('fashion_underwear_beach', 6, 'Rash Guard UV Protection', 'UPF 50+ long-sleeve rash guard for water sports'),
('fashion_underwear_beach', 7, 'Underwear Cotton Pack', 'Comfortable cotton underwear essentials in 5-pack'),
('fashion_underwear_beach', 8, 'Beach Bag Straw', 'Large woven straw beach tote with zipper closure'),
('fashion_underwear_beach', 9, 'One-Piece Swimsuit', 'Sporty one-piece swimsuit with open back design'),
('fashion_underwear_beach', 10, 'Swim Cap Silicone', 'Durable silicone swim cap for pool and open water');

-- ============ fashion_childrens_clothes ============
INSERT INTO _product_names VALUES
('fashion_childrens_clothes', 1, 'Kids Graphic T-Shirt', 'Fun printed cotton t-shirt for kids'),
('fashion_childrens_clothes', 2, 'Children Denim Overalls', 'Adjustable denim overalls with snap closures'),
('fashion_childrens_clothes', 3, 'Girls Tutu Dress', 'Sparkle tutu dress for parties and dress-up'),
('fashion_childrens_clothes', 4, 'Boys Cargo Shorts', 'Durable cargo shorts with elastic waistband'),
('fashion_childrens_clothes', 5, 'Kids Raincoat Hooded', 'Waterproof hooded raincoat with fun prints'),
('fashion_childrens_clothes', 6, 'Children Pajama Set', 'Soft cotton pajama set with matching top and bottom'),
('fashion_childrens_clothes', 7, 'Girls Hair Accessories Set', 'Colorful hair clips, bows, and elastics set'),
('fashion_childrens_clothes', 8, 'Boys Hoodie Zip-Up', 'Cozy fleece zip-up hoodie with front pockets'),
('fashion_childrens_clothes', 9, 'Kids Sock Pack', 'Fun patterned socks in 6-pair pack'),
('fashion_childrens_clothes', 10, 'Children Sun Hat', 'Wide-brim sun hat with adjustable chin strap');

-- ============ small_appliances ============
INSERT INTO _product_names VALUES
('small_appliances', 1, 'Mini Waffle Maker', 'Compact waffle maker with non-stick plates'),
('small_appliances', 2, 'Electric Can Opener', 'One-touch electric can opener with smooth edge'),
('small_appliances', 3, 'Personal Blender', 'Single-serve blender with travel cup lid'),
('small_appliances', 4, 'Egg Cooker Electric', 'Automatic egg cooker for up to 7 eggs'),
('small_appliances', 5, 'Food Chopper Manual', 'Pull-cord manual food chopper and dicer'),
('small_appliances', 6, 'Electric Milk Frother', 'Handheld milk frother for lattes and cappuccinos'),
('small_appliances', 7, 'Sandwich Press Grill', 'Panini press with floating hinge and drip tray'),
('small_appliances', 8, 'Popcorn Maker Hot Air', 'Hot air popcorn popper with no oil needed'),
('small_appliances', 9, 'Ice Cream Maker Home', 'Automatic ice cream maker with 1.5L capacity'),
('small_appliances', 10, 'Citrus Juicer Electric', 'Electric citrus juicer with pulp control');

-- ============ small_appliances_home_oven_and_coffee ============
INSERT INTO _product_names VALUES
('small_appliances_home_oven_and_coffee', 1, 'Pour Over Coffee Maker', 'Glass pour-over coffee dripper with reusable filter'),
('small_appliances_home_oven_and_coffee', 2, 'Toaster Oven Compact', 'Compact toaster oven with bake, broil, and toast'),
('small_appliances_home_oven_and_coffee', 3, 'French Press Coffee', 'Double-wall stainless steel French press'),
('small_appliances_home_oven_and_coffee', 4, 'Moka Pot Stovetop', 'Italian-style stovetop moka pot for espresso'),
('small_appliances_home_oven_and_coffee', 5, 'Electric Oven Countertop', 'Countertop convection oven with rotisserie'),
('small_appliances_home_oven_and_coffee', 6, 'Coffee Grinder Burr', 'Conical burr coffee grinder with 15 settings'),
('small_appliances_home_oven_and_coffee', 7, 'Pizza Oven Portable', 'Portable pizza oven reaching high temperatures'),
('small_appliances_home_oven_and_coffee', 8, 'Drip Coffee Machine', 'Programmable drip coffee maker with thermal carafe'),
('small_appliances_home_oven_and_coffee', 9, 'Air Fryer Compact', 'Digital air fryer with 4L basket and presets'),
('small_appliances_home_oven_and_coffee', 10, 'Cold Brew Coffee Maker', 'Cold brew coffee maker with built-in filter');

-- ============ auto ============
INSERT INTO _product_names VALUES
('auto', 1, 'Car Dashboard Camera', 'HD dashcam with night vision and G-sensor'),
('auto', 2, 'Tire Pressure Gauge Digital', 'Digital tire pressure gauge with backlit display'),
('auto', 3, 'Car Seat Organizer', 'Back seat organizer with tablet holder and pockets'),
('auto', 4, 'Emergency Car Kit', 'Roadside emergency kit with jumper cables and flashlight'),
('auto', 5, 'Air Freshener Car Set', 'Long-lasting car air freshener clips in 3 scents'),
('auto', 6, 'Steering Wheel Cover', 'Leather steering wheel cover with anti-slip grip'),
('auto', 7, 'Trunk Storage Organizer', 'Collapsible trunk organizer with multiple compartments'),
('auto', 8, 'Car Vacuum Portable', 'Cordless handheld car vacuum with strong suction'),
('auto', 9, 'Windshield Sun Shade', 'Foldable UV-reflective windshield sunshade'),
('auto', 10, 'Car Phone Charger Fast', 'Fast-charging car charger with dual USB ports');

-- ============ books_general_interest ============
INSERT INTO _product_names VALUES
('books_general_interest', 1, 'Bestseller Novel Collection', 'Curated collection of top-rated fiction novels'),
('books_general_interest', 2, 'Self-Help Guide Book', 'Motivational self-improvement book for personal growth'),
('books_general_interest', 3, 'Cookbook World Cuisines', 'International cookbook with 200 recipes and photos'),
('books_general_interest', 4, 'History Atlas Illustrated', 'Illustrated atlas of world history with maps'),
('books_general_interest', 5, 'Mystery Thriller Novel', 'Gripping mystery thriller with unexpected twists'),
('books_general_interest', 6, 'Biography Inspiring Leaders', 'Biographical stories of inspiring world leaders'),
('books_general_interest', 7, 'Travel Guide Book', 'Comprehensive travel guide with insider tips'),
('books_general_interest', 8, 'Poetry Anthology Classic', 'Classic poetry anthology spanning centuries'),
('books_general_interest', 9, 'Mindfulness Meditation Book', 'Practical guide to mindfulness and daily meditation'),
('books_general_interest', 10, 'Photography Coffee Table Book', 'Stunning photography book for display and inspiration');

-- ============ books_technical ============
INSERT INTO _product_names VALUES
('books_technical', 1, 'Programming Java Guide', 'Comprehensive Java programming reference book'),
('books_technical', 2, 'Data Structures Textbook', 'Algorithms and data structures academic textbook'),
('books_technical', 3, 'Database Design Manual', 'Practical guide to database design and SQL'),
('books_technical', 4, 'Web Development Handbook', 'Full-stack web development with modern frameworks'),
('books_technical', 5, 'Machine Learning Intro', 'Introduction to machine learning with Python examples'),
('books_technical', 6, 'Network Security Guide', 'Cybersecurity fundamentals and best practices'),
('books_technical', 7, 'Cloud Computing Essentials', 'Guide to cloud architecture and deployment'),
('books_technical', 8, 'Electronics Fundamentals', 'Basic electronics and circuit design textbook'),
('books_technical', 9, 'Linux Administration', 'System administration guide for Linux servers'),
('books_technical', 10, 'Software Engineering Principles', 'Modern software engineering methodologies and practices');

-- ============ books_imported ============
INSERT INTO _product_names VALUES
('books_imported', 1, 'International Bestseller Novel', 'Award-winning translated fiction from international authors'),
('books_imported', 2, 'Foreign Language Reader', 'Bilingual reader for intermediate language learners'),
('books_imported', 3, 'Japanese Manga Collection', 'Popular manga series in original print edition'),
('books_imported', 4, 'French Literature Classic', 'Classic French literature in original language'),
('books_imported', 5, 'Art History Import Edition', 'Imported art history book with full-color plates'),
('books_imported', 6, 'Scientific Journal Collection', 'Curated scientific journal articles and papers'),
('books_imported', 7, 'Architecture Design Book', 'Imported architectural design showcase volume'),
('books_imported', 8, 'Philosophy Reader Import', 'International philosophy reader with commentary'),
('books_imported', 9, 'Graphic Novel Premium Edition', 'Deluxe imported graphic novel with premium binding'),
('books_imported', 10, 'Travel Photography Import', 'Imported travel photography book with global vistas');

-- ============ All remaining categories with generic but appropriate names ============
-- For categories not explicitly listed above, generate names dynamically

-- diapers_and_hygiene
INSERT INTO _product_names VALUES
('diapers_and_hygiene', 1, 'Baby Diapers Mega Pack', 'Ultra-absorbent diapers with wetness indicator'),
('diapers_and_hygiene', 2, 'Baby Wipes Sensitive', 'Fragrance-free baby wipes for sensitive skin'),
('diapers_and_hygiene', 3, 'Diaper Cream Protective', 'Zinc oxide diaper rash cream for baby care'),
('diapers_and_hygiene', 4, 'Training Pants Toddler', 'Pull-up training pants for potty training'),
('diapers_and_hygiene', 5, 'Changing Pad Portable', 'Foldable waterproof changing pad for travel'),
('diapers_and_hygiene', 6, 'Hand Sanitizer Travel Pack', 'Moisturizing hand sanitizer in travel-size bottles'),
('diapers_and_hygiene', 7, 'Diaper Bag Organizer', 'Compact diaper bag insert with multiple pockets'),
('diapers_and_hygiene', 8, 'Cotton Pads Organic', 'Organic cotton pads for skincare and hygiene'),
('diapers_and_hygiene', 9, 'Wet Bag Reusable', 'Waterproof reusable wet bag for cloth diapers'),
('diapers_and_hygiene', 10, 'Baby Shampoo Gentle', 'Tear-free baby shampoo with natural ingredients');

-- party_supplies
INSERT INTO _product_names VALUES
('party_supplies', 1, 'Balloon Garland Kit', 'DIY balloon garland kit with 100 balloons and tape'),
('party_supplies', 2, 'Paper Plate Set Decorative', 'Themed paper plates and napkins set for 20 guests'),
('party_supplies', 3, 'Party Banner Customizable', 'Letter banner set for custom party messages'),
('party_supplies', 4, 'Confetti Cannon Pack', 'Biodegradable confetti poppers in metallic colors'),
('party_supplies', 5, 'Cupcake Stand Tiered', 'Three-tier cupcake display stand for parties'),
('party_supplies', 6, 'Photo Booth Props Set', 'Fun photo booth props set with 30 pieces'),
('party_supplies', 7, 'String Lights Fairy', 'Warm white fairy string lights for decoration'),
('party_supplies', 8, 'Gift Wrap Paper Roll', 'Premium gift wrapping paper in festive designs'),
('party_supplies', 9, 'Party Hat Pack', 'Colorful party hats with elastic chin straps'),
('party_supplies', 10, 'Pinata Star Shape', 'Star-shaped pinata ready to fill with treats');

-- christmas_supplies
INSERT INTO _product_names VALUES
('christmas_supplies', 1, 'Christmas Tree Ornaments Set', 'Shatterproof ornaments in red and gold, 30 pieces'),
('christmas_supplies', 2, 'LED Christmas Lights String', 'Multi-color LED string lights with 8 modes'),
('christmas_supplies', 3, 'Advent Calendar Wooden', 'Reusable wooden advent calendar with drawers'),
('christmas_supplies', 4, 'Gift Tags Holiday Pack', 'Assorted holiday gift tags with ribbon ties'),
('christmas_supplies', 5, 'Wreath Door Hanger', 'Artificial evergreen wreath with red berries'),
('christmas_supplies', 6, 'Stocking Knit Set', 'Hand-knit Christmas stockings in 4-pack'),
('christmas_supplies', 7, 'Table Centerpiece Holiday', 'Festive table centerpiece with candle holder'),
('christmas_supplies', 8, 'Cookie Cutter Holiday Set', 'Christmas-themed cookie cutters in 12 shapes'),
('christmas_supplies', 9, 'Snow Globe Musical', 'Musical snow globe with winter wonderland scene'),
('christmas_supplies', 10, 'Tree Topper Star LED', 'Light-up star tree topper with warm white LEDs');

-- flowers
INSERT INTO _product_names VALUES
('flowers', 1, 'Fresh Rose Bouquet', 'Hand-arranged bouquet of 12 long-stem roses'),
('flowers', 2, 'Succulent Planter Set', 'Set of 3 mini succulents in ceramic planters'),
('flowers', 3, 'Dried Flower Arrangement', 'Preserved dried flower bouquet in earthy tones'),
('flowers', 4, 'Orchid Plant Potted', 'Live phalaenopsis orchid in decorative pot'),
('flowers', 5, 'Flower Seed Mix Pack', 'Wildflower seed mix for garden planting'),
('flowers', 6, 'Vase Glass Minimalist', 'Clear glass vase with modern minimalist design'),
('flowers', 7, 'Artificial Flower Garland', 'Realistic artificial flower garland for decor'),
('flowers', 8, 'Herb Garden Kit Indoor', 'Indoor herb growing kit with basil, mint, and cilantro'),
('flowers', 9, 'Flower Press Kit', 'Wooden flower press for preserving botanical specimens'),
('flowers', 10, 'Bonsai Tree Starter', 'Bonsai tree growing kit with seeds and tools');

-- office_furniture
INSERT INTO _product_names VALUES
('office_furniture', 1, 'Ergonomic Office Chair', 'Mesh-back ergonomic chair with lumbar support'),
('office_furniture', 2, 'Standing Desk Converter', 'Height-adjustable desk converter for sit-stand work'),
('office_furniture', 3, 'Bookshelf 5-Tier', 'Open 5-tier bookshelf with industrial design'),
('office_furniture', 4, 'File Cabinet 3-Drawer', 'Locking 3-drawer metal file cabinet on casters'),
('office_furniture', 5, 'Desk Mat Leather', 'Large leather desk mat with mouse pad area'),
('office_furniture', 6, 'Monitor Stand Riser', 'Wooden monitor riser with storage drawer'),
('office_furniture', 7, 'Whiteboard Magnetic', 'Wall-mount magnetic whiteboard with marker tray'),
('office_furniture', 8, 'Desk Lamp Adjustable', 'LED desk lamp with adjustable arm and dimming'),
('office_furniture', 9, 'Cable Tray Under-Desk', 'Under-desk cable management tray for tidy workspace'),
('office_furniture', 10, 'Footrest Ergonomic', 'Adjustable ergonomic footrest for desk workers');

-- furniture_bedroom
INSERT INTO _product_names VALUES
('furniture_bedroom', 1, 'Bedside Table Nightstand', 'Modern nightstand with drawer and open shelf'),
('furniture_bedroom', 2, 'Wardrobe Organizer Set', 'Closet organizer set with shelves and hanging rods'),
('furniture_bedroom', 3, 'Bed Frame Platform', 'Sturdy platform bed frame with wooden slats'),
('furniture_bedroom', 4, 'Dresser 6-Drawer', 'Classic 6-drawer dresser in natural wood finish'),
('furniture_bedroom', 5, 'Vanity Mirror LED', 'Tabletop vanity mirror with LED lighting'),
('furniture_bedroom', 6, 'Under-Bed Storage Bins', 'Flat storage bins designed to fit under beds'),
('furniture_bedroom', 7, 'Headboard Upholstered', 'Padded upholstered headboard with tufted design'),
('furniture_bedroom', 8, 'Blanket Ladder Rack', 'Decorative wooden ladder rack for blankets'),
('furniture_bedroom', 9, 'Jewelry Organizer Wall', 'Wall-mounted jewelry organizer with mirror'),
('furniture_bedroom', 10, 'Reading Lamp Bedside', 'Flexible bedside reading lamp with warm light');

-- furniture_living_room
INSERT INTO _product_names VALUES
('furniture_living_room', 1, 'Coffee Table Modern', 'Rectangular coffee table with storage shelf'),
('furniture_living_room', 2, 'TV Stand Entertainment', 'TV console stand with cable management and shelves'),
('furniture_living_room', 3, 'Floor Lamp Arc', 'Elegant arc floor lamp with marble base'),
('furniture_living_room', 4, 'Ottoman Storage Cube', 'Foldable storage ottoman with padded top'),
('furniture_living_room', 5, 'Area Rug Geometric', 'Soft area rug with contemporary geometric pattern'),
('furniture_living_room', 6, 'Curtains Blackout Set', 'Thermal blackout curtains in neutral tones'),
('furniture_living_room', 7, 'Magazine Rack Metal', 'Freestanding metal magazine and newspaper rack'),
('furniture_living_room', 8, 'Console Table Entry', 'Narrow console table for entryway with drawers'),
('furniture_living_room', 9, 'Clock Wall Modern', 'Silent wall clock with modern minimalist design'),
('furniture_living_room', 10, 'Throw Blanket Fleece', 'Ultra-soft fleece throw blanket for sofa');

-- furniture_mattress_and_upholstery
INSERT INTO _product_names VALUES
('furniture_mattress_and_upholstery', 1, 'Memory Foam Mattress Topper', 'Cooling gel memory foam mattress topper'),
('furniture_mattress_and_upholstery', 2, 'Seat Cushion Ergonomic', 'Ergonomic seat cushion with coccyx cutout'),
('furniture_mattress_and_upholstery', 3, 'Sofa Slipcover Stretch', 'Elastic stretch slipcover to protect and refresh sofas'),
('furniture_mattress_and_upholstery', 4, 'Foam Padding Sheet', 'High-density foam sheet for DIY upholstery projects'),
('furniture_mattress_and_upholstery', 5, 'Chair Pads Dining Set', 'Non-slip dining chair pads with ties, set of 4'),
('furniture_mattress_and_upholstery', 6, 'Mattress Protector Queen', 'Waterproof zippered mattress protector for queen beds'),
('furniture_mattress_and_upholstery', 7, 'Bolster Pillow Cylindrical', 'Firm cylindrical bolster pillow for neck support'),
('furniture_mattress_and_upholstery', 8, 'Fabric Upholstery Sample', 'Premium upholstery fabric swatch bundle'),
('furniture_mattress_and_upholstery', 9, 'Wedge Pillow Incline', 'Foam wedge pillow for elevated sleeping'),
('furniture_mattress_and_upholstery', 10, 'Futon Mattress Foldable', 'Tri-fold futon mattress for guest sleeping');

-- Remaining categories with generic appropriate names
INSERT INTO _product_names VALUES
('computers', 1, 'Desktop Computer Bundle', 'Complete desktop setup with monitor and peripherals'),
('computers', 2, 'Laptop Cooling Pad', 'Dual-fan laptop cooling pad with adjustable height'),
('computers', 3, 'RAM Memory Upgrade', 'DDR4 memory module for desktop upgrades'),
('computers', 4, 'SSD Internal Drive', 'High-speed internal SSD for system upgrades'),
('computers', 5, 'Wireless Network Card', 'PCIe Wi-Fi 6 network adapter with antenna'),
('computers', 6, 'USB Flash Drive 64GB', 'Compact USB 3.0 flash drive with cap'),
('computers', 7, 'Computer Speakers Stereo', 'Compact stereo speakers with USB power'),
('computers', 8, 'Webcam Cover Slide', 'Ultra-thin webcam privacy cover slide 3-pack'),
('computers', 9, 'Thermal Paste Compound', 'High-performance thermal compound for CPU cooling'),
('computers', 10, 'Anti-Glare Screen Film', 'Matte anti-glare screen protector for monitors');

INSERT INTO _product_names VALUES
('home_appliances_2', 1, 'Cordless Handheld Vacuum', 'Lightweight cordless vacuum for quick cleanups'),
('home_appliances_2', 2, 'Steam Iron Compact', 'Compact travel steam iron with non-stick soleplate'),
('home_appliances_2', 3, 'Electric Heater Portable', 'Ceramic portable heater with thermostat control'),
('home_appliances_2', 4, 'Dehumidifier Small Room', 'Mini dehumidifier for closets and small spaces'),
('home_appliances_2', 5, 'Fan Desk USB', 'Quiet USB desk fan with tilt adjustment'),
('home_appliances_2', 6, 'Sewing Machine Beginner', 'Easy-to-use sewing machine with 12 stitch patterns'),
('home_appliances_2', 7, 'Water Filter Pitcher', 'Filtered water pitcher with replaceable cartridge'),
('home_appliances_2', 8, 'Insect Repellent Lamp', 'UV insect trap lamp for indoor use'),
('home_appliances_2', 9, 'Air Freshener Electric', 'Plug-in electric air freshener with refills'),
('home_appliances_2', 10, 'Lint Remover Electric', 'Rechargeable electric lint remover for fabrics');

INSERT INTO _product_names VALUES
('home_comfort_2', 1, 'Heated Blanket Electric', 'Electric heated throw blanket with auto shut-off'),
('home_comfort_2', 2, 'Aromatherapy Diffuser', 'Ultrasonic essential oil diffuser with LED mood light'),
('home_comfort_2', 3, 'Foot Massager Electric', 'Shiatsu foot massager with heat therapy'),
('home_comfort_2', 4, 'White Noise Machine', 'Sleep sound machine with 20 soothing sounds'),
('home_comfort_2', 5, 'Neck Massager Pillow', 'Heated neck and shoulder massage pillow'),
('home_comfort_2', 6, 'Indoor Thermometer Hygrometer', 'Digital room thermometer with humidity display'),
('home_comfort_2', 7, 'Blackout Sleep Curtains', 'Room-darkening curtains for better sleep'),
('home_comfort_2', 8, 'Cushion Seat Warming', 'USB-powered warming seat cushion for cold days'),
('home_comfort_2', 9, 'Dawn Simulator Alarm', 'Sunrise alarm clock with gradual light increase'),
('home_comfort_2', 10, 'Cozy Socks Gift Set', 'Ultra-soft fuzzy socks in gift box set');

INSERT INTO _product_names VALUES
('home_confort', 1, 'Memory Foam Slippers', 'Indoor memory foam slippers with arch support'),
('home_confort', 2, 'Throw Pillow Velvet', 'Velvet decorative throw pillow with zipper'),
('home_confort', 3, 'Bathrobe Plush', 'Plush microfiber bathrobe with shawl collar'),
('home_confort', 4, 'Hot Water Bottle', 'Classic rubber hot water bottle with knit cover'),
('home_confort', 5, 'Candle Set Relaxation', 'Relaxing scented candle set for self-care'),
('home_confort', 6, 'Reading Pillow Backrest', 'Firm reading pillow with arms for bed support'),
('home_confort', 7, 'Electric Blanket Throw', 'Soft electric throw blanket with 3 heat settings'),
('home_confort', 8, 'Body Pillow Full Length', 'Full-length body pillow with breathable cover'),
('home_confort', 9, 'Humidifier Essential Oil', 'Cool mist humidifier compatible with essential oils'),
('home_confort', 10, 'Foot Warmer Electric', 'Cozy electric foot warmer with fleece lining');

INSERT INTO _product_names VALUES
('home_construction', 1, 'Paint Roller Set', 'Paint roller kit with tray, roller, and covers'),
('home_construction', 2, 'Caulk Gun Professional', 'Smooth-rod caulking gun for sealant application'),
('home_construction', 3, 'Tile Spacers Pack', 'Tile spacers in multiple sizes for even grouting'),
('home_construction', 4, 'Sandpaper Assortment', 'Sandpaper variety pack in grits from 60 to 400'),
('home_construction', 5, 'Wall Anchor Kit', 'Heavy-duty wall anchor set with screws and drill bit'),
('home_construction', 6, 'Paintbrush Set Assorted', 'Assorted paintbrush set for trim and detail work'),
('home_construction', 7, 'Measuring Tape 25ft', 'Heavy-duty retractable measuring tape with lock'),
('home_construction', 8, 'Level Torpedo Magnetic', 'Compact magnetic torpedo level with 3 vials'),
('home_construction', 9, 'Plumbing Tape Roll', 'PTFE thread seal tape for pipe connections'),
('home_construction', 10, 'Light Switch Plate Cover', 'Decorator wall plate covers in white, 5-pack');

INSERT INTO _product_names VALUES
('construction_tools_construction', 1, 'Drill Bit Set', 'Titanium drill bit set for metal, wood, and plastic'),
('construction_tools_construction', 2, 'Socket Wrench Set', 'Ratcheting socket wrench set in carrying case'),
('construction_tools_construction', 3, 'Saw Hand Crosscut', 'Sharp crosscut hand saw with ergonomic handle'),
('construction_tools_construction', 4, 'Hammer Claw 16oz', 'Fiberglass handle claw hammer with rubber grip'),
('construction_tools_construction', 5, 'Screwdriver Set Multi', 'Magnetic screwdriver set with 40 interchangeable bits'),
('construction_tools_construction', 6, 'Pliers Set 3-Piece', 'Combination pliers set with cushion grip handles'),
('construction_tools_construction', 7, 'Tape Measure Laser', 'Laser distance measure with digital display'),
('construction_tools_construction', 8, 'Utility Knife Retractable', 'Retractable utility knife with blade storage'),
('construction_tools_construction', 9, 'Allen Key Hex Set', 'Ball-end hex key set in metric and imperial'),
('construction_tools_construction', 10, 'Tool Box Portable', 'Heavy-duty portable tool box with removable tray');

INSERT INTO _product_names VALUES
('construction_tools_lights', 1, 'Work Light LED Portable', 'Rechargeable LED work light with magnetic base'),
('construction_tools_lights', 2, 'Headlamp Rechargeable', 'Bright rechargeable headlamp with adjustable beam'),
('construction_tools_lights', 3, 'Flashlight Tactical', 'High-lumen tactical flashlight with zoom'),
('construction_tools_lights', 4, 'Under Cabinet Lights LED', 'Battery-operated LED under-cabinet light strips'),
('construction_tools_lights', 5, 'Flood Light Outdoor', 'Motion-sensor outdoor LED flood light'),
('construction_tools_lights', 6, 'Lantern Camping LED', 'Collapsible LED camping lantern with handle'),
('construction_tools_lights', 7, 'Light Bulb LED Pack', 'Energy-saving LED bulbs in daylight white, 6-pack'),
('construction_tools_lights', 8, 'Shop Light Hanging', 'Linkable hanging shop light for garage and workshop'),
('construction_tools_lights', 9, 'Night Light Plug-In', 'Auto-sensing plug-in night light with warm glow'),
('construction_tools_lights', 10, 'Spotlight Clamp Mount', 'Adjustable clamp-mount spotlight for task lighting');

INSERT INTO _product_names VALUES
('costruction_tools_garden', 1, 'Lawn Mower Manual Push', 'Eco-friendly manual reel mower for small lawns'),
('costruction_tools_garden', 2, 'Hedge Trimmer Manual', 'Precision hedge trimming shears with wavy blade'),
('costruction_tools_garden', 3, 'Wheelbarrow Steel', 'Heavy-duty steel wheelbarrow with pneumatic tire'),
('costruction_tools_garden', 4, 'Garden Rake Fan', 'Adjustable fan rake for leaves and lawn debris'),
('costruction_tools_garden', 5, 'Edging Tool Manual', 'Half-moon lawn edging tool with T-handle'),
('costruction_tools_garden', 6, 'Post Hole Digger', 'Manual post hole digger with fiberglass handles'),
('costruction_tools_garden', 7, 'Leaf Blower Cordless', 'Lightweight cordless leaf blower with variable speed'),
('costruction_tools_garden', 8, 'Garden Cart Folding', 'Collapsible garden utility cart with wheels'),
('costruction_tools_garden', 9, 'Sprinkler Oscillating', 'Adjustable oscillating lawn sprinkler'),
('costruction_tools_garden', 10, 'Soil Test Kit', 'Home soil testing kit for pH and nutrients');

INSERT INTO _product_names VALUES
('costruction_tools_tools', 1, 'Power Drill Cordless', 'Cordless power drill with lithium battery and charger'),
('costruction_tools_tools', 2, 'Circular Saw Compact', 'Compact circular saw with laser guide'),
('costruction_tools_tools', 3, 'Jigsaw Variable Speed', 'Variable speed jigsaw with orbital action'),
('costruction_tools_tools', 4, 'Sander Orbital Palm', 'Random orbital palm sander with dust collection'),
('costruction_tools_tools', 5, 'Heat Gun Electric', 'Dual-temperature electric heat gun for shrink and strip'),
('costruction_tools_tools', 6, 'Angle Grinder 4.5 inch', 'Powerful angle grinder with safety guard'),
('costruction_tools_tools', 7, 'Wrench Adjustable 10in', 'Chrome-plated adjustable wrench with wide jaw'),
('costruction_tools_tools', 8, 'Clamp Set Wood', 'Quick-grip bar clamps for woodworking, 4-pack'),
('costruction_tools_tools', 9, 'Stud Finder Electronic', 'Electronic stud finder with deep scan mode'),
('costruction_tools_tools', 10, 'Wire Stripper Automatic', 'Self-adjusting wire stripper and cutter');

INSERT INTO _product_names VALUES
('cds_dvds_musicals', 1, 'Classic Rock Vinyl Collection', 'Curated vinyl record set of classic rock hits'),
('cds_dvds_musicals', 2, 'Movie DVD Box Set', 'Complete movie series DVD collection in slipcase'),
('cds_dvds_musicals', 3, 'Jazz CD Anthology', 'Essential jazz recordings anthology on CD'),
('cds_dvds_musicals', 4, 'Broadway Musical Soundtrack', 'Original cast recording of beloved Broadway shows'),
('cds_dvds_musicals', 5, 'Documentary Series DVD', 'Nature documentary series in multi-disc DVD set'),
('cds_dvds_musicals', 6, 'Pop Hits Compilation CD', 'Best pop hits compilation spanning the decades'),
('cds_dvds_musicals', 7, 'Blu-Ray Concert Live', 'High-definition live concert recording on Blu-Ray'),
('cds_dvds_musicals', 8, 'Classical Music CD Set', 'Classical masterworks performed by leading orchestras'),
('cds_dvds_musicals', 9, 'Kids Song Collection CD', 'Children favorite songs and nursery rhymes CD'),
('cds_dvds_musicals', 10, 'World Music Sampler', 'World music sampler featuring global artists');

INSERT INTO _product_names VALUES
('dvds_blu_ray', 1, 'Action Movie Blu-Ray', 'Latest action blockbuster on Blu-Ray disc'),
('dvds_blu_ray', 2, 'Animated Film Collection', 'Family animated movie collection box set'),
('dvds_blu_ray', 3, 'Drama Series Complete', 'Complete TV drama series on DVD'),
('dvds_blu_ray', 4, 'Comedy Film Pack', 'Laugh-out-loud comedy movie 4-pack'),
('dvds_blu_ray', 5, 'Sci-Fi Classic Remaster', 'Remastered science fiction classic on 4K UHD'),
('dvds_blu_ray', 6, 'Horror Movie Bundle', 'Horror movie collection with bonus features'),
('dvds_blu_ray', 7, 'Romance Film Set', 'Romantic movie favorites collection on DVD'),
('dvds_blu_ray', 8, 'Fitness Workout DVD', 'Home workout program DVD with multiple routines'),
('dvds_blu_ray', 9, 'Educational Series Kids', 'Educational video series for children on DVD'),
('dvds_blu_ray', 10, 'Thriller Suspense Pack', 'Edge-of-your-seat thriller movie pack');

INSERT INTO _product_names VALUES
('music', 1, 'Vinyl Record Album', 'Premium pressed vinyl album with gatefold sleeve'),
('music', 2, 'Sheet Music Book', 'Piano sheet music book with popular songs'),
('music', 3, 'Music Theory Workbook', 'Comprehensive music theory workbook for beginners'),
('music', 4, 'Guitar Tab Collection', 'Guitar tablature book with popular rock songs'),
('music', 5, 'Drum Sticks Pair', 'Hickory drumsticks with nylon tips for durability'),
('music', 6, 'Piano Key Stickers', 'Removable piano key note stickers for learning'),
('music', 7, 'Metronome Digital', 'Clip-on digital metronome with tap tempo'),
('music', 8, 'Instrument Polish Kit', 'Musical instrument cleaning and polish kit'),
('music', 9, 'Record Storage Crate', 'Wooden crate designed for vinyl record storage'),
('music', 10, 'Ear Training Course Book', 'Ear training exercises book with audio access');

-- Remaining smaller categories
INSERT INTO _product_names VALUES
('tablets_printing_image', 1, 'Drawing Tablet Pen', 'Graphics drawing tablet with pressure-sensitive pen'),
('tablets_printing_image', 2, 'Photo Printer Portable', 'Compact wireless photo printer for smartphones'),
('tablets_printing_image', 3, 'Tablet Screen Protector', 'Clear tempered glass screen protector for tablets'),
('tablets_printing_image', 4, 'Inkjet Cartridge Set', 'Compatible inkjet cartridges in 4-color set'),
('tablets_printing_image', 5, 'Tablet Stand Adjustable', 'Multi-angle tablet stand for desk use'),
('tablets_printing_image', 6, 'Photo Paper Glossy Pack', 'Premium glossy photo paper for inkjet printers'),
('tablets_printing_image', 7, 'Stylus Pen Universal', 'Universal capacitive stylus pen for touchscreens'),
('tablets_printing_image', 8, 'Printer Cable USB', 'USB Type-B printer cable with gold connectors'),
('tablets_printing_image', 9, 'Tablet Keyboard Case', 'Bluetooth keyboard case for 10-inch tablets'),
('tablets_printing_image', 10, 'Scanner Portable Document', 'Portable handheld document and photo scanner');

INSERT INTO _product_names VALUES
('fixed_telephony', 1, 'Cordless Phone Set', 'DECT cordless phone with caller ID display'),
('fixed_telephony', 2, 'Phone Wall Mount', 'Wall-mount bracket for corded telephones'),
('fixed_telephony', 3, 'Answering Machine Digital', 'Digital answering machine with message storage'),
('fixed_telephony', 4, 'Phone Line Splitter', 'Dual phone line splitter adapter'),
('fixed_telephony', 5, 'Headset Phone Office', 'Wired headset for office phone with noise cancel'),
('fixed_telephony', 6, 'Phone Cord Coiled', 'Replacement coiled handset cord in black'),
('fixed_telephony', 7, 'Caller ID Display Unit', 'Standalone caller ID display unit with memory'),
('fixed_telephony', 8, 'Phone Battery Pack', 'Rechargeable battery pack for cordless phones'),
('fixed_telephony', 9, 'Telephone Stand Desk', 'Desk telephone stand with message pad holder'),
('fixed_telephony', 10, 'Conference Speaker Phone', 'Hands-free conference speaker phone for meetings');

INSERT INTO _product_names VALUES
('air_conditioning', 1, 'Portable AC Unit', 'Compact portable air conditioner for small rooms'),
('air_conditioning', 2, 'AC Filter Replacement', 'HEPA replacement filter for air conditioning units'),
('air_conditioning', 3, 'Window AC Bracket', 'Universal window AC support bracket with hardware'),
('air_conditioning', 4, 'Evaporative Cooler Personal', 'Personal evaporative air cooler with water tank'),
('air_conditioning', 5, 'AC Remote Control Universal', 'Universal remote control for air conditioners'),
('air_conditioning', 6, 'Duct Tape HVAC', 'Professional HVAC aluminum foil duct tape'),
('air_conditioning', 7, 'Thermostat Smart WiFi', 'Smart WiFi thermostat with app control'),
('air_conditioning', 8, 'AC Cleaning Spray', 'Foaming AC coil cleaner spray for maintenance'),
('air_conditioning', 9, 'Ceiling Fan Light Combo', 'Reversible ceiling fan with integrated LED light'),
('air_conditioning', 10, 'Insulation Foam Tape', 'Self-adhesive foam tape for AC gap sealing');

INSERT INTO _product_names VALUES
('agro_industry_and_commerce', 1, 'Drip Irrigation Kit', 'Complete drip irrigation kit for garden beds'),
('agro_industry_and_commerce', 2, 'Soil pH Meter Digital', 'Digital soil moisture and pH testing meter'),
('agro_industry_and_commerce', 3, 'Seed Storage Organizer', 'Seed storage box with dividers and labels'),
('agro_industry_and_commerce', 4, 'Greenhouse Mini Indoor', 'Tabletop mini greenhouse for seed starting'),
('agro_industry_and_commerce', 5, 'Plant Growth Light', 'Full-spectrum LED grow light for indoor plants'),
('agro_industry_and_commerce', 6, 'Fertilizer Organic Pack', 'All-purpose organic fertilizer for gardens'),
('agro_industry_and_commerce', 7, 'Harvest Basket Woven', 'Traditional woven harvest basket for produce'),
('agro_industry_and_commerce', 8, 'Pest Control Natural Spray', 'Organic neem oil pest control spray for plants'),
('agro_industry_and_commerce', 9, 'Grafting Tool Kit', 'Professional plant grafting tool kit with blades'),
('agro_industry_and_commerce', 10, 'Mulch Landscape Bag', 'Natural hardwood mulch for landscaping');

INSERT INTO _product_names VALUES
('arts_and_craftmanship', 1, 'Sewing Kit Complete', 'Portable sewing kit with thread, needles, and scissors'),
('arts_and_craftmanship', 2, 'Embroidery Hoop Set', 'Bamboo embroidery hoops in 5 sizes'),
('arts_and_craftmanship', 3, 'Knitting Needle Set', 'Interchangeable knitting needle set in bamboo'),
('arts_and_craftmanship', 4, 'Resin Casting Kit', 'Clear epoxy resin casting kit with molds'),
('arts_and_craftmanship', 5, 'Scrapbooking Paper Pack', 'Patterned scrapbook paper collection with 60 sheets'),
('arts_and_craftmanship', 6, 'Crochet Hook Set', 'Ergonomic crochet hook set in aluminum'),
('arts_and_craftmanship', 7, 'Leather Crafting Kit', 'Beginner leather crafting tools and materials'),
('arts_and_craftmanship', 8, 'Candle Making Supplies', 'Soy wax candle making kit with wicks and fragrance'),
('arts_and_craftmanship', 9, 'Pottery Clay Air-Dry', 'Air-dry modeling clay for pottery and sculpture'),
('arts_and_craftmanship', 10, 'Bead Jewelry Kit', 'Glass bead jewelry making kit with tools');

INSERT INTO _product_names VALUES
('market_place', 1, 'Vendor Display Stand', 'Portable folding display stand for markets'),
('market_place', 2, 'Price Tag Gun', 'Labeling price tag gun with 1000 tags'),
('market_place', 3, 'Cash Box Locking', 'Metal cash box with tray and combination lock'),
('market_place', 4, 'Shopping Basket Folding', 'Collapsible shopping basket with handles'),
('market_place', 5, 'Receipt Book Carbonless', 'Carbonless duplicate receipt book'),
('market_place', 6, 'Banner Stand Retractable', 'Retractable roll-up banner stand for promotion'),
('market_place', 7, 'Tote Bag Reusable', 'Eco-friendly reusable shopping tote bag'),
('market_place', 8, 'Packaging Tape Dispenser', 'Tape dispenser with heavy-duty packing tape'),
('market_place', 9, 'Business Card Holder', 'Stainless steel business card holder case'),
('market_place', 10, 'Product Label Stickers', 'Custom blank product label stickers on rolls');

INSERT INTO _product_names VALUES
('la_cuisine', 1, 'Chef Knife Professional', 'High-carbon stainless steel chef knife 8-inch'),
('la_cuisine', 2, 'Cast Iron Skillet', 'Pre-seasoned cast iron skillet for versatile cooking'),
('la_cuisine', 3, 'Cooking Utensil Set', 'Complete kitchen utensil set with holder'),
('la_cuisine', 4, 'Baking Sheet Set', 'Non-stick baking sheets with cooling rack'),
('la_cuisine', 5, 'Mixing Bowl Set Glass', 'Nesting glass mixing bowls with measurement marks'),
('la_cuisine', 6, 'Spice Grinder Manual', 'Adjustable manual spice and pepper grinder'),
('la_cuisine', 7, 'Rolling Pin Wooden', 'Classic wooden rolling pin with handles'),
('la_cuisine', 8, 'Measuring Cup Set', 'Stainless steel measuring cups and spoons set'),
('la_cuisine', 9, 'Pastry Bag Tips Set', 'Decorating tips and pastry bag set for baking'),
('la_cuisine', 10, 'Wine Opener Corkscrew', 'Professional waiter-style wine corkscrew opener');

INSERT INTO _product_names VALUES
('industry_commerce_and_business', 1, 'Label Maker Portable', 'Handheld label maker with QWERTY keyboard'),
('industry_commerce_and_business', 2, 'Calculator Financial', 'Financial calculator with business functions'),
('industry_commerce_and_business', 3, 'Paper Shredder Cross-Cut', 'Cross-cut paper shredder for office security'),
('industry_commerce_and_business', 4, 'Binder Set Professional', 'D-ring binders with clear cover pockets, 3-pack'),
('industry_commerce_and_business', 5, 'Presentation Pointer Laser', 'Wireless presentation clicker with laser pointer'),
('industry_commerce_and_business', 6, 'Stamp Pad Ink Refill', 'Stamp ink pad with replaceable cartridge'),
('industry_commerce_and_business', 7, 'Laminator Machine', 'Compact thermal laminator for documents and photos'),
('industry_commerce_and_business', 8, 'Name Badge Holders', 'Clear name badge holders with clips, 50-pack'),
('industry_commerce_and_business', 9, 'Shipping Boxes Pack', 'Corrugated shipping boxes in 3 sizes, 20-pack'),
('industry_commerce_and_business', 10, 'Inventory Clipboard', 'Heavy-duty storage clipboard with inside compartment');

INSERT INTO _product_names VALUES
('security_and_services', 1, 'Smart Doorbell Camera', 'WiFi video doorbell with motion detection and night vision'),
('security_and_services', 2, 'Door Lock Smart', 'Keyless smart lock with fingerprint and app access'),
('security_and_services', 3, 'Security Camera Indoor', 'Indoor security camera with 2-way audio and cloud storage'),
('security_and_services', 4, 'Safe Box Fireproof', 'Compact fireproof safe with digital keypad'),
('security_and_services', 5, 'Motion Sensor Alarm', 'Wireless motion sensor alarm with remote control'),
('security_and_services', 6, 'Window Security Film', 'Clear security window film for shatter resistance'),
('security_and_services', 7, 'Key Lockbox Wall Mount', 'Wall-mounted combination key lockbox for spare keys'),
('security_and_services', 8, 'Smoke Detector Smart', 'Smart smoke and CO detector with app alerts'),
('security_and_services', 9, 'Padlock Heavy Duty', 'Weather-resistant heavy-duty padlock with keys'),
('security_and_services', 10, 'Door Stopper Alarm', 'Wedge door stop with built-in alarm sensor');

INSERT INTO _product_names VALUES
('signaling_and_security', 1, 'Safety Cone Reflective', 'Collapsible reflective traffic safety cone'),
('signaling_and_security', 2, 'Exit Sign LED', 'LED emergency exit sign with battery backup'),
('signaling_and_security', 3, 'Caution Wet Floor Sign', 'Bright yellow fold-out wet floor warning sign'),
('signaling_and_security', 4, 'Fire Blanket Emergency', 'Quick-release fire blanket in wall-mount case'),
('signaling_and_security', 5, 'Reflective Tape Roll', 'High-visibility reflective tape for safety marking'),
('signaling_and_security', 6, 'Emergency Whistle Metal', 'Loud metal emergency whistle with lanyard'),
('signaling_and_security', 7, 'Road Flare LED', 'Reusable LED road flare with magnetic base'),
('signaling_and_security', 8, 'Safety Sign Pack', 'Assorted workplace safety sign pack, 10 pieces'),
('signaling_and_security', 9, 'Barrier Tape Caution', 'Yellow caution barrier tape, 1000 ft roll'),
('signaling_and_security', 10, 'Emergency Light Rechargeable', 'Rechargeable emergency LED light with wall mount');

INSERT INTO _product_names VALUES
('kitchen_dining_laundry_garden_furniture', 1, 'Patio Chair Set', 'Weather-resistant patio chairs, set of 2'),
('kitchen_dining_laundry_garden_furniture', 2, 'Dining Table Extendable', 'Extendable dining table seating 4-8 people'),
('kitchen_dining_laundry_garden_furniture', 3, 'Laundry Hamper Bamboo', 'Bamboo laundry hamper with removable liner'),
('kitchen_dining_laundry_garden_furniture', 4, 'Drying Rack Foldable', 'Foldable clothes drying rack for indoor use'),
('kitchen_dining_laundry_garden_furniture', 5, 'Garden Bench Wooden', 'Teak garden bench with slatted seat'),
('kitchen_dining_laundry_garden_furniture', 6, 'Bar Stool Set', 'Counter-height bar stools with footrest, set of 2'),
('kitchen_dining_laundry_garden_furniture', 7, 'Outdoor Table Folding', 'Portable folding outdoor table for camping'),
('kitchen_dining_laundry_garden_furniture', 8, 'Kitchen Island Cart', 'Rolling kitchen island cart with storage'),
('kitchen_dining_laundry_garden_furniture', 9, 'Umbrella Stand Patio', 'Weighted patio umbrella base stand'),
('kitchen_dining_laundry_garden_furniture', 10, 'Ironing Board Compact', 'Space-saving ironing board with iron rest');

INSERT INTO _product_names VALUES
('Other', 1, 'Multi-Tool Pocket', 'Compact stainless steel multi-tool with 12 functions'),
('Other', 2, 'Gift Card Holder Box', 'Decorative gift card holder box set'),
('Other', 3, 'Portable Fan Mini', 'Rechargeable handheld mini fan for personal cooling'),
('Other', 4, 'Storage Bin Clear', 'Clear plastic storage bin with snap-lock lid'),
('Other', 5, 'Magnetic Whiteboard Planner', 'Weekly planner whiteboard with dry-erase markers'),
('Other', 6, 'Utility Hooks Adhesive', 'Heavy-duty adhesive utility hooks, 8-pack'),
('Other', 7, 'Reusable Water Bottle', 'BPA-free reusable water bottle with carry loop'),
('Other', 8, 'Desk Clock Digital', 'Compact digital desk clock with temperature display'),
('Other', 9, 'Packing Peanuts Biodegradable', 'Biodegradable packing peanuts for shipping'),
('Other', 10, 'Novelty Mug Funny', 'Ceramic mug with funny quote and gift box');

INSERT INTO _product_names VALUES
('Pc Gamer', 1, 'Gaming Mouse RGB', 'High-DPI RGB gaming mouse with programmable buttons'),
('Pc Gamer', 2, 'Mechanical Gaming Keyboard', 'Mechanical keyboard with cherry-style switches and RGB'),
('Pc Gamer', 3, 'Gaming Monitor Stand', 'Dual monitor stand with cable management for gaming'),
('Pc Gamer', 4, 'Gaming Desk Mat XL', 'Extra-large RGB desk mat with anti-slip base'),
('Pc Gamer', 5, 'Streaming Webcam 4K', '4K webcam with ring light for streaming'),
('Pc Gamer', 6, 'GPU Support Bracket', 'Graphics card anti-sag support bracket'),
('Pc Gamer', 7, 'PC Case Fan Pack', 'RGB case fan 3-pack with controller hub'),
('Pc Gamer', 8, 'Gaming Headset Stand', 'RGB headset stand with USB hub ports'),
('Pc Gamer', 9, 'Key Switch Tester', 'Mechanical key switch tester board with 9 switches'),
('Pc Gamer', 10, 'Stream Deck Mini', 'Programmable stream control pad with LCD keys');

INSERT INTO _product_names VALUES
('Portateis Cozinha E Preparadores De Alimentos', 1, 'Food Processor Compact', 'Compact food processor with multiple blades'),
('Portateis Cozinha E Preparadores De Alimentos', 2, 'Electric Mixer Hand', 'Handheld electric mixer with 5 speed settings'),
('Portateis Cozinha E Preparadores De Alimentos', 3, 'Vegetable Chopper', 'Manual vegetable chopper with interchangeable blades'),
('Portateis Cozinha E Preparadores De Alimentos', 4, 'Portable Blender Cup', 'USB rechargeable portable blender cup'),
('Portateis Cozinha E Preparadores De Alimentos', 5, 'Mandoline Slicer', 'Adjustable mandoline slicer with safety guard'),
('Portateis Cozinha E Preparadores De Alimentos', 6, 'Garlic Press Stainless', 'Heavy-duty stainless steel garlic press'),
('Portateis Cozinha E Preparadores De Alimentos', 7, 'Meat Grinder Manual', 'Manual meat grinder with multiple plates'),
('Portateis Cozinha E Preparadores De Alimentos', 8, 'Spiralizer Vegetable', 'Tri-blade vegetable spiralizer for zoodles'),
('Portateis Cozinha E Preparadores De Alimentos', 9, 'Herb Scissors Multi-Blade', 'Multi-blade herb scissors for quick mincing'),
('Portateis Cozinha E Preparadores De Alimentos', 10, 'Avocado Slicer Tool', '3-in-1 avocado split, pit, and slice tool');

-- =============================================================================
-- Now apply the name updates to the products table
-- =============================================================================

-- Update products by assigning names round-robin from their category's name pool
-- Uses a CTE to compute row numbers and assign names cyclically
WITH numbered_products AS (
    SELECT
        p.id AS product_id,
        c.name AS cat_name,
        ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.id) AS rn
    FROM products p
    JOIN categories c ON p.category_id = c.id
),
name_counts AS (
    SELECT category_name, COUNT(*) AS cnt
    FROM _product_names
    GROUP BY category_name
),
product_assignments AS (
    SELECT
        np.product_id,
        pn.product_name,
        pn.product_desc
    FROM numbered_products np
    JOIN name_counts nc ON np.cat_name = nc.category_name
    JOIN _product_names pn ON pn.category_name = np.cat_name
        AND pn.name_index = ((np.rn - 1) % nc.cnt) + 1
)
UPDATE products
SET
    name = pa.product_name,
    description = pa.product_desc
FROM product_assignments pa
WHERE products.id = pa.product_id;

-- Verify the update
SELECT c.name AS category, COUNT(*) AS products_updated,
       MIN(p.name) AS sample_name
FROM products p
JOIN categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY c.name;

COMMIT;

-- Show a few sample products to confirm
SELECT p.id, p.name, c.name AS category, p.price, p.stock_quantity
FROM products p
JOIN categories c ON p.category_id = c.id
ORDER BY p.id
LIMIT 20;
