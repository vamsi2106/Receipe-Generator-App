import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {state.items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            {state.items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div>
                  <p className="text-gray-900 font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">From: {item.recipeName}</p>
                  <p className="text-sm text-gray-500">{item.quantity}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-emerald-600 font-medium">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-emerald-600">
                ${state.total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;