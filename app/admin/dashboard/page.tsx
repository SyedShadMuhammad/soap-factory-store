'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'customers'>('orders');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-600 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-bold tracking-wide shadow-inner">
        ✨ Saudi Farah Factory - Admin Control Panel & Order Management ✨
      </div>

      {/* Navigation Header (Same as Landing Page) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-md border-2 border-amber-400">
              F
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block">Saudi Farah Factory</span>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">سعودیہ فرح فیکٹری - Admin</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 border border-slate-300 text-sm shadow-sm"
            >
              <span>🏠 View Store</span>
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center space-x-2 shadow-lg shadow-emerald-600/25 text-sm"
            >
              <span>Logout 🚪</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</div>
            <div className="text-3xl font-black text-slate-900">24</div>
            <div className="text-xs text-emerald-600 font-bold">↑ 12% from last week</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Factory Products</div>
            <div className="text-3xl font-black text-slate-900">6 Active</div>
            <div className="text-xs text-emerald-600 font-bold">Surf, Soaps & Hand Wash</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">System Status</div>
            <div className="text-3xl font-black text-emerald-600">Online</div>
            <div className="text-xs text-slate-500 font-bold">Selvia Town Factory Hub</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition ${
              activeTab === 'orders' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📦 Customer Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition ${
              activeTab === 'products' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🧴 Manage Products
          </button>
        </div>

        {/* Tab Content Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">Recent WhatsApp / COD Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="py-4 px-4 font-bold text-slate-900">#SF-1001</td>
                      <td className="py-4 px-4">Muhammad Tariq</td>
                      <td className="py-4 px-4">Farah Surf (3 kg) x 2</td>
                      <td className="py-4 px-4 text-emerald-700 font-bold">Rs. 2500</td>
                      <td className="py-4 px-4"><span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold">Pending COD</span></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-bold text-slate-900">#SF-1002</td>
                      <td className="py-4 px-4">Sadaf Kanwal</td>
                      <td className="py-4 px-4">Hand Wash Apple x 1</td>
                      <td className="py-4 px-4 text-emerald-700 font-bold">Rs. 350</td>
                      <td className="py-4 px-4"><span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">Factory Inventory Items</h3>
              <p className="text-sm text-slate-500">Inventory list loaded from Saudi Farah Factory product database.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900">Farah Detergent Powder (Surf)</h4>
                  <p className="text-xs text-emerald-700 font-bold mt-1">Rs. 1250 (3 kg Pack)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900">Farah Hand Wash - Apple Bunch</h4>
                  <p className="text-xs text-emerald-700 font-bold mt-1">Rs. 350 (1 Litre)</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900">Farah Bathing Soap Family Pack</h4>
                  <p className="text-xs text-emerald-700 font-bold mt-1">Rs. 400 (4 Bars)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}