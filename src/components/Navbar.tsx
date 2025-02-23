import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { state } = useCart();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">RecipeSearch</span>
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {state.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {state.items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;