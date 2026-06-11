import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaSearch, 
  FaArrowRight, 
  FaStar, 
  FaHeart,
  FaUser,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
  FaMobileAlt,
  FaLaptop,
  FaTshirt,
  FaShoePrints,
  FaGem,
  FaClock,
  FaPercent,
  FaFire,
  FaEye,
  FaTimes,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaApple,
  FaAndroid,
  FaWindows,
  FaCreditCard,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGift,
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaEyeSlash,
  FaPhone,
  FaUserPlus,
  FaSignInAlt,
  FaGamepad,
  FaBabyCarriage,
  FaHome as FaHomeIcon,
  FaArrowLeft
} from 'react-icons/fa';

const Home = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showAuthSidebar, setShowAuthSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState('login');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('ecommerceUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const slideInterval = useRef(null);

  // Hero Slides Data - ALL with images (no videos for consistency)
  const heroSlides = [
    {
      id: 1,
      title: "Summer Sale Extravaganza",
      subtitle: "Up to 70% Off on Fashion & Electronics",
      button: "Shop Now",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color: "#8B5CF6"
    },
    {
      id: 2,
      title: "Premium Electronics",
      subtitle: "Latest Gadgets at Best Prices",
      button: "Explore Deals",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color: "#06B6D4"
    },
    {
      id: 3,
      title: "Exclusive Collections",
      subtitle: "Limited Edition Products Just For You",
      button: "Shop Collection",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      color: "#F59E0B"
    },
    {
      id: 4,
      title: "Smart Tech Revolution",
      subtitle: "Experience the Future Today",
      button: "Discover More",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color: "#EC4899"
    }
  ];

  // Categories Data
  const categories = [
    { id: 1, name: "Electronics", icon: <FaLaptop />, color: "#8B5CF6", items: 345, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Fashion", icon: <FaTshirt />, color: "#EC4899", items: 289, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 3, name: "Footwear", icon: <FaShoePrints />, color: "#06B6D4", items: 234, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 4, name: "Jewelry", icon: <FaGem />, color: "#F59E0B", items: 178, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 5, name: "Gaming", icon: <FaGamepad />, color: "#8B5CF6", items: 156, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 6, name: "Baby & Kids", icon: <FaBabyCarriage />, color: "#EC4899", items: 198, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 7, name: "Home & Living", icon: <FaHomeIcon />, color: "#06B6D4", items: 267, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { id: 8, name: "Sports", icon: <FaFire />, color: "#F59E0B", items: 189, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
  ];

  // Complete Products Data
  const allProducts = [
    { id: 1, name: "Wireless Headphones Pro", price: 199.99, originalPrice: 299.99, rating: 4.8, reviews: 234, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Sale", discount: 33, category: "electronics", brand: "Sony", stock: 45 },
    { id: 2, name: "Smart Watch Ultra", price: 299.99, originalPrice: 399.99, rating: 4.9, reviews: 567, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Bestseller", discount: 25, category: "electronics", brand: "Apple", stock: 32 },
    { id: 3, name: "Gaming Laptop", price: 1299.99, originalPrice: 1699.99, rating: 4.9, reviews: 678, image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Premium", discount: 23, category: "electronics", brand: "ASUS", stock: 15 },
    { id: 4, name: "Wireless Earbuds", price: 79.99, originalPrice: 129.99, rating: 4.7, reviews: 345, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "New", discount: 38, category: "electronics", brand: "Samsung", stock: 89 },
    { id: 5, name: "Premium Leather Jacket", price: 159.99, originalPrice: 249.99, rating: 4.7, reviews: 189, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Trending", discount: 36, category: "fashion", brand: "Zara", stock: 34 },
    { id: 6, name: "Designer Handbag", price: 199.99, originalPrice: 349.99, rating: 4.8, reviews: 234, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Luxury", discount: 43, category: "fashion", brand: "Gucci", stock: 12 },
    { id: 7, name: "Running Shoes", price: 89.99, originalPrice: 129.99, rating: 4.8, reviews: 432, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Bestseller", discount: 30, category: "footwear", brand: "Nike", stock: 67 },
    { id: 8, name: "Diamond Necklace", price: 499.99, originalPrice: 799.99, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Luxury", discount: 37, category: "jewelry", brand: "Tiffany", stock: 8 },
    { id: 9, name: "Gaming Mouse", price: 49.99, originalPrice: 89.99, rating: 4.8, reviews: 567, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Popular", discount: 44, category: "gaming", brand: "Razer", stock: 89 },
    { id: 10, name: "Mechanical Keyboard", price: 89.99, originalPrice: 149.99, rating: 4.9, reviews: 432, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", badge: "Bestseller", discount: 40, category: "gaming", brand: "Corsair", stock: 45 }
  ];

  const getFilteredProducts = () => {
    let filtered = allProducts;
    if (selectedCategory !== 'all') {
      filtered = allProducts.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const featuredProducts = getFilteredProducts().slice(0, 8);
  const newArrivals = allProducts.filter(p => p.badge === 'New').slice(0, 4);
  const flashSaleItems = allProducts.filter(p => p.discount >= 40).slice(0, 4);

  const benefits = [
    { icon: <FaTruck />, title: "Free Shipping", desc: "On orders over $50" },
    { icon: <FaUndo />, title: "30 Days Return", desc: "Money back guarantee" },
    { icon: <FaShieldAlt />, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: <FaHeadset />, title: "24/7 Support", desc: "Dedicated help center" }
  ];

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setCartCount(cartCount + 1);
    showToastMessage(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    setCartItems(cartItems.filter(item => item.id !== productId));
    setCartCount(cartCount - item.quantity);
    showToastMessage('Item removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    const item = cartItems.find(item => item.id === productId);
    const quantityDiff = newQuantity - item.quantity;
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
    setCartCount(cartCount + quantityDiff);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToastMessage('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToastMessage('Added to wishlist');
    }
  };

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval.current);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('ecommerceCurrentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ecommerceUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    resetInterval();
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    const user = registeredUsers.find(
      u => (u.email === loginForm.email || u.phone === loginForm.email) && u.password === loginForm.password
    );
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('ecommerceCurrentUser', JSON.stringify(user));
      setShowAuthSidebar(false);
      setLoginForm({ email: '', password: '' });
      showToastMessage(`Welcome back, ${user.fullName}!`);
    } else {
      setLoginError('Invalid email/phone or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    if (!signupForm.fullName.trim()) {
      setSignupError('Please enter your full name');
      return;
    }

    if (!signupForm.email && !signupForm.phone) {
      setSignupError('Please enter either email or phone number');
      return;
    }

    if (signupForm.email && !signupForm.email.includes('@')) {
      setSignupError('Please enter a valid email address');
      return;
    }

    if (signupForm.password.length < 6) {
      setSignupError('Password must be at least 6 characters long');
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }

    const userExists = registeredUsers.some(
      u => (u.email && u.email === signupForm.email) || (u.phone && u.phone === signupForm.phone)
    );

    if (userExists) {
      setSignupError('User already exists. Please login.');
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: signupForm.fullName,
      email: signupForm.email || null,
      phone: signupForm.phone || null,
      password: signupForm.password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(signupForm.fullName)}&background=8B5CF6&color=fff`,
      role: "Member",
      joined: new Date().toLocaleDateString()
    };

    setRegisteredUsers([...registeredUsers, newUser]);
    setSignupSuccess('Account created successfully! Please login.');
    
    setSignupForm({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    
    setTimeout(() => {
      setActiveAuthTab('login');
      setSignupSuccess('');
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('ecommerceCurrentUser');
    showToastMessage('Logged out successfully');
  };

  return (
    <div style={styles.container}>
      {showToast && (
        <div style={styles.toast}>
          <FaCheckCircle style={{ color: '#10b981', marginRight: '10px' }} />
          {toastMessage}
        </div>
      )}

      <nav style={{...styles.navbar, ...(isScrolled ? styles.navbarScrolled : {})}}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon}>🛍️</div>
            <span style={styles.logoText}>Shop<span style={styles.logoHighlight}>Hub</span></span>
          </Link>

          <div style={styles.searchBar}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.navIcons}>
            <button style={styles.iconBtn}>
              <FaHeart />
              {wishlist.length > 0 && <span style={styles.badge}>{wishlist.length}</span>}
            </button>
            <button style={styles.iconBtn} onClick={() => setShowCart(true)}>
              <FaShoppingCart />
              {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </button>
            {isLoggedIn ? (
              <div style={styles.userMenu}>
                <img src={currentUser?.avatar} alt="Profile" style={styles.userAvatar} />
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </div>
            ) : (
              <button style={styles.iconBtn} onClick={() => setShowAuthSidebar(true)}>
                <FaUser />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Carousel - All slides now show images */}
      <div style={styles.heroSection}>
        <div style={styles.heroContainer}>
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                ...styles.heroSlide,
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%), url(${slide.image})`,
                transform: `translateX(-${activeSlide * 100}%)`,
                opacity: activeSlide === index ? 1 : 0,
                visibility: activeSlide === index ? 'visible' : 'hidden'
              }}
            >
              <div style={styles.heroContent}>
                <div style={{...styles.heroBadge, background: slide.color}}>Limited Time Offer</div>
                <h1 style={styles.heroTitle}>{slide.title}</h1>
                <p style={styles.heroSubtitle}>{slide.subtitle}</p>
                <button style={styles.heroBtn}>
                  {slide.button} <FaArrowRight style={{ marginLeft: '10px' }} />
                </button>
              </div>
            </div>
          ))}
          
          <button onClick={prevSlide} style={{...styles.carouselBtn, left: '20px' }}>
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide} style={{...styles.carouselBtn, right: '20px' }}>
            <FaChevronRight />
          </button>
          
          <div style={styles.carouselDots}>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.carouselDot,
                  backgroundColor: activeSlide === index ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  width: activeSlide === index ? '30px' : '8px'
                }}
                onClick={() => {
                  setActiveSlide(index);
                  resetInterval();
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={styles.benefitsBar}>
        <div style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <div key={index} style={styles.benefitItem}>
              <div style={styles.benefitIcon}>{benefit.icon}</div>
              <div>
                <div style={styles.benefitTitle}>{benefit.title}</div>
                <div style={styles.benefitDesc}>{benefit.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Shop by <span style={styles.gradientText}>Category</span></h2>
          <p style={styles.sectionSubtitle}>Explore our wide range of products</p>
        </div>
        <div style={styles.categoriesGrid}>
          {categories.map((category) => (
            <div 
              key={category.id} 
              style={styles.categoryCard}
              onClick={() => setSelectedCategory(category.name.toLowerCase())}
            >
              <div style={{...styles.categoryImage, backgroundImage: `url(${category.image})`}}>
                <div style={{...styles.categoryOverlay, background: `${category.color}cc`}}>
                  <div style={styles.categoryIcon}>{category.icon}</div>
                  <h3 style={styles.categoryName}>{category.name}</h3>
                  <p style={styles.categoryItems}>{category.items} items</p>
                  <button style={styles.categoryBtn}>Shop Now →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{...styles.section, background: 'linear-gradient(135deg, #8B5CF620, #06B6D410)', borderRadius: '30px', padding: '40px' }}>
        <div style={styles.sectionHeader}>
          <div style={styles.flashSaleHeader}>
            <FaFire style={{ color: '#F59E0B', fontSize: '32px' }} />
            <h2 style={styles.sectionTitle}>Flash <span style={{ color: '#F59E0B' }}>Sale</span></h2>
          </div>
          <div style={styles.timer}>
            <FaClock /> Ends in: <span style={styles.timerValue}>02:15:30</span>
          </div>
        </div>
        <div style={styles.productsGrid}>
          {flashSaleItems.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.productImageWrapper}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
                <div style={styles.discountBadge}>-{product.discount}%</div>
                <button style={styles.wishlistBtn} onClick={() => toggleWishlist(product.id)}>
                  <FaHeart color={wishlist.includes(product.id) ? '#EC4899' : '#fff'} />
                </button>
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productBrand}>{product.brand}</div>
                <div style={styles.priceContainer}>
                  <span style={styles.currentPrice}>${product.price}</span>
                  <span style={styles.originalPrice}>${product.originalPrice}</span>
                </div>
                <button style={styles.addToCartBtn} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.filterTabs}>
        <button style={{...styles.filterTab, ...(selectedCategory === 'all' ? styles.filterTabActive : {})}} onClick={() => setSelectedCategory('all')}>All Products</button>
        <button style={{...styles.filterTab, ...(selectedCategory === 'electronics' ? styles.filterTabActive : {})}} onClick={() => setSelectedCategory('electronics')}>Electronics</button>
        <button style={{...styles.filterTab, ...(selectedCategory === 'fashion' ? styles.filterTabActive : {})}} onClick={() => setSelectedCategory('fashion')}>Fashion</button>
        <button style={{...styles.filterTab, ...(selectedCategory === 'footwear' ? styles.filterTabActive : {})}} onClick={() => setSelectedCategory('footwear')}>Footwear</button>
        <button style={{...styles.filterTab, ...(selectedCategory === 'jewelry' ? styles.filterTabActive : {})}} onClick={() => setSelectedCategory('jewelry')}>Jewelry</button>
        <button style={{...styles.filterTab, ...(selectedCategory === 'gaming' ? styles.filterTabActive : {})}} onClick={() => setSelectedCategory('gaming')}>Gaming</button>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Featured <span style={styles.gradientText}>Products</span></h2>
          <p style={styles.sectionSubtitle}>Hand-picked just for you</p>
        </div>
        <div style={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.productImageWrapper}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
                {product.badge && <div style={{...styles.productBadge, background: product.badge === 'Sale' ? '#F59E0B' : '#8B5CF6'}}>{product.badge}</div>}
                <div style={styles.discountBadge}>-{product.discount}%</div>
                <button style={styles.wishlistBtn} onClick={() => toggleWishlist(product.id)}>
                  <FaHeart color={wishlist.includes(product.id) ? '#EC4899' : '#fff'} />
                </button>
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productBrand}>{product.brand}</div>
                <div style={styles.rating}>
                  <FaStar style={styles.starIcon} />
                  <span>{product.rating}</span>
                  <span style={styles.reviewCount}>({product.reviews})</span>
                </div>
                <div style={styles.priceContainer}>
                  <span style={styles.currentPrice}>${product.price}</span>
                  <span style={styles.originalPrice}>${product.originalPrice}</span>
                </div>
                <button style={styles.addToCartBtn} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>New <span style={styles.gradientText}>Arrivals</span></h2>
          <p style={styles.sectionSubtitle}>Check out our latest collection</p>
        </div>
        <div style={styles.productsGrid}>
          {newArrivals.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.productImageWrapper}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
                <div style={styles.newBadge}>New</div>
                <button style={styles.wishlistBtn} onClick={() => toggleWishlist(product.id)}>
                  <FaHeart color={wishlist.includes(product.id) ? '#EC4899' : '#fff'} />
                </button>
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productBrand}>{product.brand}</div>
                <div style={styles.rating}>
                  <FaStar style={styles.starIcon} />
                  <span>{product.rating}</span>
                  <span style={styles.reviewCount}>({product.reviews})</span>
                </div>
                <div style={styles.priceContainer}>
                  <span style={styles.currentPrice}>${product.price}</span>
                  <span style={styles.originalPrice}>${product.originalPrice}</span>
                </div>
                <button style={styles.addToCartBtn} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.bannerSection}>
        <div style={styles.bannerContent}>
          <div style={styles.bannerText}>
            <FaGift style={styles.bannerIcon} />
            <h2>Get 20% Off Your First Order</h2>
            <p>Subscribe to our newsletter and get exclusive deals</p>
            <div style={styles.newsletter}>
              <input type="email" placeholder="Enter your email" style={styles.newsletterInput} />
              <button style={styles.newsletterBtn}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {showCart && (
        <div style={styles.cartOverlay} onClick={() => setShowCart(false)}>
          <div style={styles.cartSidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.cartHeader}>
              <h3>Shopping Cart ({cartCount})</h3>
              <button style={styles.closeCart} onClick={() => setShowCart(false)}><FaTimes /></button>
            </div>
            <div style={styles.cartItems}>
              {cartItems.length === 0 ? (
                <div style={styles.emptyCart}>
                  <FaShoppingCart style={styles.emptyCartIcon} />
                  <p>Your cart is empty</p>
                  <button style={styles.continueShopping} onClick={() => setShowCart(false)}>Continue Shopping</button>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <img src={item.image} alt={item.name} style={styles.cartItemImage} />
                      <div style={styles.cartItemDetails}>
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
                        <div style={styles.cartItemQuantity}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button style={styles.removeItem} onClick={() => removeFromCart(item.id)}><FaTimes /></button>
                    </div>
                  ))}
                  <div style={styles.cartFooter}>
                    <div style={styles.cartTotal}><span>Subtotal:</span><span>${getCartTotal()}</span></div>
                    <button style={styles.checkoutBtn}>Proceed to Checkout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showAuthSidebar && (
        <div style={styles.authOverlay} onClick={() => setShowAuthSidebar(false)}>
          <div style={styles.authSidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.authHeader}>
              <button style={styles.backBtn} onClick={() => setShowAuthSidebar(false)}>
                <FaArrowLeft />
              </button>
              <h3>Account</h3>
              <button style={styles.closeAuthBtn} onClick={() => setShowAuthSidebar(false)}>
                <FaTimes />
              </button>
            </div>

            <div style={styles.tabContainer}>
              <button style={{...styles.tab, ...(activeAuthTab === 'login' ? styles.activeTab : {})}} onClick={() => setActiveAuthTab('login')}>
                <FaSignInAlt /> Login
              </button>
              <button style={{...styles.tab, ...(activeAuthTab === 'signup' ? styles.activeTab : {})}} onClick={() => setActiveAuthTab('signup')}>
                <FaUserPlus /> Sign Up
              </button>
            </div>

            <div style={styles.authBody}>
              {activeAuthTab === 'login' && (
                <div>
                  <div style={styles.loginIcon}>
                    <FaLock />
                  </div>
                  <h2 style={styles.loginTitle}>Welcome Back</h2>
                  <p style={styles.loginSubtitle}>Sign in to your account</p>
                  
                  <form onSubmit={handleLogin} style={styles.loginForm}>
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Email or Phone Number</label>
                      <div style={styles.inputWrapper}>
                        <FaEnvelope style={styles.inputIcon} />
                        <input type="text" name="email" value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} placeholder="Enter your email or phone number" style={styles.loginInput} required />
                      </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Password</label>
                      <div style={styles.inputWrapper}>
                        <FaLock style={styles.inputIcon} />
                        <input type={showPassword ? "text" : "password"} name="password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} placeholder="Enter your password" style={styles.loginInput} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    
                    {loginError && <div style={styles.errorMessage}>{loginError}</div>}
                    
                    <button type="submit" style={styles.loginSubmitBtn}>
                      Sign In <FaArrowRight />
                    </button>
                    
                    <div style={styles.dividerLine}><span>OR</span></div>
                    
                    <div style={styles.demoCredentials}>
                      <p>Demo Account:</p>
                      <code>demo@JKcart.com / demo123</code>
                    </div>
                  </form>
                </div>
              )}

              {activeAuthTab === 'signup' && (
                <div>
                  <div style={styles.loginIcon}>
                    <FaUserPlus />
                  </div>
                  <h2 style={styles.loginTitle}>Create Account</h2>
                  <p style={styles.loginSubtitle}>Join JKcart today</p>
                  
                  <form onSubmit={handleSignup} style={styles.loginForm}>
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Full Name *</label>
                      <div style={styles.inputWrapper}>
                        <FaUser style={styles.inputIcon} />
                        <input type="text" name="fullName" value={signupForm.fullName} onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})} placeholder="Enter your full name" style={styles.loginInput} required />
                      </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Email Address</label>
                      <div style={styles.inputWrapper}>
                        <FaEnvelope style={styles.inputIcon} />
                        <input type="email" name="email" value={signupForm.email} onChange={(e) => setSignupForm({...signupForm, email: e.target.value})} placeholder="Enter your email" style={styles.loginInput} />
                      </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Phone Number</label>
                      <div style={styles.inputWrapper}>
                        <FaPhone style={styles.inputIcon} />
                        <input type="tel" name="phone" value={signupForm.phone} onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})} placeholder="Enter your phone number" style={styles.loginInput} />
                      </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Password *</label>
                      <div style={styles.inputWrapper}>
                        <FaLock style={styles.inputIcon} />
                        <input type={showPassword ? "text" : "password"} name="password" value={signupForm.password} onChange={(e) => setSignupForm({...signupForm, password: e.target.value})} placeholder="Create a password (min. 6 characters)" style={styles.loginInput} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Confirm Password *</label>
                      <div style={styles.inputWrapper}>
                        <FaLock style={styles.inputIcon} />
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})} placeholder="Confirm your password" style={styles.loginInput} required />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.passwordToggle}>
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    
                    {signupError && <div style={styles.errorMessage}>{signupError}</div>}
                    {signupSuccess && <div style={styles.successMessage}>{signupSuccess}</div>}
                    
                    <button type="submit" style={styles.loginSubmitBtn}>
                      Create Account <FaUserPlus />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerLogo}>JKcart</h3>
            <p style={styles.footerDesc}>Your one-stop destination for all your shopping needs.</p>
            <div style={styles.paymentMethods}>
              <FaCreditCard style={styles.paymentIcon} />
              <FaApple style={styles.paymentIcon} />
              <FaAndroid style={styles.paymentIcon} />
              <FaWindows style={styles.paymentIcon} />
            </div>
          </div>
          <div style={styles.footerSection}>
            <h4>Quick Links</h4>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
            <a href="#">Shipping Info</a>
          </div>
          <div style={styles.footerSection}>
            <h4>Customer Service</h4>
            <a href="#">Returns Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Track Order</a>
          </div>
          <div style={styles.footerSection}>
            <h4>Follow Us</h4>
            <div style={styles.socialLinks}>
              <FaFacebookF style={styles.socialIcon} />
              <FaTwitter style={styles.socialIcon} />
              <FaInstagram style={styles.socialIcon} />
              <FaYoutube style={styles.socialIcon} />
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}><p>&copy; 2026 . All rights reserved.</p></div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f0ff 0%, #e8f0fe 100%)',
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
  },
  toast: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    background: '#1e1b4b',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '12px',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #8B5CF6',
    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.2)',
    animation: 'slideIn 0.3s ease'
  },
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
    transition: 'all 0.3s ease'
  },
  navbarScrolled: {
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.1)'
  },
  navContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  logoIcon: { fontSize: '28px' },
  logoText: { color: '#1e1b4b' },
  logoHighlight: { color: '#8B5CF6' },
  searchBar: { flex: 1, maxWidth: '500px', position: 'relative' },
  searchIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#8B5CF6' },
  searchInput: {
    width: '100%',
    padding: '12px 20px 12px 45px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '30px',
    color: '#1e1b4b',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  navIcons: { display: 'flex', gap: '15px', alignItems: 'center' },
  iconBtn: {
    position: 'relative',
    background: 'none',
    border: 'none',
    color: '#1e1b4b',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '8px'
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#8B5CF6',
    color: 'white',
    fontSize: '10px',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userMenu: { display: 'flex', alignItems: 'center', gap: '10px' },
  userAvatar: { width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover' },
  logoutBtn: { background: '#f1f5f9', border: 'none', padding: '5px 12px', borderRadius: '20px', color: '#1e1b4b', cursor: 'pointer' },
  heroSection: { position: 'relative', height: '600px', overflow: 'hidden' },
  heroContainer: { position: 'relative', width: '100%', height: '100%' },
  heroSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'all 0.5s ease'
  },
  heroContent: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: 'translateY(-50%)',
    maxWidth: '500px',
    zIndex: 2
  },
  heroBadge: {
    display: 'inline-block',
    padding: '5px 15px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    marginBottom: '20px'
  },
  heroTitle: { fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '15px' },
  heroSubtitle: { fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px' },
  heroBtn: {
    padding: '12px 30px',
    background: '#8B5CF6',
    border: 'none',
    borderRadius: '30px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center'
  },
  carouselBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    zIndex: 10
  },
  carouselDots: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 10
  },
  carouselDot: {
    height: '8px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none'
  },
  benefitsBar: {
    background: 'white',
    padding: '30px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  benefitsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '0 20px'
  },
  benefitItem: { display: 'flex', alignItems: 'center', gap: '15px', color: '#1e1b4b' },
  benefitIcon: { fontSize: '32px', color: '#8B5CF6' },
  benefitTitle: { fontWeight: '600', marginBottom: '5px' },
  benefitDesc: { fontSize: '12px', color: '#64748b' },
  section: { maxWidth: '1400px', margin: '60px auto', padding: '0 20px' },
  sectionHeader: { textAlign: 'center', marginBottom: '40px' },
  sectionTitle: { fontSize: '36px', fontWeight: '700', color: '#1e1b4b', marginBottom: '10px' },
  gradientText: { background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  sectionSubtitle: { fontSize: '16px', color: '#64748b' },
  flashSaleHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' },
  timer: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.1)', padding: '8px 20px', borderRadius: '30px', color: '#F59E0B' },
  timerValue: { fontWeight: 'bold', fontSize: '18px' },
  categoriesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  categoryCard: { borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s ease' },
  categoryImage: { height: '300px', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' },
  categoryOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'white' },
  categoryIcon: { fontSize: '48px' },
  categoryName: { fontSize: '24px', fontWeight: '600' },
  categoryItems: { fontSize: '14px', opacity: 0.9 },
  categoryBtn: { marginTop: '10px', padding: '8px 20px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '20px', color: 'white', cursor: 'pointer' },
  filterTabs: { display: 'flex', justifyContent: 'center', gap: '15px', margin: '40px 20px', flexWrap: 'wrap' },
  filterTab: { padding: '10px 25px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '30px', color: '#64748b', cursor: 'pointer', transition: 'all 0.3s ease' },
  filterTabActive: { background: '#8B5CF6', color: 'white', borderColor: '#8B5CF6' },
  productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' },
  productCard: { background: 'white', borderRadius: '20px', overflow: 'hidden', transition: 'all 0.3s ease', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  productImageWrapper: { position: 'relative', height: '250px', overflow: 'hidden' },
  productImage: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' },
  productBadge: { position: 'absolute', top: '10px', left: '10px', padding: '5px 12px', borderRadius: '20px', color: 'white', fontSize: '11px', fontWeight: '600' },
  discountBadge: { position: 'absolute', top: '10px', right: '45px', background: '#F59E0B', padding: '5px 12px', borderRadius: '20px', color: 'white', fontSize: '11px', fontWeight: '600' },
  newBadge: { position: 'absolute', top: '10px', left: '10px', background: '#06B6D4', padding: '5px 12px', borderRadius: '20px', color: 'white', fontSize: '11px', fontWeight: '600' },
  wishlistBtn: { position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  productInfo: { padding: '20px' },
  productName: { fontSize: '16px', fontWeight: '600', color: '#1e1b4b', marginBottom: '5px' },
  productBrand: { fontSize: '12px', color: '#64748b', marginBottom: '8px' },
  rating: { display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' },
  starIcon: { color: '#F59E0B', fontSize: '14px' },
  reviewCount: { fontSize: '12px', color: '#64748b' },
  priceContainer: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' },
  currentPrice: { fontSize: '20px', fontWeight: '700', color: '#8B5CF6' },
  originalPrice: { fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' },
  addToCartBtn: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' },
  bannerSection: { margin: '60px 20px', background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', borderRadius: '30px', overflow: 'hidden' },
  bannerContent: { padding: '60px', textAlign: 'center' },
  bannerText: { color: 'white' },
  bannerIcon: { fontSize: '48px', marginBottom: '20px' },
  newsletter: { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px', flexWrap: 'wrap' },
  newsletterInput: { padding: '12px 20px', width: '300px', border: 'none', borderRadius: '30px', outline: 'none' },
  newsletterBtn: { padding: '12px 30px', background: 'white', border: 'none', borderRadius: '30px', color: '#8B5CF6', fontWeight: '600', cursor: 'pointer' },
  cartOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end' },
  cartSidebar: { width: '400px', background: 'white', height: '100%', display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.3s ease' },
  cartHeader: { padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1e1b4b' },
  closeCart: { background: 'none', border: 'none', color: '#64748b', fontSize: '20px', cursor: 'pointer' },
  cartItems: { flex: 1, overflowY: 'auto', padding: '20px' },
  emptyCart: { textAlign: 'center', padding: '40px', color: '#64748b' },
  emptyCartIcon: { fontSize: '64px', marginBottom: '20px' },
  continueShopping: { marginTop: '20px', padding: '10px 20px', background: '#8B5CF6', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer' },
  cartItem: { display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' },
  cartItemImage: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' },
  cartItemDetails: { flex: 1 },
  cartItemQuantity: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' },
  removeItem: { background: 'none', border: 'none', color: '#F59E0B', cursor: 'pointer' },
  cartFooter: { padding: '20px', borderTop: '1px solid #e2e8f0' },
  cartTotal: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e1b4b' },
  checkoutBtn: { width: '100%', padding: '15px', background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '600', cursor: 'pointer' },
  authOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', justifyContent: 'flex-end' },
  authSidebar: { width: '450px', background: 'white', height: '100%', display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.3s ease', overflowY: 'auto' },
  authHeader: { padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1e1b4b' },
  backBtn: { background: 'none', border: 'none', color: '#64748b', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' },
  closeAuthBtn: { background: 'none', border: 'none', color: '#64748b', fontSize: '20px', cursor: 'pointer' },
  tabContainer: { display: 'flex', gap: '10px', margin: '20px', background: '#f1f5f9', borderRadius: '16px', padding: '5px' },
  tab: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'transparent', border: 'none', borderRadius: '12px', color: '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  activeTab: { background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', color: 'white' },
  authBody: { padding: '20px', flex: 1 },
  loginIcon: { width: '60px', height: '60px', background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px', color: 'white' },
  loginTitle: { fontSize: '24px', fontWeight: '700', color: '#1e1b4b', textAlign: 'center', marginBottom: '8px' },
  loginSubtitle: { fontSize: '14px', color: '#64748b', textAlign: 'center', marginBottom: '30px' },
  loginForm: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  inputLabel: { fontSize: '14px', fontWeight: '500', color: '#1e1b4b' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '14px', color: '#8B5CF6', fontSize: '16px' },
  loginInput: { width: '100%', padding: '12px 40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#1e1b4b', fontSize: '14px', outline: 'none' },
  passwordToggle: { position: 'absolute', right: '14px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' },
  errorMessage: { padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#ef4444', fontSize: '13px', textAlign: 'center' },
  successMessage: { padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', color: '#22c55e', fontSize: '13px', textAlign: 'center' },
  loginSubmitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  dividerLine: { textAlign: 'center', position: 'relative', margin: '10px 0', '&::before': { content: "''", position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#e2e8f0' }, '& span': { background: 'white', padding: '0 10px', color: '#64748b', fontSize: '12px', position: 'relative', zIndex: 1 } },
  demoCredentials: { textAlign: 'center', padding: '10px', background: '#f8fafc', borderRadius: '10px', fontSize: '12px', color: '#64748b' },
  footer: { background: 'white', borderTop: '1px solid #e2e8f0', padding: '60px 20px 20px', marginTop: '60px' },
  footerContent: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' },
  footerSection: { display: 'flex', flexDirection: 'column', gap: '15px' },
  footerLogo: { fontSize: '24px', fontWeight: 'bold', color: '#1e1b4b' },
  footerDesc: { color: '#64748b', lineHeight: '1.6' },
  paymentMethods: { display: 'flex', gap: '15px' },
  paymentIcon: { fontSize: '24px', color: '#8B5CF6' },
  socialLinks: { display: 'flex', gap: '15px' },
  socialIcon: { fontSize: '20px', color: '#8B5CF6', cursor: 'pointer' },
  footerBottom: { textAlign: 'center', paddingTop: '40px', marginTop: '40px', borderTop: '1px solid #e2e8f0', color: '#94a3b8' }
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideIn { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .productCard:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.2); }
  .productCard:hover .productImage { transform: scale(1.05); }
  .categoryCard:hover { transform: translateY(-5px); }
  .addToCartBtn:hover, .heroBtn:hover, .categoryBtn:hover, .newsletterBtn:hover, .loginSubmitBtn:hover { transform: scale(1.05); }
  .iconBtn:hover { color: #8B5CF6; }
  .searchInput:focus { border-color: #8B5CF6; box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1); }
  .dividerLine::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #e2e8f0; }
  .dividerLine span { background: white; padding: 0 10px; color: #64748b; font-size: 12px; position: relative; z-index: 1; }
`;
document.head.appendChild(styleSheet);

export default Home;