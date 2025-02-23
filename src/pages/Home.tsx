import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types';
import { searchRecipes } from '../services/gemini';
import { motion } from 'framer-motion';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await searchRecipes(query);
      setRecipes([{ ...result, id: Date.now().toString() }]);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Find Your Perfect Recipe With Ai</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search for any recipe  and get a detailed list of ingredients. Add them to your cart and start cooking!
        </p>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;