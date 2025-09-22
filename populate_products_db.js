const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const productsData = [
  {
    "title": "Modern Essentials Accessories 1",
    "brand": "Modern Essentials",
    "category": "Accessories",
    "price": 22.55,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 148,
    "sku": "MO-AC-001",
    "specs": {
      "material": "Silk",
      "fit": "Regular",
      "color": "Navy"
    },
    "ratings": 4.8,
    "reviews_count": 53,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Navy"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Pants 2",
    "brand": "Feminine Touch",
    "category": "Pants",
    "price": 199.14,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 195,
    "sku": "FE-PA-002",
    "specs": {
      "material": "Leather",
      "fit": "Straight",
      "color": "Navy"
    },
    "ratings": 4.0,
    "reviews_count": 84,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Green",
      "Grey"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style T-Shirts 3",
    "brand": "Urban Style",
    "category": "T-Shirts",
    "price": 99.05,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 174,
    "sku": "UR-T--003",
    "specs": {
      "material": "Cotton",
      "fit": "Oversized",
      "color": "Black"
    },
    "ratings": 4.2,
    "reviews_count": 87,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Blue",
      "Black",
      "Yellow"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Pants 4",
    "brand": "Active Gear",
    "category": "Pants",
    "price": 49.1,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 187,
    "sku": "AC-PA-004",
    "specs": {
      "material": "Silk",
      "fit": "Oversized",
      "color": "Grey"
    },
    "ratings": 3.8,
    "reviews_count": 16,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Yellow",
      "Black"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Dresses 5",
    "brand": "StreetWear Co.",
    "category": "Dresses",
    "price": 54.77,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 237,
    "sku": "ST-DR-005",
    "specs": {
      "material": "Denim",
      "fit": "Regular",
      "color": "Khaki"
    },
    "ratings": 3.9,
    "reviews_count": 15,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Navy",
      "Brown",
      "Red",
      "Khaki"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Shirts 6",
    "brand": "Active Gear",
    "category": "Shirts",
    "price": 99.87,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 90,
    "sku": "AC-SH-006",
    "specs": {
      "material": "Leather",
      "fit": "Regular",
      "color": "Blue"
    },
    "ratings": 5.0,
    "reviews_count": 56,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Brown",
      "White",
      "Yellow",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Dresses 7",
    "brand": "Classic Line",
    "category": "Dresses",
    "price": 108.54,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 183,
    "sku": "CL-DR-007",
    "specs": {
      "material": "Wool",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 4.9,
    "reviews_count": 48,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Navy"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Hoodies 8",
    "brand": "Feminine Touch",
    "category": "Hoodies",
    "price": 64.69,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 247,
    "sku": "FE-HO-008",
    "specs": {
      "material": "Wool Blend",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 4.3,
    "reviews_count": 26,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style T-Shirts 9",
    "brand": "Urban Style",
    "category": "T-Shirts",
    "price": 162.49,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 233,
    "sku": "UR-T--009",
    "specs": {
      "material": "Linen",
      "fit": "Straight",
      "color": "Navy"
    },
    "ratings": 4.5,
    "reviews_count": 24,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Navy"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Shirts 10",
    "brand": "Urban Style",
    "category": "Shirts",
    "price": 89.95,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 144,
    "sku": "UR-SH-010",
    "specs": {
      "material": "Silk",
      "fit": "Regular",
      "color": "Brown"
    },
    "ratings": 4.6,
    "reviews_count": 58,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Hoodies 11",
    "brand": "Active Gear",
    "category": "Hoodies",
    "price": 101.97,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 159,
    "sku": "AC-HO-011",
    "specs": {
      "material": "Mesh",
      "fit": "Straight",
      "color": "Yellow"
    },
    "ratings": 4.9,
    "reviews_count": 80,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "White",
      "Blue",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Pants 12",
    "brand": "Modern Essentials",
    "category": "Pants",
    "price": 102.38,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 118,
    "sku": "MO-PA-012",
    "specs": {
      "material": "Mesh",
      "fit": "Slim",
      "color": "Black"
    },
    "ratings": 4.2,
    "reviews_count": 92,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "White"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Dresses 13",
    "brand": "BlueWear",
    "category": "Dresses",
    "price": 79.27,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 161,
    "sku": "BL-DR-013",
    "specs": {
      "material": "Cotton",
      "fit": "Regular",
      "color": "Grey"
    },
    "ratings": 4.5,
    "reviews_count": 76,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Yellow"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Accessories 14",
    "brand": "Classic Line",
    "category": "Accessories",
    "price": 132.5,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 239,
    "sku": "CL-AC-014",
    "specs": {
      "material": "Mesh",
      "fit": "Oversized",
      "color": "Yellow"
    },
    "ratings": 4.0,
    "reviews_count": 99,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Green",
      "White",
      "Blue"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Jackets 15",
    "brand": "BlueWear",
    "category": "Jackets",
    "price": 189.27,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 126,
    "sku": "BL-JA-015",
    "specs": {
      "material": "Polyester",
      "fit": "True to Size",
      "color": "Black"
    },
    "ratings": 4.1,
    "reviews_count": 65,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Brown",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Hoodies 16",
    "brand": "Urban Style",
    "category": "Hoodies",
    "price": 21.25,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 124,
    "sku": "UR-HO-016",
    "specs": {
      "material": "Leather",
      "fit": "Regular",
      "color": "Blue"
    },
    "ratings": 4.7,
    "reviews_count": 76,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Brown",
      "Grey",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Jackets 17",
    "brand": "Winter Wardrobe",
    "category": "Jackets",
    "price": 104.62,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 59,
    "sku": "WI-JA-017",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Red"
    },
    "ratings": 4.0,
    "reviews_count": 67,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Accessories 18",
    "brand": "Modern Essentials",
    "category": "Accessories",
    "price": 73.88,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 125,
    "sku": "MO-AC-018",
    "specs": {
      "material": "Mesh",
      "fit": "Regular",
      "color": "Green"
    },
    "ratings": 3.6,
    "reviews_count": 94,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Green",
      "Yellow"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Pants 19",
    "brand": "StreetWear Co.",
    "category": "Pants",
    "price": 85.24,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 118,
    "sku": "ST-PA-019",
    "specs": {
      "material": "Leather",
      "fit": "Straight",
      "color": "White"
    },
    "ratings": 3.9,
    "reviews_count": 86,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Yellow"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Accessories 20",
    "brand": "Winter Wardrobe",
    "category": "Accessories",
    "price": 67.4,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 37,
    "sku": "WI-AC-020",
    "specs": {
      "material": "Wool",
      "fit": "True to Size",
      "color": "Brown"
    },
    "ratings": 4.9,
    "reviews_count": 21,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Blue",
      "Red",
      "Green"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Sweaters 21",
    "brand": "Modern Essentials",
    "category": "Sweaters",
    "price": 153.53,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 132,
    "sku": "MO-SW-021",
    "specs": {
      "material": "Mesh",
      "fit": "Relaxed",
      "color": "White"
    },
    "ratings": 4.2,
    "reviews_count": 47,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "Yellow"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits T-Shirts 22",
    "brand": "Cozy Knits",
    "category": "T-Shirts",
    "price": 110.23,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 154,
    "sku": "CO-T--022",
    "specs": {
      "material": "Cotton",
      "fit": "Slim",
      "color": "White"
    },
    "ratings": 4.4,
    "reviews_count": 40,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Red",
      "Brown",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Accessories 23",
    "brand": "Active Gear",
    "category": "Accessories",
    "price": 57.75,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 172,
    "sku": "AC-AC-023",
    "specs": {
      "material": "Cotton",
      "fit": "Straight",
      "color": "Khaki"
    },
    "ratings": 3.8,
    "reviews_count": 68,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Black",
      "Brown"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe T-Shirts 24",
    "brand": "Winter Wardrobe",
    "category": "T-Shirts",
    "price": 157.78,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 79,
    "sku": "WI-T--024",
    "specs": {
      "material": "Silk",
      "fit": "Straight",
      "color": "Green"
    },
    "ratings": 4.7,
    "reviews_count": 85,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Green",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Pants 25",
    "brand": "Classic Line",
    "category": "Pants",
    "price": 155.1,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 20,
    "sku": "CL-PA-025",
    "specs": {
      "material": "Mesh",
      "fit": "True to Size",
      "color": "Blue"
    },
    "ratings": 4.2,
    "reviews_count": 91,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Black",
      "Brown",
      "Yellow"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Jackets 26",
    "brand": "BlueWear",
    "category": "Jackets",
    "price": 107.1,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 110,
    "sku": "BL-JA-026",
    "specs": {
      "material": "Cotton",
      "fit": "Relaxed",
      "color": "Blue"
    },
    "ratings": 5.0,
    "reviews_count": 6,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Hoodies 27",
    "brand": "Modern Essentials",
    "category": "Hoodies",
    "price": 192.16,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 141,
    "sku": "MO-HO-027",
    "specs": {
      "material": "Mesh",
      "fit": "Relaxed",
      "color": "Navy"
    },
    "ratings": 3.7,
    "reviews_count": 24,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Navy",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Sweaters 28",
    "brand": "Feminine Touch",
    "category": "Sweaters",
    "price": 79.25,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 117,
    "sku": "FE-SW-028",
    "specs": {
      "material": "Linen",
      "fit": "Oversized",
      "color": "Red"
    },
    "ratings": 3.6,
    "reviews_count": 88,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Blue"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Hoodies 29",
    "brand": "BlueWear",
    "category": "Hoodies",
    "price": 177.79,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 198,
    "sku": "BL-HO-029",
    "specs": {
      "material": "Wool Blend",
      "fit": "Regular",
      "color": "Green"
    },
    "ratings": 3.6,
    "reviews_count": 58,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Yellow"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Shirts 30",
    "brand": "Urban Style",
    "category": "Shirts",
    "price": 63.15,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 150,
    "sku": "UR-SH-030",
    "specs": {
      "material": "Silk",
      "fit": "Straight",
      "color": "Grey"
    },
    "ratings": 4.3,
    "reviews_count": 44,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Green",
      "White",
      "Brown"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Sweaters 31",
    "brand": "Urban Style",
    "category": "Sweaters",
    "price": 162.61,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 212,
    "sku": "UR-SW-031",
    "specs": {
      "material": "Wool",
      "fit": "True to Size",
      "color": "Red"
    },
    "ratings": 4.5,
    "reviews_count": 77,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Yellow",
      "Black"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Dresses 32",
    "brand": "Winter Wardrobe",
    "category": "Dresses",
    "price": 197.37,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 232,
    "sku": "WI-DR-032",
    "specs": {
      "material": "Mesh",
      "fit": "Oversized",
      "color": "Red"
    },
    "ratings": 4.3,
    "reviews_count": 86,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Khaki"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Dresses 33",
    "brand": "Cozy Knits",
    "category": "Dresses",
    "price": 164.17,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 113,
    "sku": "CO-DR-033",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Straight",
      "color": "Red"
    },
    "ratings": 4.5,
    "reviews_count": 78,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Blue",
      "White",
      "Grey"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Hoodies 34",
    "brand": "Rebel Wear",
    "category": "Hoodies",
    "price": 150.64,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 71,
    "sku": "RE-HO-034",
    "specs": {
      "material": "Wool Blend",
      "fit": "Slim",
      "color": "Red"
    },
    "ratings": 4.9,
    "reviews_count": 84,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "Grey",
      "Khaki",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Pants 35",
    "brand": "Active Gear",
    "category": "Pants",
    "price": 158.95,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 162,
    "sku": "AC-PA-035",
    "specs": {
      "material": "Wool",
      "fit": "True to Size",
      "color": "Green"
    },
    "ratings": 4.4,
    "reviews_count": 5,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Navy",
      "Brown",
      "Grey"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Jackets 36",
    "brand": "Rebel Wear",
    "category": "Jackets",
    "price": 197.76,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 127,
    "sku": "RE-JA-036",
    "specs": {
      "material": "Polyester",
      "fit": "Slim",
      "color": "Grey"
    },
    "ratings": 3.7,
    "reviews_count": 65,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Red",
      "Blue",
      "Yellow"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Dresses 37",
    "brand": "Cozy Knits",
    "category": "Dresses",
    "price": 191.98,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 222,
    "sku": "CO-DR-037",
    "specs": {
      "material": "Mesh",
      "fit": "Oversized",
      "color": "White"
    },
    "ratings": 4.1,
    "reviews_count": 78,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Brown",
      "Navy"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Accessories 38",
    "brand": "Rebel Wear",
    "category": "Accessories",
    "price": 151.87,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 92,
    "sku": "RE-AC-038",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Slim",
      "color": "White"
    },
    "ratings": 3.7,
    "reviews_count": 70,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Grey"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Pants 39",
    "brand": "Cozy Knits",
    "category": "Pants",
    "price": 56.02,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 159,
    "sku": "CO-PA-039",
    "specs": {
      "material": "Polyester",
      "fit": "Oversized",
      "color": "Black"
    },
    "ratings": 4.1,
    "reviews_count": 42,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Navy"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Shoes 40",
    "brand": "Rebel Wear",
    "category": "Shoes",
    "price": 140.03,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 193,
    "sku": "RE-SH-040",
    "specs": {
      "material": "Linen",
      "fit": "Slim",
      "color": "Grey"
    },
    "ratings": 3.9,
    "reviews_count": 42,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Yellow",
      "Khaki",
      "Green"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Shoes 41",
    "brand": "BlueWear",
    "category": "Shoes",
    "price": 39.06,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 54,
    "sku": "BL-SH-041",
    "specs": {
      "material": "Wool Blend",
      "fit": "True to Size",
      "color": "White"
    },
    "ratings": 3.7,
    "reviews_count": 6,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Navy"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Jackets 42",
    "brand": "Cozy Knits",
    "category": "Jackets",
    "price": 41.95,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 154,
    "sku": "CO-JA-042",
    "specs": {
      "material": "Linen",
      "fit": "Relaxed",
      "color": "Green"
    },
    "ratings": 4.9,
    "reviews_count": 10,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Yellow"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Pants 43",
    "brand": "Winter Wardrobe",
    "category": "Pants",
    "price": 193.03,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 119,
    "sku": "WI-PA-043",
    "specs": {
      "material": "Cotton Blend",
      "fit": "True to Size",
      "color": "Grey"
    },
    "ratings": 4.5,
    "reviews_count": 64,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Black",
      "Yellow",
      "Green",
      "Khaki"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Shirts 44",
    "brand": "Modern Essentials",
    "category": "Shirts",
    "price": 27.8,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 125,
    "sku": "MO-SH-044",
    "specs": {
      "material": "Leather",
      "fit": "Oversized",
      "color": "Brown"
    },
    "ratings": 3.5,
    "reviews_count": 95,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Khaki",
      "Yellow",
      "Navy"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Jackets 45",
    "brand": "Winter Wardrobe",
    "category": "Jackets",
    "price": 167.08,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 68,
    "sku": "WI-JA-045",
    "specs": {
      "material": "Denim",
      "fit": "Relaxed",
      "color": "Red"
    },
    "ratings": 4.8,
    "reviews_count": 26,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Black"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Shirts 46",
    "brand": "Classic Line",
    "category": "Shirts",
    "price": 31.41,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 22,
    "sku": "CL-SH-046",
    "specs": {
      "material": "Leather",
      "fit": "Slim",
      "color": "Navy"
    },
    "ratings": 3.7,
    "reviews_count": 95,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Grey",
      "Blue",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Shirts 47",
    "brand": "Modern Essentials",
    "category": "Shirts",
    "price": 30.3,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 192,
    "sku": "MO-SH-047",
    "specs": {
      "material": "Silk",
      "fit": "Oversized",
      "color": "Brown"
    },
    "ratings": 4.1,
    "reviews_count": 21,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Black",
      "Red",
      "Khaki",
      "Brown"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Accessories 48",
    "brand": "Cozy Knits",
    "category": "Accessories",
    "price": 190.81,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 93,
    "sku": "CO-AC-048",
    "specs": {
      "material": "Leather",
      "fit": "Slim",
      "color": "Navy"
    },
    "ratings": 4.3,
    "reviews_count": 58,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Brown",
      "Navy"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Hoodies 49",
    "brand": "StreetWear Co.",
    "category": "Hoodies",
    "price": 115.83,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 197,
    "sku": "ST-HO-049",
    "specs": {
      "material": "Linen",
      "fit": "Straight",
      "color": "Red"
    },
    "ratings": 4.7,
    "reviews_count": 35,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Shoes 50",
    "brand": "Classic Line",
    "category": "Shoes",
    "price": 35.92,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 112,
    "sku": "CL-SH-050",
    "specs": {
      "material": "Silk",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 3.9,
    "reviews_count": 34,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Green",
      "Brown",
      "Yellow"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Sweaters 51",
    "brand": "BlueWear",
    "category": "Sweaters",
    "price": 89.21,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 35,
    "sku": "BL-SW-051",
    "specs": {
      "material": "Mesh",
      "fit": "Straight",
      "color": "Yellow"
    },
    "ratings": 3.7,
    "reviews_count": 58,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Red",
      "Khaki"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Pants 52",
    "brand": "Modern Essentials",
    "category": "Pants",
    "price": 35.93,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 160,
    "sku": "MO-PA-052",
    "specs": {
      "material": "Cotton",
      "fit": "Oversized",
      "color": "Khaki"
    },
    "ratings": 4.0,
    "reviews_count": 21,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "White"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Pants 53",
    "brand": "StreetWear Co.",
    "category": "Pants",
    "price": 84.87,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 113,
    "sku": "ST-PA-053",
    "specs": {
      "material": "Leather",
      "fit": "True to Size",
      "color": "Brown"
    },
    "ratings": 3.8,
    "reviews_count": 68,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Yellow",
      "Red",
      "Blue"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Accessories 54",
    "brand": "StreetWear Co.",
    "category": "Accessories",
    "price": 128.23,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 61,
    "sku": "ST-AC-054",
    "specs": {
      "material": "Silk",
      "fit": "True to Size",
      "color": "Black"
    },
    "ratings": 4.3,
    "reviews_count": 100,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Khaki"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Hoodies 55",
    "brand": "Active Gear",
    "category": "Hoodies",
    "price": 45.07,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 79,
    "sku": "AC-HO-055",
    "specs": {
      "material": "Denim",
      "fit": "Slim",
      "color": "Blue"
    },
    "ratings": 4.6,
    "reviews_count": 89,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Yellow",
      "Red",
      "Navy"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Shirts 56",
    "brand": "Cozy Knits",
    "category": "Shirts",
    "price": 47.35,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 240,
    "sku": "CO-SH-056",
    "specs": {
      "material": "Cotton",
      "fit": "Oversized",
      "color": "Black"
    },
    "ratings": 3.5,
    "reviews_count": 5,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials T-Shirts 57",
    "brand": "Modern Essentials",
    "category": "T-Shirts",
    "price": 178.36,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 155,
    "sku": "MO-T--057",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Slim",
      "color": "Black"
    },
    "ratings": 3.6,
    "reviews_count": 98,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Hoodies 58",
    "brand": "Classic Line",
    "category": "Hoodies",
    "price": 82.07,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 142,
    "sku": "CL-HO-058",
    "specs": {
      "material": "Cotton",
      "fit": "Oversized",
      "color": "Blue"
    },
    "ratings": 3.7,
    "reviews_count": 38,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Green",
      "Brown",
      "Grey"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Sweaters 59",
    "brand": "Urban Style",
    "category": "Sweaters",
    "price": 137.68,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 84,
    "sku": "UR-SW-059",
    "specs": {
      "material": "Silk",
      "fit": "Straight",
      "color": "Red"
    },
    "ratings": 3.5,
    "reviews_count": 22,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Red",
      "Grey",
      "White"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Pants 60",
    "brand": "Rebel Wear",
    "category": "Pants",
    "price": 95.57,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 32,
    "sku": "RE-PA-060",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Relaxed",
      "color": "Red"
    },
    "ratings": 3.5,
    "reviews_count": 95,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Green",
      "Red",
      "Brown"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Shirts 61",
    "brand": "Cozy Knits",
    "category": "Shirts",
    "price": 47.73,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 239,
    "sku": "CO-SH-061",
    "specs": {
      "material": "Cotton",
      "fit": "Straight",
      "color": "Navy"
    },
    "ratings": 3.8,
    "reviews_count": 99,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Shirts 62",
    "brand": "BlueWear",
    "category": "Shirts",
    "price": 41.54,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 75,
    "sku": "BL-SH-062",
    "specs": {
      "material": "Silk",
      "fit": "Oversized",
      "color": "White"
    },
    "ratings": 4.8,
    "reviews_count": 12,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "White",
      "Black"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear T-Shirts 63",
    "brand": "BlueWear",
    "category": "T-Shirts",
    "price": 30.5,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 212,
    "sku": "BL-T--063",
    "specs": {
      "material": "Mesh",
      "fit": "Straight",
      "color": "Brown"
    },
    "ratings": 3.6,
    "reviews_count": 31,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Black"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style T-Shirts 64",
    "brand": "Urban Style",
    "category": "T-Shirts",
    "price": 115.61,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 63,
    "sku": "UR-T--064",
    "specs": {
      "material": "Linen",
      "fit": "Regular",
      "color": "Brown"
    },
    "ratings": 4.9,
    "reviews_count": 35,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Hoodies 65",
    "brand": "Classic Line",
    "category": "Hoodies",
    "price": 164.73,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 137,
    "sku": "CL-HO-065",
    "specs": {
      "material": "Silk",
      "fit": "Straight",
      "color": "Blue"
    },
    "ratings": 3.6,
    "reviews_count": 90,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "White",
      "Black",
      "Yellow"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Shoes 66",
    "brand": "Active Gear",
    "category": "Shoes",
    "price": 41.01,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 186,
    "sku": "AC-SH-066",
    "specs": {
      "material": "Wool Blend",
      "fit": "True to Size",
      "color": "Black"
    },
    "ratings": 4.0,
    "reviews_count": 18,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Khaki",
      "Brown"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Dresses 67",
    "brand": "Cozy Knits",
    "category": "Dresses",
    "price": 54.11,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 59,
    "sku": "CO-DR-067",
    "specs": {
      "material": "Linen",
      "fit": "True to Size",
      "color": "Yellow"
    },
    "ratings": 4.9,
    "reviews_count": 15,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Blue",
      "Black"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Sweaters 68",
    "brand": "Cozy Knits",
    "category": "Sweaters",
    "price": 68.32,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 49,
    "sku": "CO-SW-068",
    "specs": {
      "material": "Cotton",
      "fit": "Regular",
      "color": "Blue"
    },
    "ratings": 4.7,
    "reviews_count": 97,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Navy",
      "Red"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Jackets 69",
    "brand": "BlueWear",
    "category": "Jackets",
    "price": 54.56,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 97,
    "sku": "BL-JA-069",
    "specs": {
      "material": "Wool Blend",
      "fit": "Slim",
      "color": "Yellow"
    },
    "ratings": 4.7,
    "reviews_count": 43,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Pants 70",
    "brand": "Rebel Wear",
    "category": "Pants",
    "price": 45.89,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 145,
    "sku": "RE-PA-070",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Regular",
      "color": "Red"
    },
    "ratings": 4.0,
    "reviews_count": 41,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Black"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Dresses 71",
    "brand": "Cozy Knits",
    "category": "Dresses",
    "price": 196.19,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 82,
    "sku": "CO-DR-071",
    "specs": {
      "material": "Wool Blend",
      "fit": "Relaxed",
      "color": "Khaki"
    },
    "ratings": 4.4,
    "reviews_count": 27,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Khaki"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Shoes 72",
    "brand": "Rebel Wear",
    "category": "Shoes",
    "price": 172.48,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 119,
    "sku": "RE-SH-072",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Oversized",
      "color": "Navy"
    },
    "ratings": 3.6,
    "reviews_count": 13,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Yellow",
      "Grey",
      "Blue"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Dresses 73",
    "brand": "Modern Essentials",
    "category": "Dresses",
    "price": 174.51,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 165,
    "sku": "MO-DR-073",
    "specs": {
      "material": "Leather",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 4.6,
    "reviews_count": 40,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Navy",
      "Red",
      "Blue"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Shoes 74",
    "brand": "Feminine Touch",
    "category": "Shoes",
    "price": 145.54,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 39,
    "sku": "FE-SH-074",
    "specs": {
      "material": "Wool Blend",
      "fit": "Slim",
      "color": "Grey"
    },
    "ratings": 4.8,
    "reviews_count": 38,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Brown",
      "Grey",
      "Navy",
      "White"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Shoes 75",
    "brand": "Urban Style",
    "category": "Shoes",
    "price": 133.86,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 52,
    "sku": "UR-SH-075",
    "specs": {
      "material": "Wool Blend",
      "fit": "Straight",
      "color": "Navy"
    },
    "ratings": 4.4,
    "reviews_count": 24,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Green",
      "Navy"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Accessories 76",
    "brand": "Winter Wardrobe",
    "category": "Accessories",
    "price": 135.82,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 206,
    "sku": "WI-AC-076",
    "specs": {
      "material": "Wool",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 4.1,
    "reviews_count": 50,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Brown",
      "Red"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear T-Shirts 77",
    "brand": "Active Gear",
    "category": "T-Shirts",
    "price": 190.99,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 179,
    "sku": "AC-T--077",
    "specs": {
      "material": "Silk",
      "fit": "Oversized",
      "color": "White"
    },
    "ratings": 4.5,
    "reviews_count": 84,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Sweaters 78",
    "brand": "Modern Essentials",
    "category": "Sweaters",
    "price": 77.5,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 179,
    "sku": "MO-SW-078",
    "specs": {
      "material": "Mesh",
      "fit": "Oversized",
      "color": "Red"
    },
    "ratings": 3.6,
    "reviews_count": 21,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Yellow",
      "Blue",
      "Grey"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Shoes 79",
    "brand": "Feminine Touch",
    "category": "Shoes",
    "price": 148.66,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 181,
    "sku": "FE-SH-079",
    "specs": {
      "material": "Linen",
      "fit": "Regular",
      "color": "Khaki"
    },
    "ratings": 4.8,
    "reviews_count": 44,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "White",
      "Black",
      "Blue"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Dresses 80",
    "brand": "Winter Wardrobe",
    "category": "Dresses",
    "price": 31.1,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 100,
    "sku": "WI-DR-080",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Oversized",
      "color": "Green"
    },
    "ratings": 4.0,
    "reviews_count": 40,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "White",
      "Red"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Shirts 81",
    "brand": "Modern Essentials",
    "category": "Shirts",
    "price": 137.44,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 158,
    "sku": "MO-SH-081",
    "specs": {
      "material": "Cotton",
      "fit": "Straight",
      "color": "Green"
    },
    "ratings": 4.9,
    "reviews_count": 91,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Navy",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Accessories 82",
    "brand": "Urban Style",
    "category": "Accessories",
    "price": 25.5,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 179,
    "sku": "UR-AC-082",
    "specs": {
      "material": "Mesh",
      "fit": "Regular",
      "color": "Grey"
    },
    "ratings": 4.7,
    "reviews_count": 60,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "White"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Shirts 83",
    "brand": "Feminine Touch",
    "category": "Shirts",
    "price": 192.11,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 78,
    "sku": "FE-SH-083",
    "specs": {
      "material": "Denim",
      "fit": "True to Size",
      "color": "Brown"
    },
    "ratings": 3.6,
    "reviews_count": 24,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Brown",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Hoodies 84",
    "brand": "Feminine Touch",
    "category": "Hoodies",
    "price": 144.38,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 233,
    "sku": "FE-HO-084",
    "specs": {
      "material": "Linen",
      "fit": "Relaxed",
      "color": "Yellow"
    },
    "ratings": 4.9,
    "reviews_count": 68,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Grey",
      "Red",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Pants 85",
    "brand": "Rebel Wear",
    "category": "Pants",
    "price": 195.8,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 182,
    "sku": "RE-PA-085",
    "specs": {
      "material": "Polyester",
      "fit": "Oversized",
      "color": "Green"
    },
    "ratings": 4.4,
    "reviews_count": 35,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Blue",
      "Navy"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Shoes 86",
    "brand": "Feminine Touch",
    "category": "Shoes",
    "price": 163.38,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 36,
    "sku": "FE-SH-086",
    "specs": {
      "material": "Denim",
      "fit": "Straight",
      "color": "White"
    },
    "ratings": 3.8,
    "reviews_count": 84,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Khaki"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Pants 87",
    "brand": "Active Gear",
    "category": "Pants",
    "price": 195.98,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 172,
    "sku": "AC-PA-087",
    "specs": {
      "material": "Cotton",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 3.9,
    "reviews_count": 31,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Red"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Shirts 88",
    "brand": "Cozy Knits",
    "category": "Shirts",
    "price": 35.49,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 193,
    "sku": "CO-SH-088",
    "specs": {
      "material": "Wool",
      "fit": "True to Size",
      "color": "White"
    },
    "ratings": 4.5,
    "reviews_count": 11,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Yellow",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Jackets 89",
    "brand": "StreetWear Co.",
    "category": "Jackets",
    "price": 30.33,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 100,
    "sku": "ST-JA-089",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 4.7,
    "reviews_count": 16,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Yellow",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits T-Shirts 90",
    "brand": "Cozy Knits",
    "category": "T-Shirts",
    "price": 120.22,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 197,
    "sku": "CO-T--090",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Regular",
      "color": "Black"
    },
    "ratings": 4.7,
    "reviews_count": 44,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "White",
      "Red",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Accessories 91",
    "brand": "Winter Wardrobe",
    "category": "Accessories",
    "price": 159.62,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 80,
    "sku": "WI-AC-091",
    "specs": {
      "material": "Mesh",
      "fit": "Slim",
      "color": "Red"
    },
    "ratings": 4.5,
    "reviews_count": 100,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Brown"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Sweaters 92",
    "brand": "Feminine Touch",
    "category": "Sweaters",
    "price": 24.32,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 147,
    "sku": "FE-SW-092",
    "specs": {
      "material": "Polyester",
      "fit": "Slim",
      "color": "Blue"
    },
    "ratings": 4.4,
    "reviews_count": 39,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Green",
      "Grey",
      "Blue"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Shirts 93",
    "brand": "Modern Essentials",
    "category": "Shirts",
    "price": 117.96,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 26,
    "sku": "MO-SH-093",
    "specs": {
      "material": "Linen",
      "fit": "Regular",
      "color": "Grey"
    },
    "ratings": 4.6,
    "reviews_count": 40,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Grey",
      "White",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Shirts 94",
    "brand": "Rebel Wear",
    "category": "Shirts",
    "price": 54.15,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 204,
    "sku": "RE-SH-094",
    "specs": {
      "material": "Linen",
      "fit": "True to Size",
      "color": "Blue"
    },
    "ratings": 4.6,
    "reviews_count": 34,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Brown",
      "Navy",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Hoodies 95",
    "brand": "Cozy Knits",
    "category": "Hoodies",
    "price": 133.59,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 213,
    "sku": "CO-HO-095",
    "specs": {
      "material": "Linen",
      "fit": "Oversized",
      "color": "Brown"
    },
    "ratings": 4.7,
    "reviews_count": 81,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Navy",
      "Grey",
      "Black",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Dresses 96",
    "brand": "Rebel Wear",
    "category": "Dresses",
    "price": 118.14,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 59,
    "sku": "RE-DR-096",
    "specs": {
      "material": "Cotton Blend",
      "fit": "True to Size",
      "color": "Grey"
    },
    "ratings": 4.6,
    "reviews_count": 57,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Khaki",
      "Black",
      "Green"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Shoes 97",
    "brand": "Cozy Knits",
    "category": "Shoes",
    "price": 150.56,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 88,
    "sku": "CO-SH-097",
    "specs": {
      "material": "Wool",
      "fit": "Regular",
      "color": "Navy"
    },
    "ratings": 4.6,
    "reviews_count": 41,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Brown",
      "Yellow",
      "Navy"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits T-Shirts 98",
    "brand": "Cozy Knits",
    "category": "T-Shirts",
    "price": 179.9,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 206,
    "sku": "CO-T--098",
    "specs": {
      "material": "Wool",
      "fit": "Slim",
      "color": "Khaki"
    },
    "ratings": 4.4,
    "reviews_count": 100,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Brown",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear T-Shirts 99",
    "brand": "Rebel Wear",
    "category": "T-Shirts",
    "price": 105.24,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 122,
    "sku": "RE-T--099",
    "specs": {
      "material": "Polyester",
      "fit": "Straight",
      "color": "White"
    },
    "ratings": 3.6,
    "reviews_count": 68,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Navy",
      "Khaki",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Dresses 100",
    "brand": "Urban Style",
    "category": "Dresses",
    "price": 57.68,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 146,
    "sku": "UR-DR-100",
    "specs": {
      "material": "Mesh",
      "fit": "Slim",
      "color": "Blue"
    },
    "ratings": 3.9,
    "reviews_count": 52,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Grey",
      "Red",
      "Yellow"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Jackets 101",
    "brand": "Classic Line",
    "category": "Jackets",
    "price": 79.74,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 125,
    "sku": "CL-JA-101",
    "specs": {
      "material": "Silk",
      "fit": "Slim",
      "color": "Yellow"
    },
    "ratings": 4.9,
    "reviews_count": 13,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Red",
      "Navy"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Sweaters 102",
    "brand": "Urban Style",
    "category": "Sweaters",
    "price": 51.62,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 37,
    "sku": "UR-SW-102",
    "specs": {
      "material": "Cotton",
      "fit": "Slim",
      "color": "Black"
    },
    "ratings": 4.5,
    "reviews_count": 94,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Grey",
      "Brown",
      "Green"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Hoodies 103",
    "brand": "Urban Style",
    "category": "Hoodies",
    "price": 152.46,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 53,
    "sku": "UR-HO-103",
    "specs": {
      "material": "Mesh",
      "fit": "Relaxed",
      "color": "Black"
    },
    "ratings": 3.5,
    "reviews_count": 99,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Khaki",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Shoes 104",
    "brand": "BlueWear",
    "category": "Shoes",
    "price": 186.77,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 203,
    "sku": "BL-SH-104",
    "specs": {
      "material": "Mesh",
      "fit": "Oversized",
      "color": "Green"
    },
    "ratings": 4.6,
    "reviews_count": 40,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Brown"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Hoodies 105",
    "brand": "Feminine Touch",
    "category": "Hoodies",
    "price": 168.34,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 45,
    "sku": "FE-HO-105",
    "specs": {
      "material": "Wool",
      "fit": "Regular",
      "color": "Khaki"
    },
    "ratings": 4.5,
    "reviews_count": 99,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Brown"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Sweaters 106",
    "brand": "BlueWear",
    "category": "Sweaters",
    "price": 45.85,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 181,
    "sku": "BL-SW-106",
    "specs": {
      "material": "Mesh",
      "fit": "Oversized",
      "color": "Grey"
    },
    "ratings": 3.8,
    "reviews_count": 63,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Brown",
      "Yellow",
      "Blue"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Pants 107",
    "brand": "Cozy Knits",
    "category": "Pants",
    "price": 65.57,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 159,
    "sku": "CO-PA-107",
    "specs": {
      "material": "Wool",
      "fit": "Straight",
      "color": "Grey"
    },
    "ratings": 3.6,
    "reviews_count": 85,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Khaki"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Sweaters 108",
    "brand": "Rebel Wear",
    "category": "Sweaters",
    "price": 165.07,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 110,
    "sku": "RE-SW-108",
    "specs": {
      "material": "Linen",
      "fit": "Oversized",
      "color": "Black"
    },
    "ratings": 4.3,
    "reviews_count": 35,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Khaki"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Jackets 109",
    "brand": "Winter Wardrobe",
    "category": "Jackets",
    "price": 123.09,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 173,
    "sku": "WI-JA-109",
    "specs": {
      "material": "Denim",
      "fit": "Regular",
      "color": "Yellow"
    },
    "ratings": 3.6,
    "reviews_count": 78,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Navy",
      "Grey",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Jackets 110",
    "brand": "Classic Line",
    "category": "Jackets",
    "price": 160.57,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 128,
    "sku": "CL-JA-110",
    "specs": {
      "material": "Silk",
      "fit": "Relaxed",
      "color": "Black"
    },
    "ratings": 4.8,
    "reviews_count": 91,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Navy",
      "Red",
      "Black"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Accessories 111",
    "brand": "StreetWear Co.",
    "category": "Accessories",
    "price": 189.6,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 207,
    "sku": "ST-AC-111",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Relaxed",
      "color": "Yellow"
    },
    "ratings": 4.4,
    "reviews_count": 54,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Blue",
      "Black"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Accessories 112",
    "brand": "Winter Wardrobe",
    "category": "Accessories",
    "price": 178.11,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 35,
    "sku": "WI-AC-112",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 4.7,
    "reviews_count": 60,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Blue"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Dresses 113",
    "brand": "Cozy Knits",
    "category": "Dresses",
    "price": 80.14,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 145,
    "sku": "CO-DR-113",
    "specs": {
      "material": "Wool Blend",
      "fit": "Slim",
      "color": "Yellow"
    },
    "ratings": 4.2,
    "reviews_count": 100,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "White",
      "Navy",
      "Yellow"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Sweaters 114",
    "brand": "BlueWear",
    "category": "Sweaters",
    "price": 138.28,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 28,
    "sku": "BL-SW-114",
    "specs": {
      "material": "Silk",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 4.2,
    "reviews_count": 58,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Grey",
      "Yellow"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Shirts 115",
    "brand": "Modern Essentials",
    "category": "Shirts",
    "price": 36.76,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 72,
    "sku": "MO-SH-115",
    "specs": {
      "material": "Wool",
      "fit": "Straight",
      "color": "Yellow"
    },
    "ratings": 4.2,
    "reviews_count": 92,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Jackets 116",
    "brand": "Rebel Wear",
    "category": "Jackets",
    "price": 154.66,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 74,
    "sku": "RE-JA-116",
    "specs": {
      "material": "Wool",
      "fit": "Regular",
      "color": "Brown"
    },
    "ratings": 4.0,
    "reviews_count": 24,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Grey",
      "Navy",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Jackets 117",
    "brand": "Urban Style",
    "category": "Jackets",
    "price": 104.1,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 28,
    "sku": "UR-JA-117",
    "specs": {
      "material": "Wool Blend",
      "fit": "Relaxed",
      "color": "White"
    },
    "ratings": 3.6,
    "reviews_count": 75,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Brown",
      "Navy",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Shirts 118",
    "brand": "Classic Line",
    "category": "Shirts",
    "price": 83.47,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 67,
    "sku": "CL-SH-118",
    "specs": {
      "material": "Linen",
      "fit": "Oversized",
      "color": "Green"
    },
    "ratings": 4.7,
    "reviews_count": 62,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Yellow",
      "Navy"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Shoes 119",
    "brand": "Modern Essentials",
    "category": "Shoes",
    "price": 51.84,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 165,
    "sku": "MO-SH-119",
    "specs": {
      "material": "Leather",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 4.6,
    "reviews_count": 53,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Blue"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Accessories 120",
    "brand": "Winter Wardrobe",
    "category": "Accessories",
    "price": 111.53,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 147,
    "sku": "WI-AC-120",
    "specs": {
      "material": "Mesh",
      "fit": "Regular",
      "color": "Navy"
    },
    "ratings": 3.7,
    "reviews_count": 27,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Khaki",
      "Grey"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Shirts 121",
    "brand": "Active Gear",
    "category": "Shirts",
    "price": 76.08,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 228,
    "sku": "AC-SH-121",
    "specs": {
      "material": "Linen",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 3.7,
    "reviews_count": 22,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Sweaters 122",
    "brand": "Winter Wardrobe",
    "category": "Sweaters",
    "price": 179.26,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 238,
    "sku": "WI-SW-122",
    "specs": {
      "material": "Denim",
      "fit": "Regular",
      "color": "Blue"
    },
    "ratings": 4.4,
    "reviews_count": 48,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Navy",
      "Yellow"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Hoodies 123",
    "brand": "Feminine Touch",
    "category": "Hoodies",
    "price": 59.5,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 189,
    "sku": "FE-HO-123",
    "specs": {
      "material": "Silk",
      "fit": "Straight",
      "color": "Grey"
    },
    "ratings": 3.8,
    "reviews_count": 19,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Grey",
      "Red",
      "Brown"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Jackets 124",
    "brand": "BlueWear",
    "category": "Jackets",
    "price": 169.05,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 29,
    "sku": "BL-JA-124",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Straight",
      "color": "Blue"
    },
    "ratings": 3.8,
    "reviews_count": 31,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "Navy",
      "Brown"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Sweaters 125",
    "brand": "Rebel Wear",
    "category": "Sweaters",
    "price": 133.36,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 98,
    "sku": "RE-SW-125",
    "specs": {
      "material": "Linen",
      "fit": "Oversized",
      "color": "Khaki"
    },
    "ratings": 3.7,
    "reviews_count": 27,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Brown",
      "Blue"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Hoodies 126",
    "brand": "Feminine Touch",
    "category": "Hoodies",
    "price": 162.99,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 21,
    "sku": "FE-HO-126",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Regular",
      "color": "Brown"
    },
    "ratings": 3.5,
    "reviews_count": 69,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Navy",
      "Yellow"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Shoes 127",
    "brand": "Feminine Touch",
    "category": "Shoes",
    "price": 152.14,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 95,
    "sku": "FE-SH-127",
    "specs": {
      "material": "Cotton",
      "fit": "Oversized",
      "color": "Yellow"
    },
    "ratings": 3.8,
    "reviews_count": 98,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Navy",
      "Blue"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Sweaters 128",
    "brand": "Rebel Wear",
    "category": "Sweaters",
    "price": 52.82,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 56,
    "sku": "RE-SW-128",
    "specs": {
      "material": "Wool",
      "fit": "Slim",
      "color": "Grey"
    },
    "ratings": 3.7,
    "reviews_count": 11,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Grey",
      "Blue",
      "Black"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Hoodies 129",
    "brand": "Modern Essentials",
    "category": "Hoodies",
    "price": 39.4,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 163,
    "sku": "MO-HO-129",
    "specs": {
      "material": "Silk",
      "fit": "Relaxed",
      "color": "White"
    },
    "ratings": 3.8,
    "reviews_count": 41,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Black",
      "Khaki",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Sweaters 130",
    "brand": "Rebel Wear",
    "category": "Sweaters",
    "price": 61.53,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 22,
    "sku": "RE-SW-130",
    "specs": {
      "material": "Leather",
      "fit": "True to Size",
      "color": "Yellow"
    },
    "ratings": 3.7,
    "reviews_count": 44,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Blue",
      "Green"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Hoodies 131",
    "brand": "Urban Style",
    "category": "Hoodies",
    "price": 71.81,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 206,
    "sku": "UR-HO-131",
    "specs": {
      "material": "Wool",
      "fit": "True to Size",
      "color": "Green"
    },
    "ratings": 4.7,
    "reviews_count": 81,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Khaki",
      "Navy",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Jackets 132",
    "brand": "Classic Line",
    "category": "Jackets",
    "price": 155.1,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 232,
    "sku": "CL-JA-132",
    "specs": {
      "material": "Mesh",
      "fit": "Oversized",
      "color": "Green"
    },
    "ratings": 3.6,
    "reviews_count": 78,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Grey",
      "White",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Jackets 133",
    "brand": "Active Gear",
    "category": "Jackets",
    "price": 177.06,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 188,
    "sku": "AC-JA-133",
    "specs": {
      "material": "Mesh",
      "fit": "Straight",
      "color": "Yellow"
    },
    "ratings": 4.4,
    "reviews_count": 67,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Blue",
      "Black"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Hoodies 134",
    "brand": "Winter Wardrobe",
    "category": "Hoodies",
    "price": 186.16,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 107,
    "sku": "WI-HO-134",
    "specs": {
      "material": "Linen",
      "fit": "True to Size",
      "color": "Yellow"
    },
    "ratings": 4.2,
    "reviews_count": 30,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Jackets 135",
    "brand": "Active Gear",
    "category": "Jackets",
    "price": 123.52,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 246,
    "sku": "AC-JA-135",
    "specs": {
      "material": "Denim",
      "fit": "Regular",
      "color": "Yellow"
    },
    "ratings": 3.6,
    "reviews_count": 16,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Khaki",
      "Yellow",
      "Brown"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Shoes 136",
    "brand": "Rebel Wear",
    "category": "Shoes",
    "price": 61.14,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 169,
    "sku": "RE-SH-136",
    "specs": {
      "material": "Wool Blend",
      "fit": "True to Size",
      "color": "Khaki"
    },
    "ratings": 3.7,
    "reviews_count": 24,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "White",
      "Grey",
      "Brown"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Pants 137",
    "brand": "StreetWear Co.",
    "category": "Pants",
    "price": 40.37,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 106,
    "sku": "ST-PA-137",
    "specs": {
      "material": "Polyester",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 3.5,
    "reviews_count": 19,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "White"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Dresses 138",
    "brand": "Urban Style",
    "category": "Dresses",
    "price": 186.71,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 142,
    "sku": "UR-DR-138",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Regular",
      "color": "Green"
    },
    "ratings": 4.6,
    "reviews_count": 5,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Brown",
      "Black"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Shirts 139",
    "brand": "BlueWear",
    "category": "Shirts",
    "price": 65.32,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 191,
    "sku": "BL-SH-139",
    "specs": {
      "material": "Denim",
      "fit": "Relaxed",
      "color": "Black"
    },
    "ratings": 4.0,
    "reviews_count": 87,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Shoes 140",
    "brand": "Winter Wardrobe",
    "category": "Shoes",
    "price": 149.38,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 58,
    "sku": "WI-SH-140",
    "specs": {
      "material": "Wool Blend",
      "fit": "True to Size",
      "color": "Navy"
    },
    "ratings": 4.3,
    "reviews_count": 74,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Green",
      "Red"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Hoodies 141",
    "brand": "Rebel Wear",
    "category": "Hoodies",
    "price": 197.4,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 222,
    "sku": "RE-HO-141",
    "specs": {
      "material": "Polyester",
      "fit": "Oversized",
      "color": "White"
    },
    "ratings": 4.7,
    "reviews_count": 56,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Accessories 142",
    "brand": "Feminine Touch",
    "category": "Accessories",
    "price": 84.31,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 181,
    "sku": "FE-AC-142",
    "specs": {
      "material": "Denim",
      "fit": "Straight",
      "color": "Grey"
    },
    "ratings": 4.6,
    "reviews_count": 37,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "White"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Jackets 143",
    "brand": "Modern Essentials",
    "category": "Jackets",
    "price": 33.3,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 126,
    "sku": "MO-JA-143",
    "specs": {
      "material": "Linen",
      "fit": "True to Size",
      "color": "Red"
    },
    "ratings": 4.7,
    "reviews_count": 98,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Navy",
      "Black",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Accessories 144",
    "brand": "Modern Essentials",
    "category": "Accessories",
    "price": 27.86,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 208,
    "sku": "MO-AC-144",
    "specs": {
      "material": "Wool",
      "fit": "Relaxed",
      "color": "Grey"
    },
    "ratings": 3.9,
    "reviews_count": 45,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "White",
      "Khaki"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Sweaters 145",
    "brand": "Winter Wardrobe",
    "category": "Sweaters",
    "price": 151.21,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 69,
    "sku": "WI-SW-145",
    "specs": {
      "material": "Polyester",
      "fit": "Oversized",
      "color": "Red"
    },
    "ratings": 4.2,
    "reviews_count": 42,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "White",
      "Grey"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Sweaters 146",
    "brand": "Cozy Knits",
    "category": "Sweaters",
    "price": 80.1,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 41,
    "sku": "CO-SW-146",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Slim",
      "color": "Yellow"
    },
    "ratings": 4.6,
    "reviews_count": 46,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Blue",
      "White"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Shirts 147",
    "brand": "Cozy Knits",
    "category": "Shirts",
    "price": 102.92,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 182,
    "sku": "CO-SH-147",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Oversized",
      "color": "Navy"
    },
    "ratings": 4.7,
    "reviews_count": 66,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Khaki",
      "Red",
      "Yellow"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Shoes 148",
    "brand": "BlueWear",
    "category": "Shoes",
    "price": 45.39,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 103,
    "sku": "BL-SH-148",
    "specs": {
      "material": "Cotton",
      "fit": "Slim",
      "color": "Yellow"
    },
    "ratings": 4.6,
    "reviews_count": 39,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Grey",
      "Navy",
      "Brown"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Jackets 149",
    "brand": "Rebel Wear",
    "category": "Jackets",
    "price": 167.88,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 129,
    "sku": "RE-JA-149",
    "specs": {
      "material": "Wool Blend",
      "fit": "Oversized",
      "color": "Blue"
    },
    "ratings": 3.9,
    "reviews_count": 87,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Brown",
      "Blue",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "BlueWear Hoodies 150",
    "brand": "BlueWear",
    "category": "Hoodies",
    "price": 52.09,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 142,
    "sku": "BL-HO-150",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Oversized",
      "color": "Red"
    },
    "ratings": 4.5,
    "reviews_count": 35,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Khaki",
      "Brown",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Sweaters 151",
    "brand": "Feminine Touch",
    "category": "Sweaters",
    "price": 183.78,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 89,
    "sku": "FE-SW-151",
    "specs": {
      "material": "Denim",
      "fit": "Straight",
      "color": "Yellow"
    },
    "ratings": 4.3,
    "reviews_count": 28,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Grey",
      "Blue",
      "Green"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Hoodies 152",
    "brand": "Rebel Wear",
    "category": "Hoodies",
    "price": 79.76,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 38,
    "sku": "RE-HO-152",
    "specs": {
      "material": "Denim",
      "fit": "Relaxed",
      "color": "Yellow"
    },
    "ratings": 4.3,
    "reviews_count": 99,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Navy",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Accessories 153",
    "brand": "Active Gear",
    "category": "Accessories",
    "price": 143.77,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 187,
    "sku": "AC-AC-153",
    "specs": {
      "material": "Polyester",
      "fit": "Oversized",
      "color": "Red"
    },
    "ratings": 4.6,
    "reviews_count": 37,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Brown",
      "White",
      "Yellow"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Dresses 154",
    "brand": "Feminine Touch",
    "category": "Dresses",
    "price": 151.43,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 43,
    "sku": "FE-DR-154",
    "specs": {
      "material": "Wool Blend",
      "fit": "Regular",
      "color": "Brown"
    },
    "ratings": 3.6,
    "reviews_count": 93,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Navy",
      "White",
      "Brown",
      "Khaki"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Jackets 155",
    "brand": "Active Gear",
    "category": "Jackets",
    "price": 180.12,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 99,
    "sku": "AC-JA-155",
    "specs": {
      "material": "Leather",
      "fit": "Regular",
      "color": "Green"
    },
    "ratings": 4.4,
    "reviews_count": 93,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Sweaters 156",
    "brand": "Urban Style",
    "category": "Sweaters",
    "price": 85.7,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 112,
    "sku": "UR-SW-156",
    "specs": {
      "material": "Polyester",
      "fit": "Regular",
      "color": "White"
    },
    "ratings": 4.4,
    "reviews_count": 97,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Yellow",
      "Brown"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch T-Shirts 157",
    "brand": "Feminine Touch",
    "category": "T-Shirts",
    "price": 178.78,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 225,
    "sku": "FE-T--157",
    "specs": {
      "material": "Mesh",
      "fit": "True to Size",
      "color": "Grey"
    },
    "ratings": 4.2,
    "reviews_count": 85,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Brown",
      "Grey"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Sweaters 158",
    "brand": "Active Gear",
    "category": "Sweaters",
    "price": 58.16,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 204,
    "sku": "AC-SW-158",
    "specs": {
      "material": "Wool",
      "fit": "Straight",
      "color": "Green"
    },
    "ratings": 3.6,
    "reviews_count": 12,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Green",
      "Grey"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Jackets 159",
    "brand": "Winter Wardrobe",
    "category": "Jackets",
    "price": 168.39,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 125,
    "sku": "WI-JA-159",
    "specs": {
      "material": "Polyester",
      "fit": "Straight",
      "color": "Khaki"
    },
    "ratings": 3.7,
    "reviews_count": 20,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Khaki",
      "Yellow",
      "Navy"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Jackets 160",
    "brand": "Urban Style",
    "category": "Jackets",
    "price": 78.05,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 74,
    "sku": "UR-JA-160",
    "specs": {
      "material": "Wool",
      "fit": "Regular",
      "color": "Green"
    },
    "ratings": 4.8,
    "reviews_count": 91,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Green",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear T-Shirts 161",
    "brand": "Rebel Wear",
    "category": "T-Shirts",
    "price": 164.54,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 78,
    "sku": "RE-T--161",
    "specs": {
      "material": "Denim",
      "fit": "Relaxed",
      "color": "Blue"
    },
    "ratings": 4.1,
    "reviews_count": 57,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "White",
      "Blue",
      "Brown"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Accessories 162",
    "brand": "Feminine Touch",
    "category": "Accessories",
    "price": 67.81,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 221,
    "sku": "FE-AC-162",
    "specs": {
      "material": "Silk",
      "fit": "True to Size",
      "color": "Khaki"
    },
    "ratings": 3.6,
    "reviews_count": 51,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "Yellow",
      "White"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Jackets 163",
    "brand": "Winter Wardrobe",
    "category": "Jackets",
    "price": 34.73,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 189,
    "sku": "WI-JA-163",
    "specs": {
      "material": "Cotton",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 4.1,
    "reviews_count": 44,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "White",
      "Brown",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Shoes 164",
    "brand": "Classic Line",
    "category": "Shoes",
    "price": 103.83,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 118,
    "sku": "CL-SH-164",
    "specs": {
      "material": "Denim",
      "fit": "Straight",
      "color": "Black"
    },
    "ratings": 4.3,
    "reviews_count": 64,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "Grey",
      "Yellow",
      "Navy"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Dresses 165",
    "brand": "Modern Essentials",
    "category": "Dresses",
    "price": 182.08,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 185,
    "sku": "MO-DR-165",
    "specs": {
      "material": "Linen",
      "fit": "Relaxed",
      "color": "Blue"
    },
    "ratings": 4.3,
    "reviews_count": 75,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "Red"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Pants 166",
    "brand": "Classic Line",
    "category": "Pants",
    "price": 64.9,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 120,
    "sku": "CL-PA-166",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Slim",
      "color": "Green"
    },
    "ratings": 3.5,
    "reviews_count": 28,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Black",
      "Blue",
      "White",
      "Khaki"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Sweaters 167",
    "brand": "Cozy Knits",
    "category": "Sweaters",
    "price": 98.35,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 131,
    "sku": "CO-SW-167",
    "specs": {
      "material": "Wool Blend",
      "fit": "Straight",
      "color": "Navy"
    },
    "ratings": 4.4,
    "reviews_count": 77,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Grey",
      "White",
      "Khaki",
      "Brown"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Accessories 168",
    "brand": "Feminine Touch",
    "category": "Accessories",
    "price": 158.38,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 170,
    "sku": "FE-AC-168",
    "specs": {
      "material": "Denim",
      "fit": "True to Size",
      "color": "Blue"
    },
    "ratings": 3.7,
    "reviews_count": 74,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Green",
      "Grey",
      "Navy"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch T-Shirts 169",
    "brand": "Feminine Touch",
    "category": "T-Shirts",
    "price": 56.66,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 248,
    "sku": "FE-T--169",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 3.9,
    "reviews_count": 97,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Black"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Accessories 170",
    "brand": "Active Gear",
    "category": "Accessories",
    "price": 91.07,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 174,
    "sku": "AC-AC-170",
    "specs": {
      "material": "Wool",
      "fit": "Straight",
      "color": "Yellow"
    },
    "ratings": 4.4,
    "reviews_count": 45,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "White",
      "Navy"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Pants 171",
    "brand": "Feminine Touch",
    "category": "Pants",
    "price": 145.47,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 234,
    "sku": "FE-PA-171",
    "specs": {
      "material": "Linen",
      "fit": "Slim",
      "color": "Blue"
    },
    "ratings": 3.7,
    "reviews_count": 80,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Blue",
      "Brown",
      "Yellow"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Shoes 172",
    "brand": "Active Gear",
    "category": "Shoes",
    "price": 154.65,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 141,
    "sku": "AC-SH-172",
    "specs": {
      "material": "Linen",
      "fit": "Regular",
      "color": "Red"
    },
    "ratings": 4.6,
    "reviews_count": 36,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Yellow",
      "Blue"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Jackets 173",
    "brand": "Modern Essentials",
    "category": "Jackets",
    "price": 115.26,
    "description": "A stylish jackets made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/jacket.jpg"
    ],
    "stock": 170,
    "sku": "MO-JA-173",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Khaki"
    },
    "ratings": 4.2,
    "reviews_count": 17,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Yellow",
      "Khaki"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Dresses 174",
    "brand": "Active Gear",
    "category": "Dresses",
    "price": 183.32,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 75,
    "sku": "AC-DR-174",
    "specs": {
      "material": "Leather",
      "fit": "Oversized",
      "color": "Black"
    },
    "ratings": 4.8,
    "reviews_count": 31,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Blue",
      "Black",
      "Grey"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Pants 175",
    "brand": "Cozy Knits",
    "category": "Pants",
    "price": 36.73,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 206,
    "sku": "CO-PA-175",
    "specs": {
      "material": "Polyester",
      "fit": "True to Size",
      "color": "Brown"
    },
    "ratings": 4.3,
    "reviews_count": 35,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Red",
      "Black",
      "Khaki"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Shirts 176",
    "brand": "Classic Line",
    "category": "Shirts",
    "price": 187.54,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 97,
    "sku": "CL-SH-176",
    "specs": {
      "material": "Cotton",
      "fit": "Relaxed",
      "color": "Black"
    },
    "ratings": 4.3,
    "reviews_count": 93,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Brown",
      "White"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Shirts 177",
    "brand": "Modern Essentials",
    "category": "Shirts",
    "price": 136.59,
    "description": "A stylish shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shirt.jpg"
    ],
    "stock": 149,
    "sku": "MO-SH-177",
    "specs": {
      "material": "Silk",
      "fit": "Regular",
      "color": "Blue"
    },
    "ratings": 4.3,
    "reviews_count": 15,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Black",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Dresses 178",
    "brand": "Classic Line",
    "category": "Dresses",
    "price": 159.12,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 141,
    "sku": "CL-DR-178",
    "specs": {
      "material": "Linen",
      "fit": "Straight",
      "color": "Grey"
    },
    "ratings": 4.1,
    "reviews_count": 59,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Black",
      "Green",
      "Khaki"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Hoodies 179",
    "brand": "Winter Wardrobe",
    "category": "Hoodies",
    "price": 91.13,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 120,
    "sku": "WI-HO-179",
    "specs": {
      "material": "Polyester",
      "fit": "Oversized",
      "color": "Blue"
    },
    "ratings": 3.7,
    "reviews_count": 92,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "White",
      "Khaki",
      "Navy",
      "Green"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Accessories 180",
    "brand": "Modern Essentials",
    "category": "Accessories",
    "price": 117.16,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 138,
    "sku": "MO-AC-180",
    "specs": {
      "material": "Cotton",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 4.8,
    "reviews_count": 24,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Black",
      "White"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Pants 181",
    "brand": "Modern Essentials",
    "category": "Pants",
    "price": 99.33,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 185,
    "sku": "MO-PA-181",
    "specs": {
      "material": "Leather",
      "fit": "True to Size",
      "color": "Blue"
    },
    "ratings": 4.1,
    "reviews_count": 92,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Black",
      "Blue",
      "White"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Shoes 182",
    "brand": "Active Gear",
    "category": "Shoes",
    "price": 120.68,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 25,
    "sku": "AC-SH-182",
    "specs": {
      "material": "Cotton Blend",
      "fit": "Relaxed",
      "color": "Red"
    },
    "ratings": 4.8,
    "reviews_count": 92,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Yellow"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Classic Line Dresses 183",
    "brand": "Classic Line",
    "category": "Dresses",
    "price": 102.64,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 174,
    "sku": "CL-DR-183",
    "specs": {
      "material": "Leather",
      "fit": "Slim",
      "color": "Black"
    },
    "ratings": 3.7,
    "reviews_count": 28,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Yellow",
      "Blue",
      "Navy",
      "White"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Active Gear Shoes 184",
    "brand": "Active Gear",
    "category": "Shoes",
    "price": 115.62,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 195,
    "sku": "AC-SH-184",
    "specs": {
      "material": "Leather",
      "fit": "Relaxed",
      "color": "Blue"
    },
    "ratings": 4.6,
    "reviews_count": 90,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Red",
      "White"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Dresses 185",
    "brand": "Cozy Knits",
    "category": "Dresses",
    "price": 22.98,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 199,
    "sku": "CO-DR-185",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Black"
    },
    "ratings": 3.7,
    "reviews_count": 96,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Grey"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Dresses 186",
    "brand": "Rebel Wear",
    "category": "Dresses",
    "price": 126.23,
    "description": "A stylish dresses made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/dress.jpg"
    ],
    "stock": 35,
    "sku": "RE-DR-186",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 4.6,
    "reviews_count": 89,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Khaki",
      "White",
      "Brown",
      "Green"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Accessories 187",
    "brand": "Winter Wardrobe",
    "category": "Accessories",
    "price": 195.53,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 87,
    "sku": "WI-AC-187",
    "specs": {
      "material": "Mesh",
      "fit": "Slim",
      "color": "Navy"
    },
    "ratings": 4.4,
    "reviews_count": 8,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Blue",
      "Red",
      "Black",
      "White"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Hoodies 188",
    "brand": "Modern Essentials",
    "category": "Hoodies",
    "price": 96.22,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 222,
    "sku": "MO-HO-188",
    "specs": {
      "material": "Leather",
      "fit": "Oversized",
      "color": "Grey"
    },
    "ratings": 4.1,
    "reviews_count": 92,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Yellow",
      "White",
      "Green",
      "Red"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Pants 189",
    "brand": "Modern Essentials",
    "category": "Pants",
    "price": 185.46,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 109,
    "sku": "MO-PA-189",
    "specs": {
      "material": "Wool Blend",
      "fit": "True to Size",
      "color": "Khaki"
    },
    "ratings": 3.9,
    "reviews_count": 84,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Red",
      "Black",
      "Navy",
      "Yellow"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. T-Shirts 190",
    "brand": "StreetWear Co.",
    "category": "T-Shirts",
    "price": 51.13,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 160,
    "sku": "ST-T--190",
    "specs": {
      "material": "Wool",
      "fit": "Relaxed",
      "color": "Green"
    },
    "ratings": 3.6,
    "reviews_count": 44,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Brown",
      "Navy",
      "Yellow",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Rebel Wear Pants 191",
    "brand": "Rebel Wear",
    "category": "Pants",
    "price": 148.75,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 219,
    "sku": "RE-PA-191",
    "specs": {
      "material": "Wool Blend",
      "fit": "Relaxed",
      "color": "Black"
    },
    "ratings": 4.4,
    "reviews_count": 35,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Black",
      "White"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Accessories 192",
    "brand": "Urban Style",
    "category": "Accessories",
    "price": 25.6,
    "description": "A stylish accessories made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/accessory.jpg"
    ],
    "stock": 188,
    "sku": "UR-AC-192",
    "specs": {
      "material": "Cotton",
      "fit": "Oversized",
      "color": "Yellow"
    },
    "ratings": 3.8,
    "reviews_count": 52,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Green",
      "Brown",
      "Yellow"
    ],
    "size_options": [
      "One Size"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style T-Shirts 193",
    "brand": "Urban Style",
    "category": "T-Shirts",
    "price": 192.23,
    "description": "A stylish t-shirts made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/t-shirt.jpg"
    ],
    "stock": 44,
    "sku": "UR-T--193",
    "specs": {
      "material": "Polyester",
      "fit": "Slim",
      "color": "Blue"
    },
    "ratings": 4.5,
    "reviews_count": 35,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "White",
      "Brown",
      "Black",
      "Grey"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Urban Style Hoodies 194",
    "brand": "Urban Style",
    "category": "Hoodies",
    "price": 164.2,
    "description": "A stylish hoodies made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/hoody.jpg"
    ],
    "stock": 123,
    "sku": "UR-HO-194",
    "specs": {
      "material": "Mesh",
      "fit": "Regular",
      "color": "Green"
    },
    "ratings": 3.7,
    "reviews_count": 44,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Brown",
      "White",
      "Blue"
    ],
    "size_options": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Feminine Touch Sweaters 195",
    "brand": "Feminine Touch",
    "category": "Sweaters",
    "price": 183.61,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 103,
    "sku": "FE-SW-195",
    "specs": {
      "material": "Polyester",
      "fit": "True to Size",
      "color": "Green"
    },
    "ratings": 4.9,
    "reviews_count": 14,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Grey",
      "Yellow",
      "Blue"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Cozy Knits Shoes 196",
    "brand": "Cozy Knits",
    "category": "Shoes",
    "price": 48.45,
    "description": "A stylish shoes made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/shoes.jpg"
    ],
    "stock": 26,
    "sku": "CO-SH-196",
    "specs": {
      "material": "Leather",
      "fit": "Slim",
      "color": "Brown"
    },
    "ratings": 4.6,
    "reviews_count": 81,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Khaki",
      "Brown"
    ],
    "size_options": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Sweaters 197",
    "brand": "Modern Essentials",
    "category": "Sweaters",
    "price": 81.88,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 159,
    "sku": "MO-SW-197",
    "specs": {
      "material": "Silk",
      "fit": "Relaxed",
      "color": "Brown"
    },
    "ratings": 4.2,
    "reviews_count": 86,
    "on_sale": true,
    "is_active": true,
    "color_options": [
      "Brown",
      "Yellow"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "StreetWear Co. Pants 198",
    "brand": "StreetWear Co.",
    "category": "Pants",
    "price": 136.54,
    "description": "A stylish pants made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/pants.jpg"
    ],
    "stock": 152,
    "sku": "ST-PA-198",
    "specs": {
      "material": "Polyester",
      "fit": "Relaxed",
      "color": "Khaki"
    },
    "ratings": 3.8,
    "reviews_count": 52,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Red",
      "Brown",
      "Navy"
    ],
    "size_options": [
      "28",
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Modern Essentials Sweaters 199",
    "brand": "Modern Essentials",
    "category": "Sweaters",
    "price": 45.8,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 69,
    "sku": "MO-SW-199",
    "specs": {
      "material": "Denim",
      "fit": "True to Size",
      "color": "White"
    },
    "ratings": 4.1,
    "reviews_count": 62,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Green",
      "Black"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "title": "Winter Wardrobe Sweaters 200",
    "brand": "Winter Wardrobe",
    "category": "Sweaters",
    "price": 196.25,
    "description": "A stylish sweaters made with quality materials.",
    "images": [
      "https://res.cloudinary.com/dbelkcsrq/image/upload/brand/products/sweater.jpg"
    ],
    "stock": 29,
    "sku": "WI-SW-200",
    "specs": {
      "material": "Silk",
      "fit": "Oversized",
      "color": "Yellow"
    },
    "ratings": 4.6,
    "reviews_count": 26,
    "on_sale": false,
    "is_active": true,
    "color_options": [
      "Yellow",
      "White",
      "Brown"
    ],
    "size_options": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "created_at": new Date(),
    "updated_at": new Date()
  }
];

async function populateFirestore() {
  console.log("Starting Firestore data population...");
  const batch = db.batch();

  const productsRef = db.collection('products');

  // Populate products
  productsData.forEach(product => {
    const docRef = productsRef.doc(); // Firestore auto-generates a unique ID
    batch.set(docRef, {
      ...product,
      created_at: new Date(),
      updated_at: new Date()
    });
  });

  try {
    await batch.commit();
    console.log("Firestore database populated successfully!");
  } catch (error) {
    console.error("Error writing data to Firestore:", error);
  }
}

populateFirestore();