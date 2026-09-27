import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Coffee, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';
import { getFnbMenu } from '../services/api';

export default function FnbSelectorModal({
  bookingSession,
  onClose,
  onProceedToPayment
}) {
  const [fnbList, setFnbList] = useState([]);
  const [cart, setCart] = useState({}); // { id: qty }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getFnbMenu()
      .then(items => {
        if (isMounted) {
          setFnbList(items);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const updateQty = (item, delta) => {
    setCart(prev => {
      const current = prev[item.id]?.qty || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return {
        ...prev,
        [item.id]: {
          item: item.name,
          qty: next,
          price: item.price
        }
      };
    });
  };

  const totalFnbPrice = Object.values(cart).reduce((sum, i) => sum + (i.price * i.qty), 0);
  const cartItemCount = Object.values(cart).reduce((sum, i) => sum + i.qty, 0);

  const handleProceed = () => {
    const fnbItems = Object.entries(cart).map(([id, info]) => ({
      id,
      name: info.item,
      qty: info.qty,
      price: info.price
    }));

    onProceedToPayment({
      ...bookingSession,
      fnb: fnbItems,
      totalFnbPrice
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2b2b2b] rounded-xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#181818] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 bg-[#E50914]/20 text-[#E50914] rounded-lg border border-[#E50914]/30">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Hyderabad Cinema Concessions
                <span className="text-xs bg-[#252525] text-amber-400 px-2 py-0.5 rounded font-mono">Special Combos</span>
              </h2>
              <p className="text-xs text-gray-400">
                Fresh gourmet cinema snacks delivered directly to your theater seat
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#242424] hover:bg-[#333] text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snack List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {loading ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              Loading Hyderabad cinema specials...
            </div>
          ) : (
            fnbList.map((item) => {
              const count = cart[item.id]?.qty || 0;
              return (
                <div
                  key={item.id}
                  className="bg-[#1c1c1c] hover:bg-[#202020] border border-[#2c2c2c] rounded-xl p-3.5 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-3xl sm:text-4xl filter drop-shadow">
                      {item.image}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{item.desc}</p>
                      <div className="text-sm font-black text-amber-400 mt-1">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center space-x-2 bg-[#141414] border border-[#333] rounded-lg p-1">
                    <button
                      onClick={() => updateQty(item, -1)}
                      disabled={count === 0}
                      className={`p-1 rounded ${
                        count === 0
                          ? 'text-gray-600 cursor-not-allowed'
                          : 'text-gray-300 hover:text-white hover:bg-[#282828]'
                      }`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center font-bold text-xs text-white">
                      {count}
                    </span>
                    <button
                      onClick={() => updateQty(item, 1)}
                      className="p-1 rounded text-gray-300 hover:text-white hover:bg-[#282828]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#181818] border-t border-[#282828] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              // Proceed without F&B
              onProceedToPayment({
                ...bookingSession,
                fnb: [],
                totalFnbPrice: 0
              });
            }}
            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors underline"
          >
            Skip Concessions
          </button>

          <div className="flex items-center space-x-4">
            {cartItemCount > 0 && (
              <div className="text-right">
                <div className="text-[11px] text-gray-400">Snacks Total</div>
                <div className="text-sm font-bold text-amber-400">₹{totalFnbPrice}</div>
              </div>
            )}

            <button
              onClick={handleProceed}
              className="flex items-center space-x-2 bg-[#E50914] hover:bg-[#b81d24] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_4px_15px_rgba(229,9,20,0.4)] active:scale-95"
            >
              <span>{cartItemCount > 0 ? `Continue (₹${bookingSession.totalTicketPrice + totalFnbPrice})` : 'Proceed to Checkout'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
