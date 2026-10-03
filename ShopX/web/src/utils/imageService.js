/**
 * ShopCX Editorial Image Engine
 * Provides curated, haute editorial photography matching product categories & names.
 */

const CATEGORY_IMAGES = {
  // Perfumes & Fragrances
  'Perfumery & Luxury Fragrances': [
    {
      primary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Art & Painting
  'Art Supplies & Painting': [
    {
      primary: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1580481077190-736be2612c18?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Sports & Fitness
  'Sports, Fitness & Outdoor Recreation': [
    {
      primary: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Baby & Nursery
  'Baby Care & Nursery': [
    {
      primary: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Kitchen & Dining
  'Kitchen Cookware & Utensils': [
    {
      primary: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Musical Instruments
  'Musical Instruments & Keyboards': [
    {
      primary: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1520523839898-5071282543e2?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Home Decor & Accents
  'Home Decor & Accents': [
    {
      primary: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Bedding & Linens
  'Bedding, Bath & Table Linens': [
    {
      primary: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Computer & Tech Accessories
  'Computer Accessories & Peripherals': [
    {
      primary: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Audio & Headphones
  'Audio & Headphones': [
    {
      primary: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Watches & Luxury
  'Watches & Luxury Gifts': [
    {
      primary: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Women's Fashion & Apparel
  "Women's Fashion & Apparel": [
    {
      primary: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Bags & Leather Goods
  'Bags, Backpacks & Wallets': [
    {
      primary: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    },
    {
      primary: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Smart Gadgets
  'Smart Gadgets & Novelty Tech': [
    {
      primary: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Major Home Appliances
  'Major Home Appliances': [
    {
      primary: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Safety Gear
  'Safety & Protective Gear': [
    {
      primary: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=1000&q=85',
    }
  ],
  // Toys & Games
  'Toys, Puzzles & Board Games': [
    {
      primary: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=1000&q=85',
    }
  ]
};

// Fallback high-end architectural editorial image set
const EDITORIAL_FALLBACKS = [
  {
    primary: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85'
  },
  {
    primary: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85'
  },
  {
    primary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85'
  },
  {
    primary: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85'
  },
  {
    primary: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=85'
  },
  {
    primary: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85'
  },
  {
    primary: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=85'
  },
  {
    primary: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=85',
    secondary: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=1000&q=85'
  }
];

/**
 * Returns primary and secondary images for a product based on its name and category
 */
export function getProductImages(product) {
  if (!product) return EDITORIAL_FALLBACKS[0];

  const categoryName = product.categoryName || (product.category && product.category.name) || '';
  const id = product.id || 1;

  if (categoryName && CATEGORY_IMAGES[categoryName]) {
    const list = CATEGORY_IMAGES[categoryName];
    const index = Math.abs(id) % list.length;
    return list[index];
  }

  // Keyword check
  const name = (product.name || '').toLowerCase();
  if (name.includes('perfume') || name.includes('oud') || name.includes('toilette') || name.includes('fragrance')) {
    return CATEGORY_IMAGES['Perfumery & Luxury Fragrances'][0];
  }
  if (name.includes('watch') || name.includes('bracelet') || name.includes('jewelry') || name.includes('ring')) {
    return CATEGORY_IMAGES['Watches & Luxury Gifts'][0];
  }
  if (name.includes('lamp') || name.includes('pillow') || name.includes('decor') || name.includes('shelves') || name.includes('table')) {
    return CATEGORY_IMAGES['Home Decor & Accents'][0];
  }
  if (name.includes('mouse') || name.includes('keyboard') || name.includes('laptop') || name.includes('gadget')) {
    return CATEGORY_IMAGES['Computer Accessories & Peripherals'][0];
  }
  if (name.includes('headphone') || name.includes('earbuds') || name.includes('audio') || name.includes('speaker')) {
    return CATEGORY_IMAGES['Audio & Headphones'][0];
  }
  if (name.includes('bag') || name.includes('tote') || name.includes('backpack') || name.includes('wallet')) {
    return CATEGORY_IMAGES['Bags, Backpacks & Wallets'][0];
  }
  if (name.includes('guitar') || name.includes('piano') || name.includes('keyboard')) {
    return CATEGORY_IMAGES['Musical Instruments & Keyboards'][0];
  }
  if (name.includes('cookware') || name.includes('pot') || name.includes('kitchen') || name.includes('pan')) {
    return CATEGORY_IMAGES['Kitchen Cookware & Utensils'][0];
  }

  // Hash to fallback
  const fallbackIndex = Math.abs(id) % EDITORIAL_FALLBACKS.length;
  return EDITORIAL_FALLBACKS[fallbackIndex];
}

/**
 * Returns a collection of 4 gallery images for the product detail page
 */
export function getProductGallery(product) {
  const base = getProductImages(product);
  const fallbacks = EDITORIAL_FALLBACKS;
  const id = (product && product.id) || 1;

  const extra1 = fallbacks[(id + 1) % fallbacks.length].primary;
  const extra2 = fallbacks[(id + 2) % fallbacks.length].secondary;

  return [
    base.primary,
    base.secondary,
    extra1,
    extra2
  ];
}
