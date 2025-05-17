"use client";

import React, { useState, useEffect } from 'react';

export default function MaintenanceShopIssuePage() {
  const [pid, setPid] = useState('');
  const [partName, setPartName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('nos');
  const [rate, setRate] = useState(0);
  const [category, setCategory] = useState('R&M');
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');

  // Recalculate total whenever quantity or rate changes
  useEffect(() => {
    setTotal(quantity * rate);
  }, [quantity, rate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const issuedAt = new Date().toISOString();
    const payload = { pid, partName, quantity, unit, rate, category, total, issuedAt };

    try {
      const res = await fetch('/api/maintenance/shop-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setMessage('Issue logged successfully');
    } catch (err: any) {
      setMessage(err.message || 'Error logging issue');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-8">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-left">
        <h1 className="text-2xl font-semibold mb-6 text-[#1f295c]">
          Maintenance: Shop Issue
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* PID */}
          <div>
            <label htmlFor="pid" className="block mb-1 font-medium text-black">PID</label>
            <input
              id="pid"
              type="text"
              value={pid}
              onChange={e => setPid(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              required
            />
          </div>

          {/* Spare Part Name */}
          <div>
            <label htmlFor="partName" className="block mb-1 font-medium text-black">Spare Part Name</label>
            <input
              id="partName"
              type="text"
              value={partName}
              onChange={e => setPartName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              required
            />
          </div>

          {/* Quantity and Unit */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="quantity" className="block mb-1 font-medium text-black">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="unit" className="block mb-1 font-medium text-black">Unit</label>
              <select
                id="unit"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              >
                <option value="nos">nos</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          {/* Rate and Category */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="rate" className="block mb-1 font-medium text-black">Rate</label>
              <input
                id="rate"
                type="number"
                min="0"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="category" className="block mb-1 font-medium text-black">Category</label>
              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              >
                <option value="R&M">R&M</option>
                <option value="Consumable">Consumable</option>
              </select>
            </div>
          </div>

          {/* Total */}
          <div>
            <label className="block mb-1 font-medium text-black">Total</label>
            <div className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-100">
              {total.toFixed(2)}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#1f295c] text-white font-medium rounded hover:bg-opacity-90 transition"
          >
            Log Issue
          </button>
        </form>

        {/* Positioned below form */}
        {message && (
          <div
            style={{ background: 'rgba(212,237,218,0.3)' }}
            className="mt-4 px-6 py-3 rounded shadow-lg"
          >
            <p className="text-green-900 font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
