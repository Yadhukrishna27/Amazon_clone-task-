# Amazon Clone - React E-commerce Application

A full-featured e-commerce application built with React.js, Firebase, Redux Toolkit, and Tailwind CSS v4. This project mimics the core functionality of Amazon with a modern, responsive design.

## 🚀 Features

### 🔐 Authentication
- **Email & Password Signup/Login** - Complete user registration and authentication
- **Google OAuth Login** - One-click sign-in with Google
- **Firebase Authentication** - Secure user management
- **User Data Storage** - User profiles stored in Firestore

### 🛍️ Product Management
- **Product Catalog** - Browse products from DummyJSON API
- **Product Details** - Detailed product pages with images and descriptions
- **Product Filters** - Filter by category, price range, and rating
- **Product Search** - Search products by name or description
- **Product Reviews** - Users can add and view product reviews

### 🛒 Shopping Cart
- **Add/Remove Items** - Full cart management functionality
- **Quantity Control** - Increase/decrease item quantities
- **Cart Persistence** - Cart saved in localStorage
- **Real-time Updates** - Cart count updates dynamically

### 💳 Checkout & Orders
- **Checkout Process** - Complete order placement flow
- **Order Management** - View past orders and order status
- **Order Confirmation** - Order success page with next steps
- **Order History** - Complete order tracking in Firestore

## 🛠️ Tech Stack

- **Frontend**: React.js 18 with Vite
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **API**: DummyJSON API for product data
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amazon-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Get your Firebase configuration

4. **Environment Configuration**
   - Copy `env.example` to `.env`
   - Fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_DUMMYJSON_API_URL=https://dummyjson.com/products
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with cart and auth
│   ├── ProductCard.jsx # Product display card
│   ├── CartItem.jsx    # Individual cart item
│   ├── ProductFilter.jsx # Product filtering component
│   └── RatingStars.jsx # Star rating component
├── pages/              # Page components
│   ├── Home.jsx        # Home page with product grid
│   ├── ProductDetails.jsx # Product detail page
│   ├── Cart.jsx        # Shopping cart page
│   ├── Checkout.jsx    # Checkout process
│   ├── OrderConfirmation.jsx # Order success page
│   ├── Orders.jsx       # Order history
│   ├── Login.jsx       # Login page
│   └── Signup.jsx      # Registration page
├── redux/              # Redux store and slices
│   ├── store.js        # Redux store configuration
│   ├── authSlice.js    # Authentication state management
│   ├── cartSlice.js    # Cart state management
│   └── productSlice.js # Product state management
├── firebase/           # Firebase configuration
│   └── firebaseConfig.js # Firebase setup
├── utils/              # Utility components
│   └── PrivateRoute.jsx # Protected route component
├── App.jsx             # Main app component with routing
└── main.jsx           # App entry point
```

## 🔧 Firebase Setup

### Authentication Setup
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable **Email/Password** provider
3. Enable **Google** provider
4. Add your domain to authorized domains

### Firestore Setup
1. Go to Firebase Console → Firestore Database
2. Create database in **production mode**
3. Set up security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /orders/{orderId} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
       }
       match /reviews/{reviewId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

## 🎨 Customization

### Colors
The app uses Amazon-inspired colors defined in `tailwind.config.js`:
- **Amazon Orange**: `#FF9900`
- **Amazon Blue**: `#232F3E`
- **Amazon Dark**: `#131921`
- **Amazon Light**: `#F3F3F3`

### Components
All components are built with Tailwind CSS and can be easily customized by modifying the class names or extending the Tailwind configuration.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## 📱 Features Overview

### User Authentication
- Secure login/signup with Firebase
- Google OAuth integration
- Protected routes for authenticated users
- User profile management

### Product Management
- Real-time product data from DummyJSON API
- Advanced filtering and sorting
- Product search functionality
- Detailed product pages with reviews

### Shopping Experience
- Add to cart with quantity management
- Persistent cart across sessions
- Real-time cart updates
- Smooth checkout process

### Order Management
- Complete order placement
- Order history and tracking
- Order confirmation with next steps
- Order status management

## 🔒 Security Features

- Firebase Authentication for secure user management
- Firestore security rules for data protection
- Protected routes for authenticated content
- Input validation and error handling
- Secure API calls with proper error handling

## 🎯 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time notifications
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Advanced search filters
- [ ] Mobile app with React Native
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Shipping integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing product data
- [Firebase](https://firebase.google.com/) for authentication and database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

---

**Note**: This is a demo application for educational purposes. No actual payments are processed, and no real products are shipped.