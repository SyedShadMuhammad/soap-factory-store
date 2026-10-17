'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface Product {
  id: string;
  name: string;
  category: 'surf' | 'dishwash' | 'soap';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  size: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Farah Detergent Powder (Surf)',
    category: 'surf',
    price: 1250,
    originalPrice: 1450,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80',
    size: '3 kg Pack',
  },
  {
    id: '2',
    name: 'Farah Hand Wash - Apple Bunch',
    category: 'dishwash',
    price: 350,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    size: '1 Litre Bottle',
  },
  {
    id: '3',
    name: 'Farah Bathing Soap - Family Pack',
    category: 'soap',
    price: 400,
    originalPrice: 480,
    rating: 4.7,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80',
    size: 'Pack of 4 Bars',
  },
];

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

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

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    let message = `*Saudi Farah Factory - Customer Order*%0A%0A`;
    cart.forEach(item => {
      message += `- ${item.name} (${item.size}) x ${item.quantity} = Rs. ${item.price * item.quantity}%0A`;
    });
    message += `%0A*Total Amount: Rs. ${cartTotal}*`;
    const whatsappUrl = `https://wa.me/923349556570?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-600 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-bold tracking-wide shadow-inner">
        ✨ Welcome to Your Customer Dashboard | Saudi Farah Factory ✨
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-md border-2 border-amber-400">
              F
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block">Customer Portal</span>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Saudi Farah Factory</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 border border-slate-300 text-sm shadow-sm"
            >
              <span>🏠 Home Store</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 shadow-lg shadow-emerald-600/25 text-sm"
            >
              <span>🛒 Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-amber-400 text-slate-900 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold transition text-sm shadow"
            >
              Logout 🚪
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Hello, Valued Customer! 👋</h1>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Aap apne orders track kar sakte hain aur factory wholesale rates par direct shopping kar sakte hain.
            </p>
          </div>
          <button
            onClick={() => router.push('/#products')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow transition"
          >
            Browse All Products 🛍️
          </button>
        </div>

        {/* Quick Products Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-slate-900">Featured Factory Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {INITIAL_PRODUCTS.map(product => (
              <div key={product.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-5 space-y-2">
                    <h3 className="font-black text-slate-900">{product.name}</h3>
                    <p className="text-emerald-700 font-bold">Rs. {product.price} ({product.size})</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl transition text-sm"
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-amber-500">
                <h3 className="text-lg font-black">🛒 Shopping Cart ({totalItemsCount})</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-slate-400 py-12 font-medium">Your cart is empty.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <span className="text-xs text-emerald-700 font-bold">Rs. {item.price} x {item.quantity}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                  <div className="flex justify-between font-black text-lg">
                    <span>Total:</span>
                    <span className="text-emerald-700">Rs. {cartTotal}</span>
                  </div>
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl shadow transition"
                  >
                    💬 Order via WhatsApp (COD)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}