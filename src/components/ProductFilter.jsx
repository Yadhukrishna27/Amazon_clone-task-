import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setFilters, applyFilters, clearFilters } from '../redux/productSlice';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { filters, products } = useSelector((state) => state.products);

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleApplyFilters = () => {
    dispatch(applyFilters());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(applyFilters());
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="input-field"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating
        </label>
        <select
          value={filters.rating}
          onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
          className="input-field"
        >
          <option value={0}>Any Rating</option>
          <option value={1}>1+ Stars</option>
          <option value={2}>2+ Stars</option>
          <option value={3}>3+ Stars</option>
          <option value={4}>4+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="input-field"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleApplyFilters}
          className="w-full btn-primary"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="w-full btn-secondary"
        >
          Clear Filters
        </button>
      </div>
    </motion.div>
  );
};

export default ProductFilter;
