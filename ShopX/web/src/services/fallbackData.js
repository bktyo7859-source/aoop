/**
 * ShopCX Production Resilient Fallback Data Engine
 * Guarantees zero blank screens or failed states on Vercel even when
 * the remote backend is offline or unconfigured.
 */

export const FALLBACK_CATEGORIES = [
  { id: 61, name: "Perfumery & Luxury Fragrances" },
  { id: 43, name: "Home Decor & Accents" },
  { id: 66, name: "Watches & Luxury Gifts" },
  { id: 32, name: "Bags, Backpacks & Wallets" },
  { id: 8, name: "Audio & Headphones" },
  { id: 6, name: "Art Supplies & Painting" },
  { id: 53, name: "Kitchen Cookware & Utensils" },
  { id: 17, name: "Cameras, Optics & Photography" },
  { id: 44, name: "Living Room Furniture" },
  { id: 63, name: "Sports, Fitness & Outdoor Recreation" },
  { id: 18, name: "Computers & Laptops" },
  { id: 19, name: "Computer Accessories & Peripherals" },
  { id: 31, name: "Women's Fashion & Apparel" },
  { id: 34, name: "Men's Fashion & Apparel" },
  { id: 35, name: "Footwear & Athletic Shoes" },
  { id: 41, name: "Artisan Coffee, Tea & Snacks" },
  { id: 56, name: "Musical Instruments & Keyboards" },
  { id: 74, name: "Fine Leather Goods & Luggage" },
  { id: 73, name: "Haute Horology & Timepieces" },
  { id: 50, name: "Home Wellness & Thermostats" }
];

export const FALLBACK_PRODUCTS = [
  // Fragrances & Perfumery
  {
    id: 1,
    name: "Midnight Oud Eau de Parfum",
    description: "Rich and luxurious oud-based fragrance with warm amber notes, smoky sandalwood accords, and dark damask rose.",
    price: 340.00,
    stockQuantity: 42,
    category: { id: 61, name: "Perfumery & Luxury Fragrances" }
  },
  {
    id: 2,
    name: "Citrus Bloom Eau de Toilette",
    description: "Fresh bergamot, neroli blossoms, and sun-drenched Sicilian lemon blend perfect for radiant daytime elegance.",
    price: 215.00,
    stockQuantity: 28,
    category: { id: 61, name: "Perfumery & Luxury Fragrances" }
  },
  {
    id: 3,
    name: "Velvet Rose & Smoked Amber",
    description: "An intoxicating composition of velvety Turkish rose, ambergris, bourbon vanilla, and spicy cardamom.",
    price: 390.00,
    stockQuantity: 19,
    category: { id: 61, name: "Perfumery & Luxury Fragrances" }
  },
  {
    id: 4,
    name: "Ocean Mist Botanical Fragrance",
    description: "Crisp marine minerals, wild coastal sage, driftwood, and oceanic breeze captured in handcrafted crystal.",
    price: 275.00,
    stockQuantity: 35,
    category: { id: 61, name: "Perfumery & Luxury Fragrances" }
  },

  // Watches & Haute Horology
  {
    id: 5,
    name: "Monochrome Chronograph Ref. 04",
    description: "Brushed 316L stainless steel case with sapphire crystal glass, mechanical automatic movement, and Italian leather strap.",
    price: 1850.00,
    stockQuantity: 12,
    category: { id: 66, name: "Watches & Luxury Gifts" }
  },
  {
    id: 6,
    name: "Bauhaus Minimalist Automatic Watch",
    description: "Clean dial geometry, exhibition case back, power reserve of 48 hours, and vegetable-tanned bridle leather.",
    price: 1420.00,
    stockQuantity: 15,
    category: { id: 66, name: "Watches & Luxury Gifts" }
  },
  {
    id: 7,
    name: "Tourbillon Heritage Titanium Watch",
    description: "Grade 5 titanium aerospace-grade casing, open-worked skeleton dial, and hand-stitched alligator strap.",
    price: 4600.00,
    stockQuantity: 5,
    category: { id: 73, name: "Haute Horology & Timepieces" }
  },

  // Home Decor & Accents
  {
    id: 8,
    name: "Architectural Ceramic Vessel No. 7",
    description: "Hand-thrown stoneware with raw mineral glaze and sculpted geometric silhouette. Individually numbered.",
    price: 460.00,
    stockQuantity: 22,
    category: { id: 43, name: "Home Decor & Accents" }
  },
  {
    id: 9,
    name: "Travertine & Brushed Brass Table Lamp",
    description: "Solid Italian travertine pedestal paired with hand-spun raw brass shade and warm dimmable ambient luminescence.",
    price: 780.00,
    stockQuantity: 14,
    category: { id: 43, name: "Home Decor & Accents" }
  },
  {
    id: 10,
    name: "Smoked Oak Monolith Pedestal",
    description: "Solid sustainably sourced European oak, charred using traditional Shou Sugi Ban finishing techniques.",
    price: 920.00,
    stockQuantity: 8,
    category: { id: 43, name: "Home Decor & Accents" }
  },
  {
    id: 11,
    name: "Hand-Knotted Merino Wool Throw",
    description: "Ultra-fine New Zealand merino wool with unbleached organic fringe and generous 180x220cm proportions.",
    price: 340.00,
    stockQuantity: 30,
    category: { id: 43, name: "Home Decor & Accents" }
  },

  // Bags & Fine Leather Goods
  {
    id: 12,
    name: "Structured Calfskin Weekender Bag",
    description: "Full-grain Tuscan calfskin with solid brass hardware, suede lining, and reinforced architectural silhouette.",
    price: 1250.00,
    stockQuantity: 16,
    category: { id: 32, name: "Bags, Backpacks & Wallets" }
  },
  {
    id: 13,
    name: "Minimalist Leather Folio & Cardholder",
    description: "Seamless folded construction with hand-painted burnished edges and tactile matte finish.",
    price: 195.00,
    stockQuantity: 60,
    category: { id: 32, name: "Bags, Backpacks & Wallets" }
  },
  {
    id: 14,
    name: "Artisanal Canvas & Bridle Leather Tote",
    description: "Heavyweight 24oz organic cotton duck canvas with bridle leather handles and internal organizer pockets.",
    price: 380.00,
    stockQuantity: 25,
    category: { id: 74, name: "Fine Leather Goods & Luggage" }
  },

  // Audio & Studio Hardware
  {
    id: 15,
    name: "Studio Reference Planar Magnetic Headphones",
    description: "Open-back planar magnetic transducers with lambskin earpads and CNC-machined aluminum gimbals.",
    price: 890.00,
    stockQuantity: 20,
    category: { id: 8, name: "Audio & Headphones" }
  },
  {
    id: 16,
    name: "Acoustic Walnut Wireless Monitor Speaker",
    description: "Handcrafted American walnut enclosure with custom silk dome tweeters, Bluetooth 5.3 aptX HD, and analog inputs.",
    price: 640.00,
    stockQuantity: 18,
    category: { id: 8, name: "Audio & Headphones" }
  },

  // Art Supplies & Painting
  {
    id: 17,
    name: "Master Kolinsky Sable Brush Curation",
    description: "Set of 6 handcrafted sable hair brushes with ebony handles, presented in an engraved cedar storage box.",
    price: 290.00,
    stockQuantity: 32,
    category: { id: 6, name: "Art Supplies & Painting" }
  },
  {
    id: 18,
    name: "Pure Mineral Pigment Artist Set",
    description: "24 pure artist pigments ground with cold-pressed walnut oil for exceptional archival vibrancy and permanence.",
    price: 410.00,
    stockQuantity: 15,
    category: { id: 6, name: "Art Supplies & Painting" }
  },

  // Kitchen Cookware & Utensils
  {
    id: 19,
    name: "Hand-Forged Damascus Santoku Knife",
    description: "67-layer Japanese VG-10 Damascus steel with octagonal desert ironwood handle and custom wooden saya sheath.",
    price: 380.00,
    stockQuantity: 24,
    category: { id: 53, name: "Kitchen Cookware & Utensils" }
  },
  {
    id: 20,
    name: "Cast Iron Dutch Oven with Brass Finial",
    description: "Enamelled multi-coat heavy cast iron engineered for optimal thermal retention and slow-braising perfection.",
    price: 310.00,
    stockQuantity: 28,
    category: { id: 53, name: "Kitchen Cookware & Utensils" }
  },

  // Living Room Furniture
  {
    id: 21,
    name: "Sculptural Bouclé Lounge Chair",
    description: "Fluid curves upholstered in premium French bouclé with invisible solid hardwood internal joinery.",
    price: 2100.00,
    stockQuantity: 6,
    category: { id: 44, name: "Living Room Furniture" }
  },
  {
    id: 22,
    name: "Calacatta Viola Marble Coffee Table",
    description: "Honed natural Calacatta Viola marble block with rich burgundy veining and chamfered edge profiling.",
    price: 3400.00,
    stockQuantity: 4,
    category: { id: 44, name: "Living Room Furniture" }
  },

  // Cameras & Optics
  {
    id: 23,
    name: "Analog Rangefinder 35mm Camera",
    description: "Precision mechanical shutter, bright optical rangefinder viewfinder, and titanium-plated top plate.",
    price: 2850.00,
    stockQuantity: 9,
    category: { id: 17, name: "Cameras, Optics & Photography" }
  },

  // Coffee & Tea
  {
    id: 24,
    name: "Precision Pour-Over Kettle & Stand",
    description: "Solid copper pour-over gooseneck kettle with walnut handle and solid walnut extraction dripper stand.",
    price: 260.00,
    stockQuantity: 40,
    category: { id: 41, name: "Artisan Coffee, Tea & Snacks" }
  }
];

export const FALLBACK_ORDERS = [
  {
    id: 8092,
    totalPrice: 1850.00,
    status: "DELIVERED",
    createdAt: "2026-09-28T14:22:00Z",
    shippingAddress: "128 Haute Avenue, Suite 400, New York, NY 10012",
    customer: { id: 1, name: "Shashank", email: "shashank@shopx.local" },
    items: [
      {
        id: 101,
        quantity: 1,
        price: 1850.00,
        product: FALLBACK_PRODUCTS[4]
      }
    ]
  },
  {
    id: 8091,
    totalPrice: 800.00,
    status: "DISPATCHED",
    createdAt: "2026-09-15T09:10:00Z",
    shippingAddress: "45 Pall Mall, St. James's, London SW1Y 5JG",
    customer: { id: 1, name: "Shashank", email: "shashank@shopx.local" },
    items: [
      {
        id: 102,
        quantity: 1,
        price: 340.00,
        product: FALLBACK_PRODUCTS[0]
      },
      {
        id: 103,
        quantity: 1,
        price: 460.00,
        product: FALLBACK_PRODUCTS[7]
      }
    ]
  }
];
