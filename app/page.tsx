'use client';

import React, { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  category: 'surf' | 'dishwash' | 'soap'  | 'sanitizer';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  size: string;
  packLabel: 'Carton' | 'Dozen';
  unitsPerPack: number;
  volume?: string;
  
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Farah Hand Sanitizer',
    category: 'sanitizer',
    price: 3000,          // 1 Dozen ki qeemat
    originalPrice: 17400,
    rating: 4.9,
    reviewsCount: 142,
    image: '/sanitizer1%20(1).jpeg',
    size: '500 ml',
    packLabel: 'Carton',
    unitsPerPack: 20,
    volume: '',
  },
  {
    id: '2',
    name: 'Farah Hand Sanitizer',
    category: 'sanitizer',
    price: 3000,
    originalPrice: 130,
    rating: 4.9,
    reviewsCount: 142,
    image: '/sanitizer1%20(2).jpeg',
    size: '500ml',
    packLabel: 'Carton',
    unitsPerPack: 20,
    volume: '1000ml',
  },
  {
    id: '3',
    name: 'Farah Dishwash - Apple & Peach',
    category: 'dishwash',
    price: 4200,           // 1 Dozen ki qeemat
    originalPrice: 5040,
    rating: 4.8,
    reviewsCount: 95,
    image: '/dishwasher3.jpeg',
    size: '500 ml',
    packLabel: 'Dozen',
    unitsPerPack: 12,
    volume: '',
  },
   {
    id: '4',
    name: 'Farah Dishwash - Apple & Peach',
    category: 'dishwash',
    price: 3200,           // 1 Dozen ki qeemat
    originalPrice: 5040,
    rating: 4.8,
    reviewsCount: 95,
    image: '/dishwasher2.jpeg',
    size: '500 ml',
    packLabel: 'Carton',
    unitsPerPack: 20,
    volume: '',
  },
   {
    id: '5',
    name: 'Farah Dishwash - Apple & Peach',
    category: 'dishwash',
    price: 2600,           // 1 Dozen ki qeemat
    originalPrice: 5040,
    rating: 4.8,
    reviewsCount: 95,
    image: '/dishwasher1.jpeg',
    size: '1000 ml',
    packLabel: 'Carton',
    unitsPerPack: 20,
    volume: '',
  },
  {
    id: '6',
    name: 'Farah Beauty Soap - Rose & Glow',
    category: 'soap',
    price: 4040,           // 1 Carton (48 pieces) ki qeemat
    originalPrice: 5760,
    rating: 4.9,
    reviewsCount: 110,
    image: 'soap2.jpeg',
    size: '',
    packLabel: 'Carton',
    unitsPerPack: 48,
  },
   {
    id: '7',
    name: 'Farah Beauty Soap - Rose & Glow',
    category: 'soap',
    price: 4040,           // 1 Carton (48 pieces) ki qeemat
    originalPrice: 5760,
    rating: 4.9,
    reviewsCount: 110,
    image: 'soap1.jpeg',
    size: '',
    packLabel: 'Carton',
    unitsPerPack: 48,
  },  {
    id: '8',
    name: 'Farah  Surf Powder ',
    category: 'surf',
    price: 6240,           // 1 Dozen (12 packs of 1 kg) ki qeemat
    originalPrice: 5800,
    rating: 4.9,
    reviewsCount: 120,
    image: '/surf1.jpeg',
    size: '1 kg Pack',
    packLabel: 'Carton',
    unitsPerPack: 24,
  },
    {
    id: '9',
    name: 'Farah Surf Powder ',
    category: 'surf',
    price: 3120,           // 1 Dozen (12 packs of 1 kg) ki qeemat
    originalPrice: 5800,
    rating: 4.9,
    reviewsCount: 120,
    image: '/surf2.jpeg',
    size: 'half kg ',
    packLabel: 'Carton',
    unitsPerPack: 24,
  },
    {
    id: '10',
    name: 'Farah Surf Powder ',
    category: 'surf',
    price: 6240,           // 1 Dozen (12 packs of 1 kg) ki qeemat
    originalPrice: 5800,
    rating: 4.9,
    reviewsCount: 120,
    image: '/surf3.jpeg',
    size: '1 kg',
    packLabel: 'Carton',
    unitsPerPack: 24,
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Muhammad Tariq',
    rating: 5,
    comment: 'Farah Surf cleaning performance is outstanding. Clothes look completely bright and fresh at a great factory price!',
    productName: 'Farah Detergent Powder (Surf)',
    date: '3 days ago',
  },
  {
    id: '2',
    author: 'Sadaf Kanwal',
    rating: 5,
    comment: 'The hand wash and beauty soaps have a lovely fragrance and keep skin soft. Saudi Farah Factory products are top quality!',
    productName: 'Farah Beauty Soap - Rose & Glow',
    date: '1 week ago',
  },
];

const FAQS = [
  {
    question: 'How can I place a wholesale bulk order?',
    answer: 'You can add items to your cart and checkout directly via WhatsApp or contact our sales team at +92 334 9556570 for special factory direct wholesale rates.',
  },
  {
    question: 'Is Cash on Delivery (COD) available across Pakistan?',
    answer: 'Yes! We offer nationwide Cash on Delivery for both retail packs and bulk wholesale orders.',
  },
  {
    question: 'Are Saudi Farah Factory products 100% Halal certified?',
    answer: 'Absoloutely. All our soaps, detergents, and skincare products are manufactured following strict 100% Halal certified standards.',
  },
  {
    question: 'Where is the main factory outlet located?',
    answer: 'Our official factory outlet is located at Plot 45, Industrial Zone, Selvia Town, Kawwak, Pakistan.',
  },
];

const ORDER_WHATSAPP_NUMBER = '923491224123'; // abhi test ke liye aap ka number, baad mein owner ka likhein

const ROTATOR_IMAGES = [
 
 
  { src: '/dishwasher1.jpeg', name: 'dishwasher1' },
   { src: '/sanitizer1%20(2).jpeg', name: 'Farah Hand Sanitizer Gel' },
  { src: '/mixpic.jpeg', name: 'Farah Products' },
   { src: '/dishwasher2.jpeg', name: 'Farah Dishwash Liquid' },
  { src: '/sanitizer1%20(1).jpeg', name: 'Farah Hand Sanitizer' },
   { src: '/soap2.jpeg', name: 'soap2' },
  { src: '/surf2.jpeg', name: 'Surf' },
   { src: '/soap1.jpeg', name: 'soap1' },
];
function ProductRotator({
  direction = 'vertical',
  speed = 63,
}: {
  direction?: 'vertical' | 'horizontal';
  speed?: number; // poora loop kitne seconds mein ho (bada number = dheemi)
}) {
  const isVertical = direction === 'vertical';
  // set ko 2 baar repeat karte hain taake loop beech mein tootay nahi
  const loop = [...ROTATOR_IMAGES, ...ROTATOR_IMAGES];
  const fade = isVertical
    ? 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)'
    : 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)';

  return (
    <div className="relative group w-full max-w-sm">
      <style>{`
        @keyframes scroll-y { from { transform: translateY(0) } to { transform: translateY(-50%) } }
        @keyframes scroll-x { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-500" />

      {/* Bahar ka card banner jaisa hi (same width aur height) */}
      <div className="relative bg-white rounded-3xl p-2.5 shadow-xl border border-slate-200 overflow-hidden">
        <div
          className={`relative rounded-2xl overflow-hidden ${isVertical ? 'h-[600px]' : 'h-[300px]'}`}
          style={{ WebkitMaskImage: fade, maskImage: fade }}
        >
          <div
            className={`marquee-track flex ${isVertical ? 'flex-col' : 'flex-row w-max h-full'}`}
            style={{
              animation: `${isVertical ? 'scroll-y' : 'scroll-x'} ${speed}s linear infinite`,
            }}
          >
            {loop.map((p, i) => (
              /* Har picture ka card ek jaisa size ka: choti/badi picture bhi barabar fit */
              <div
                key={i}
                className={`shrink-0 aspect-[4/5] flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 p-3 ${
                  isVertical ? 'w-full mb-4' : 'h-full mr-4'
                }`}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SaudiFarahFactoryApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState(INITIAL_PRODUCTS[0].name);

  const filteredProducts = selectedCategory === 'all'
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const lines = cart.map((item, i) => {
      const packWord = item.packLabel === 'Carton' && item.quantity > 1 ? 'Cartons' : item.packLabel;
      const pcs = item.quantity * item.unitsPerPack;
      return `${i + 1}. ${item.name} (${item.size})\n   ${item.quantity} ${packWord} (${pcs} pcs) x Rs. ${item.price} = Rs. ${item.price * item.quantity}`;
    });

    const message =
      `*Saudi Farah Factory - New Order*\n\n` +
      `*Customer Details*\n` +
      `Name: ${customerName}\n` +
      `Phone: ${customerPhone}\n` +
      `City: ${customerCity}\n` +
      `Address: ${customerAddress}\n\n` +
      `*Order*\n${lines.join('\n')}\n\n` +
      `*Total Amount: Rs. ${cartTotal}*\n` +
      `Payment: Cash on Delivery\n\n` +
      `Please confirm my order.`;

    // Owner ka WhatsApp number (agar badalna ho to sirf ye number badlein)
        window.open(`https://wa.me/923491224123?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const review: Review = {
      id: Date.now().toString(),
      author: newAuthor,
      rating: Number(newRating),
      comment: newComment,
      productName: newProduct,
      date: 'Just now',
    };

    setReviews([review, ...reviews]);
    setNewAuthor('');
    setNewComment('');
    setIsReviewModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative selection:bg-emerald-600 selection:text-white">
      {/* Top Professional Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-emerald-700 to-amber-600 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-extrabold tracking-wider shadow-sm">
        ✨ 100% HALAL CERTIFIED | VVIP FACTORY DIRECT WHOLESALE & RETAIL | CASH ON DELIVERY AVAILABLE ✨
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Professional Extracted Tree Logo Container */}
            <div className="w-14 h-14 flex items-center justify-center bg-transparent overflow-hidden">
              <img
                src="/farah_logo.svg"
                alt="Saudi Farah Factory Logo"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block">Saudi Farah Factory</span>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">سعودیہ فرح فیکٹری • Rawalpindi</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 shadow-md shadow-emerald-600/20 text-sm"
            >
              <span>🛒 Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-amber-400 text-slate-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modern Professional Hero Section */}
     <section className="relative bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/30 text-slate-900 pt-0 pb-12 lg:pt-0 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-200">
        <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,24rem)_1fr_minmax(0,24rem)] gap-10 items-center">
          {/* Rotating product pictures (left side) */}
          <div className="flex justify-center">
            <ProductRotator direction="vertical" speed={30} />
          </div>

          {/* Company introduction (middle) */}
          <div className="space-y-5 text-center lg:text-left py-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-xs">
              <span>✓ Official Factory Outlet</span>
            </div>
            <h1 className="text-3xl xl:text-4xl font-black tracking-tight leading-tight text-slate-900">
              Saudi Farah Factory <br />
              <span className="text-emerald-700">Cleaning & Skincare Products</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Saudi Farah Factory, Chaklala Scheme 3, Rawalpindi, manufactures detergent powder, hand wash and beauty soaps for every home. We supply directly from the factory, so you get quality products at wholesale and retail rates, delivered across Pakistan.
            </p>
            <ul className="space-y-2 text-sm font-bold text-slate-800 inline-block text-left">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600">✓</span>
                <span>100% Halal certified manufacturing</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600">✓</span>
                <span>Direct factory wholesale &amp; retail rates</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600">✓</span>
                <span>Cash on Delivery all over Pakistan</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600">✓</span>
                <span>Gentle Vitamin E skincare for the whole family</span>
              </li>
            </ul>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#products"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-0.5 text-sm"
              >
                Explore Products 🛍️
              </a>
              <a
                href="https://wa.me/923349556570?text=Hello%20Saudi%20Farah%20Factory,%20I%20want%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-5 py-3 rounded-xl border border-slate-300 shadow-xs transition text-sm"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* VVIP Banner Display - Perfectly Fit & Non-Scrolling */}
          <div className="relative group flex justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-white rounded-3xl p-2.5 shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden flex items-center justify-center">
              <img
                src="/beauty-banner.jpeg"
                alt="Saudi Farah Beauty Soap & Skincare Range"
                className="w-full h-[600px] object-cover rounded-2xl transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Official Packaging Banner Section */}
           {/* Official Packaging Banner Section */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { src: '/soap-box.jpeg', alt: 'Farah Soap Original Box Packaging' },
            { src: '/mid.jpeg', alt: '' },
            { src: '/midLL.jpeg', alt: '' },
             
          ].map((pic) => (
            <div
              key={pic.src}
              className="group aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={pic.src}
                alt={pic.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Added Feature: Factory Quality & Assurance Badges */}
      <section className="bg-slate-50 py-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-3xl">✨</span>
            <h4 className="font-bold text-slate-900 mt-2 text-sm">100% Halal</h4>
            <p className="text-xs text-slate-500 mt-1">Certified Pure Ingredients</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-3xl">🏭</span>
            <h4 className="font-bold text-slate-900 mt-2 text-sm">Direct Wholesale</h4>
            <p className="text-xs text-slate-500 mt-1">Lowest Factory Rates</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-3xl">🚚</span>
            <h4 className="font-bold text-slate-900 mt-2 text-sm">Nationwide COD</h4>
            <p className="text-xs text-slate-500 mt-1">Delivery All Over Pakistan</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-3xl">🌿</span>
            <h4 className="font-bold text-slate-900 mt-2 text-sm">Vitamin E Care</h4>
            <p className="text-xs text-slate-500 mt-1">Gentle & Soft Skincare</p>
          </div>
        </div>
      </section>

      {/* Dynamic Products Showcase Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">VVIP Factory Direct Products</h2>
            <p className="text-slate-600 mt-1 font-medium">Wholesale rates on detergent powders, hand washes, and luxury beauty soaps</p>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'surf', label: 'Surf' },
              { id: 'dishwash', label: 'Detergent' },
              { id: 'soap', label: 'Beauty Soaps' },
               { id: 'sanitizer', label: 'Sanitizer' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Picture: card ki poori chaudai aur lambai bhar degi */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                  {product.size}
                </span>
              </div>

              {/* Details: chhoti padding, button hamesha neeche barabar */}
              <div className="flex flex-col flex-1 gap-2 p-4">
                <div className="flex items-center space-x-1">
                  <span className="text-amber-500 text-xs">★★★★★</span>
                  <span className="text-xs font-bold text-slate-700 ml-1">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewsCount})</span>
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug">{product.name}</h3>

                <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 space-y-0.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    1 {product.packLabel} = {product.unitsPerPack} pcs
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-black text-emerald-700">Rs. {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs font-bold text-slate-400 line-through">Rs. {product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    About Rs. {Math.round(product.price / product.unitsPerPack)} per piece
                  </p>
                  
{(product.size || product.volume) && (
  <p className="text-xs font-bold text-emerald-800 mt-1">
    {product.size ? ` Size: ${product.size}` : ` size: ${product.volume}`}
  </p>
)}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow transition flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Order by {product.packLabel}</span>
                  <span>🛒</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-black text-amber-400 mb-2">Saudi Farah Factory</h3>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              Premium cleaning and skincare products made with the highest quality standards. Wholesale & retail direct from factory.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-3 text-base">Factory & Contact Info</h4>
            <p className="text-sm text-slate-200 mb-2 font-medium">WhatsApp / Sales: <strong>+92 340 6791749</strong></p>
            <p className="text-sm text-slate-200 font-medium">Address: <strong>Address: Farah Soap Pakki Gallee, Dhok chaudhrian, Chaklala Scheme 3 Rawalpindi, Pakistan</strong></p>
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-3 text-base">Certification & Quality</h4>
            <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-600 text-emerald-300 px-4 py-2 rounded-xl text-sm font-bold">
              <span>✓ 100% Halal Certified Manufacturing</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Saudi Farah Factory. All rights reserved.
        </div>
      </footer>

      {/* Floating Instant WhatsApp Order Button */}
      <a
        href="https://wa.me/923349556570?text=Hello%20Saudi%20Farah%20Factory,%20I%20want%20to%20inquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-transform hover:scale-110 focus:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 1.93.513 3.737 1.408 5.283L2 22l4.835-1.365a9.946 9.946 0 005.165 1.417c5.523 0 10-4.484 10-10.017S17.523 2 12 2zm0 18.034a8.032 8.032 0 01-4.088-1.12l-.293-.174-3.036.857.86-2.955-.191-.304A8.026 8.026 0 013.966 12c0-4.43 3.604-8.034 8.034-8.034S20.034 7.57 20.034 12c0 4.43-3.604 8.034-8.034 8.034zm4.453-6.024c-.244-.122-1.444-.713-1.668-.794-.224-.081-.387-.122-.55.122-.163.245-.632.794-.775.957-.143.163-.286.183-.53.061-.244-.122-1.03-.38-1.962-1.21-.726-.647-1.215-1.446-1.358-1.69-.143-.244-.015-.376.107-.498.11-.11.244-.286.367-.428.122-.143.163-.245.245-.408.081-.163.041-.306-.02-.428-.061-.122-.55-1.326-.754-1.816-.198-.479-.4-.413-.55-.42-.142-.007-.306-.007-.469-.007s-.428.061-.652.306c-.224.245-.857.836-.857 2.04 0 1.204.877 2.368 1 2.531.122.163 1.725 2.635 4.181 3.694.584.252 1.039.403 1.395.532.587.21 1.122.18 1.545.109.47-.079 1.444-.59 1.648-1.16.204-.57.204-1.059.143-1.16-.061-.102-.224-.163-.468-.285z" clipRule="evenodd" />
        </svg>
      </a>

      {/* Slide-over Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-amber-500">
                <h3 className="text-lg font-black flex items-center space-x-2">
                  <span>🛒 Your Order Cart</span>
                  <span className="bg-amber-500 text-slate-950 text-xs px-2.5 py-0.5 rounded-full font-black">
                    {totalItemsCount}
                  </span>
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center text-slate-400 p-6">
                  <div>
                    <p className="text-4xl mb-3">🛒</p>
                    <p className="font-bold">Your cart is currently empty.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWhatsAppCheckout} className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.map(item => {
                      const packWord = item.packLabel === 'Carton' && item.quantity > 1 ? 'Cartons' : item.packLabel;
                      return (
                        <div key={item.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                            <div className="min-w-0">
                              <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                              <span className="text-xs text-emerald-700 font-bold">
                                Rs. {item.price} per {item.packLabel} ({item.unitsPerPack} pcs)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-600 font-medium">
                              {item.quantity} {packWord} = <strong>{item.quantity * item.unitsPerPack} pcs</strong>
                              <div className="text-sm font-black text-slate-900">Rs. {item.price * item.quantity}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 flex items-center justify-center">-</button>
                              <span className="text-sm font-black w-6 text-center">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 flex items-center justify-center">+</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Customer details */}
                    <div className="pt-2 space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">Your Details (for delivery)</h4>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone / WhatsApp number"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                      />
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={customerCity}
                        onChange={e => setCustomerCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                      />
                      <textarea
                        required
                        rows={2}
                        placeholder="Full delivery address"
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between items-center text-lg font-black text-slate-900">
                      <span>Total Amount:</span>
                      <span className="text-emerald-700">Rs. {cartTotal}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Cash on Delivery. Our team will contact you on WhatsApp to confirm your order.
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-xl transition flex items-center justify-center space-x-2 text-base"
                    >
                      <span>💬 Send Order on WhatsApp (COD)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">⭐ Submit Customer Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Select Product</label>
                <select
                  value={newProduct}
                  onChange={e => setNewProduct(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white font-medium"
                >
                  {INITIAL_PRODUCTS.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={e => setNewRating(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white font-medium"
                >
                  <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your experience..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl transition shadow"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}