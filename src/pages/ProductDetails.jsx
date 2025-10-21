import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProductById, clearCurrentProduct } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import RatingStars from '../components/RatingStars';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { currentProduct, loading, error } = useSelector((state) => state.products);
  
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
    
    // Load reviews
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productReviews = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(review => review.productId === parseInt(id));
      setReviews(productReviews);
    });

    return () => {
      unsubscribe();
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart(currentProduct));
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        productId: parseInt(id),
        userId: user.uid,
        userName: user.displayName || user.email,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString(),
      });
      
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amazon-orange"></div>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={currentProduct.thumbnail}
                alt={currentProduct.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-4 gap-2">
                {currentProduct.images?.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${currentProduct.title} ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity duration-200"
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentProduct.title}
                </h1>
                <div className="flex items-center mb-4">
                  <RatingStars rating={currentProduct.rating} size="md" />
                  <span className="ml-2 text-sm text-gray-600">
                    ({currentProduct.rating} out of 5 stars)
                  </span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentProduct.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-amazon-blue">
                      ${currentProduct.price}
                    </span>
                    {currentProduct.discountPercentage > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {currentProduct.discountPercentage}% (${(currentProduct.price * currentProduct.discountPercentage / 100).toFixed(2)})
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Brand: {currentProduct.brand}</div>
                    <div>Category: {currentProduct.category}</div>
                    <div className={currentProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {currentProduct.stock > 0 ? `In Stock (${currentProduct.stock} left)` : 'Out of Stock'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={currentProduct.stock === 0}
                  className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
                >
                  {currentProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <div className="text-sm text-gray-600">
                  <p>• Free shipping on orders over $25</p>
                  <p>• 30-day return policy</p>
                  <p>• Secure payment processing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews ({reviews.length})
              </h2>
              {isAuthenticated && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="btn-secondary"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handleSubmitReview}
                className="bg-gray-50 p-6 rounded-lg mb-6"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="input-field"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="input-field"
                    placeholder="Share your thoughts about this product..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
              </motion.form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {review.userName}
                        </span>
                        <RatingStars rating={review.rating} size="sm" />
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
