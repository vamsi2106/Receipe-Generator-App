import React from 'react';
import { Plus } from 'lucide-react';
import { Recipe, Ingredient } from '../types';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (ingredient: Ingredient) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...ingredient,
        recipeId: recipe.id,
        recipeName: recipe.name
      }
    });

    // Play a notification sound
    const audio = new Audio('/sounds/add-to-cart.mp3'); // Place sound file in /public/sounds
    audio.play();

    // Show a toast notification
    toast.success(`${ingredient.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '8px',
        background: '#4CAF50',
        color: '#fff',
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{recipe.name}</h3>
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">Ingredients:</h4>
          <ul className="space-y-3">
            {recipe?.ingredients?.map((ingredient) => (
              <li key={ingredient.id} className="flex items-center justify-between">
                <div>
                  <span className="text-gray-800">{ingredient.name}</span>
                  <span className="text-gray-500 text-sm ml-2">({ingredient.quantity})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-600 font-medium">
                    ₹{ingredient.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(ingredient)}
                    className="p-1 rounded-full hover:bg-emerald-100 text-emerald-600"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
