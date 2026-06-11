import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBoxOpen, 
  FaSearch, 
  FaArrowRight, 
  FaStar, 
  FaShoppingCart,
  FaEye,
  FaHeart,
  FaCode,
  FaCloud,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaMobileAlt,
  FaCheckCircle,
  FaTimes,
  FaInfoCircle,
  FaDollarSign,
  FaUsers,
  FaClock,
  FaHeadset,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaThLarge,
  FaList,
  FaGem,
  FaFire,
  FaAward,
  FaTachometerAlt,
  FaRegGem,
  FaRocket,
  FaSyncAlt,
  FaGripfire,
  FaCrown,
  FaLayerGroup,
  FaMicrochip,
  FaNetworkWired,
  FaVrCardboard
} from 'react-icons/fa';

const Product = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('featured'); // featured, priceLow, priceHigh, rating
  const [showFilters, setShowFilters] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Unique Products Data with advanced features
  const products = [
    {
      id: 1,
      name: "Quantum Cloud Matrix",
      category: "cloud",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 1247,
      icon: <FaCloud />,
      description: "Revolutionary cloud infrastructure powered by quantum computing algorithms for unprecedented speed and security.",
      longDescription: "Experience the future of cloud computing with Quantum Cloud Matrix. Our next-generation platform leverages quantum-inspired algorithms to deliver lightning-fast processing, 99.999% uptime, and military-grade encryption. Perfect for enterprises handling sensitive data and requiring massive scalability.",
      features: ["Quantum Encryption", "99.999% Uptime", "Edge Computing", "Auto-scaling", "AI Optimization", "Global CDN"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#00d2ff",
      badge: "Bestseller",
      badgeIcon: <FaCrown />,
      stock: 50,
      discount: 25,
      technology: "Quantum Computing",
      launchDate: "2024",
      demoUrl: "#"
    },
    {
      id: 2,
      name: "Neural AI Engine",
      category: "ai",
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      reviews: 894,
      icon: <FaRobot />,
      description: "Advanced neural network platform that learns and adapts to your business needs in real-time.",
      longDescription: "Neural AI Engine is a breakthrough in artificial intelligence technology. Using deep learning models trained on billions of data points, it provides predictive analytics, natural language processing, and computer vision capabilities out of the box.",
      features: ["Deep Learning", "NLP Processing", "Computer Vision", "Real-time Analytics", "API Access", "Custom Models"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#7c3aed",
      badge: "New",
      badgeIcon: <FaFire />,
      stock: 120,
      discount: 33,
      technology: "Neural Networks",
      launchDate: "2024",
      demoUrl: "#"
    },
    {
      id: 3,
      name: "CyberShield Fortress",
      category: "security",
      price: 149,
      originalPrice: 249,
      rating: 4.9,
      reviews: 2156,
      icon: <FaShieldAlt />,
      description: "Military-grade cybersecurity suite with AI-powered threat detection and zero-trust architecture.",
      longDescription: "CyberShield Fortress provides enterprise-level security with advanced threat intelligence, real-time monitoring, and automated incident response. Protect your digital assets from sophisticated cyber attacks.",
      features: ["Zero Trust", "AI Threat Detection", "24/7 Monitoring", "Compliance Ready", "Data Encryption", "DDoS Protection"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ef4444",
      badge: "Top Rated",
      badgeIcon: <FaAward />,
      stock: 85,
      discount: 40,
      technology: "Zero Trust Architecture",
      launchDate: "2023",
      demoUrl: "#"
    },
    {
      id: 4,
      name: "DevOps Fusion Hub",
      category: "devops",
      price: 249,
      originalPrice: 349,
      rating: 4.7,
      reviews: 567,
      icon: <FaCode />,
      description: "All-in-one DevOps platform with CI/CD, container orchestration, and infrastructure as code.",
      longDescription: "DevOps Fusion Hub streamlines your entire development pipeline. From code commit to production deployment, automate everything with our powerful workflow engine and built-in monitoring.",
      features: ["CI/CD Pipeline", "K8s Integration", "Infra as Code", "Monitoring", "Log Management", "Auto-scaling"],
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#10b981",
      badge: "Trending",
      badgeIcon: <FaGripfire />,
      stock: 200,
      discount: 28,
      technology: "Container Orchestration",
      launchDate: "2024",
      demoUrl: "#"
    },
    {
      id: 5,
      name: "DataSphere Analytics",
      category: "analytics",
      price: 179,
      originalPrice: 279,
      rating: 4.8,
      reviews: 1023,
      icon: <FaChartLine />,
      description: "Advanced business intelligence platform with real-time dashboards and predictive insights.",
      longDescription: "Transform your data into actionable insights with DataSphere Analytics. Our platform processes millions of data points in real-time, providing stunning visualizations and AI-powered recommendations.",
      features: ["Real-time Dashboards", "Predictive Analytics", "Data Visualization", "Custom Reports", "Data Integration", "ML Models"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#f59e0b",
      badge: "Popular",
      badgeIcon: <FaStar />,
      stock: 150,
      discount: 35,
      technology: "Big Data Processing",
      launchDate: "2023",
      demoUrl: "#"
    },
    {
      id: 6,
      name: "Nexus Database",
      category: "database",
      price: 159,
      originalPrice: 229,
      rating: 4.6,
      reviews: 678,
      icon: <FaDatabase />,
      description: "Distributed SQL database with automatic sharding, replication, and ACID compliance.",
      longDescription: "Nexus Database combines the scalability of NoSQL with the reliability of SQL. Perfect for modern applications requiring high performance and data consistency at scale.",
      features: ["ACID Compliant", "Auto-sharding", "Multi-region", "Backup & Restore", "Query Optimizer", "Security First"],
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a164?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ec4899",
      badge: "Enterprise",
      badgeIcon: <FaGem />,
      stock: 95,
      discount: 30,
      technology: "Distributed SQL",
      launchDate: "2024",
      demoUrl: "#"
    },
    {
      id: 7,
      name: "AppForge Mobile",
      category: "mobile",
      price: 129,
      originalPrice: 199,
      rating: 4.8,
      reviews: 1456,
      icon: <FaMobileAlt />,
      description: "Cross-platform mobile development framework with native performance and hot reload.",
      longDescription: "Build beautiful, high-performance mobile apps for iOS and Android simultaneously. AppForge Mobile offers a rich set of pre-built components and seamless native integrations.",
      features: ["Cross-platform", "Hot Reload", "Native APIs", "UI Components", "Offline Sync", "Push Notifications"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#06b6d4",
      badge: "Fastest Growing",
      badgeIcon: <FaRocket />,
      stock: 300,
      discount: 35,
      technology: "React Native Based",
      launchDate: "2024",
      demoUrl: "#"
    },
    {
      id: 8,
      name: "IntelliCRM Suite",
      category: "crm",
      price: 199,
      originalPrice: 299,
      rating: 4.9,
      reviews: 1890,
      icon: <FaUsers />,
      description: "AI-powered CRM with sales automation, customer insights, and omnichannel support.",
      longDescription: "Revolutionize your customer relationships with IntelliCRM. Our intelligent platform automates sales processes, provides deep customer insights, and delivers personalized experiences at scale.",
      features: ["Sales Automation", "Customer Insights", "Omnichannel", "Email Marketing", "Analytics", "Mobile App"],
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#8b5cf6",
      badge: "Editor's Choice",
      badgeIcon: <FaRegGem />,
      stock: 180,
      discount: 33,
      technology: "AI-Powered CRM",
      launchDate: "2023",
      demoUrl: "#"
    },
    {
      id: 9,
      name: "EdgeVR Platform",
      category: "vr",
      price: 399,
      originalPrice: 599,
      rating: 4.9,
      reviews: 432,
      icon: <FaVrCardboard />,
      description: "Immersive virtual reality platform for enterprise training and collaboration.",
      longDescription: "Transform training and collaboration with EdgeVR. Create immersive 3D environments for remote teams, conduct virtual meetings, and provide hands-on training experiences.",
      features: ["3D Environments", "Avatar System", "Spatial Audio", "Screen Sharing", "Recording", "Analytics"],
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ff6b6b",
      badge: "Innovation",
      badgeIcon: <FaMicrochip />,
      stock: 45,
      discount: 33,
      technology: "WebXR",
      launchDate: "2025",
      demoUrl: "#"
    },
    {
      id: 10,
      name: "Blockchain Nexus",
      category: "blockchain",
      price: 349,
      originalPrice: 499,
      rating: 4.8,
      reviews: 567,
      icon: <FaNetworkWired />,
      description: "Enterprise blockchain platform for smart contracts and decentralized applications.",
      longDescription: "Build secure, transparent, and efficient business processes with Blockchain Nexus. Our platform supports multiple consensus mechanisms and provides easy-to-use smart contract tools.",
      features: ["Smart Contracts", "Consensus Options", "Tokenization", "Audit Trail", "API Access", "Wallet SDK"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#00bcd4",
      badge: "Cutting Edge",
      badgeIcon: <FaLayerGroup />,
      stock: 60,
      discount: 30,
      technology: "Blockchain",
      launchDate: "2024",
      demoUrl: "#"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Products', icon: <FaBoxOpen />, count: products.length },
    { id: 'cloud', name: 'Cloud Computing', icon: <FaCloud />, count: products.filter(p => p.category === 'cloud').length },
    { id: 'ai', name: 'AI & ML', icon: <FaRobot />, count: products.filter(p => p.category === 'ai').length },
    { id: 'security', name: 'Security', icon: <FaShieldAlt />, count: products.filter(p => p.category === 'security').length },
    { id: 'devops', name: 'DevOps', icon: <FaCode />, count: products.filter(p => p.category === 'devops').length },
    { id: 'analytics', name: 'Analytics', icon: <FaChartLine />, count: products.filter(p => p.category === 'analytics').length },
    { id: 'crm', name: 'CRM', icon: <FaUsers />, count: products.filter(p => p.category === 'crm').length }
  ];

  // Show toast notification
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Add to wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToastMessage('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToastMessage('Added to wishlist');
    }
  };

  // Add to compare
  const toggleCompare = (product) => {
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
      showToastMessage('Removed from comparison');
    } else if (compareList.length < 3) {
      setCompareList([...compareList, product]);
      showToastMessage('Added to compare');
    } else {
      showToastMessage('Can only compare up to 3 products');
    }
  };

  // Sort products
  const getSortedProducts = () => {
    let filtered = products.filter(product => {
      const matchesFilter = activeFilter === 'all' || product.category === activeFilter;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesFilter && matchesSearch && matchesPrice;
    });

    switch(sortBy) {
      case 'priceLow':
        return filtered.sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const filteredProducts = getSortedProducts();

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Stats for the product page
  const stats = [
    { value: "500+", label: "Products Sold", icon: <FaBoxOpen /> },
    { value: "50K+", label: "Happy Customers", icon: <FaUsers /> },
    { value: "4.9", label: "Average Rating", icon: <FaStar /> },
    { value: "24/7", label: "Support", icon: <FaHeadset /> }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgAnimation}>
        <div style={styles.cube}></div>
        <div style={{...styles.cube, ...styles.cube2}}></div>
        <div style={{...styles.cube, ...styles.cube3}}></div>
        <div style={{...styles.cube, ...styles.cube4}}></div>
      </div>
      <div style={styles.overlay}></div>

      {/* Toast Notification */}
      {showToast && (
        <div style={styles.toast}>
          {toastMessage}
        </div>
      )}

      {/* Compare Bar */}
      {compareList.length > 0 && showCompare && (
        <div style={styles.compareBar}>
          <div style={styles.compareBarContent}>
            <h4>Compare Products ({compareList.length}/3)</h4>
            <div style={styles.compareItems}>
              {compareList.map(product => (
                <div key={product.id} style={styles.compareItem}>
                  <span>{product.name}</span>
                  <button onClick={() => toggleCompare(product)} style={styles.removeCompareBtn}>×</button>
                </div>
              ))}
            </div>
            <div style={styles.compareActions}>
              <button style={styles.compareNowBtn}>Compare Now</button>
              <button onClick={() => setShowCompare(false)} style={styles.closeCompareBtn}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.content}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroBadge}>
            <FaGem /> Premium Collection
          </div>
          <h1 style={styles.heroTitle}>
            Discover <span style={styles.gradientText}>Innovative</span> Products
          </h1>
          <p style={styles.heroSubtitle}>
            Cutting-edge solutions designed to transform your business and accelerate growth
          </p>
          
          {/* Stats Bar */}
          <div style={styles.statsBar}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.statCard}>
                <div style={styles.statIcon}>{stat.icon}</div>
                <div>
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Search Section */}
        <div style={styles.filterSection}>
          <div style={styles.searchWrapper}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products by name or description..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <FaTimes style={styles.clearIcon} onClick={() => setSearchTerm('')} />
            )}
          </div>

          <div style={styles.filterActions}>
            <button 
              style={styles.filterToggleBtn}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
            
            <div style={styles.sortWrapper}>
              <select 
                style={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div style={styles.viewToggle}>
              <button 
                style={{...styles.viewBtn, ...(viewMode === 'grid' ? styles.viewBtnActive : {})}}
                onClick={() => setViewMode('grid')}
              >
                <FaThLarge />
              </button>
              <button 
                style={{...styles.viewBtn, ...(viewMode === 'list' ? styles.viewBtnActive : {})}}
                onClick={() => setViewMode('list')}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div style={styles.filtersPanel}>
            <div style={styles.filterGroup}>
              <h4>Price Range</h4>
              <div style={styles.priceRange}>
                <span>${priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  style={styles.rangeSlider}
                />
                <span>${priceRange[1]}</span>
              </div>
            </div>
            <div style={styles.filterGroup}>
              <h4>Categories</h4>
              <div style={styles.categoryFilterList}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    style={{...styles.categoryFilterBtn, ...(activeFilter === cat.id ? styles.categoryFilterActive : {})}}
                    onClick={() => setActiveFilter(cat.id)}
                  >
                    {cat.icon} {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div style={styles.resultsInfo}>
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          {compareList.length > 0 && (
            <button style={styles.viewCompareBtn} onClick={() => setShowCompare(true)}>
              View Compare ({compareList.length})
            </button>
          )}
        </div>

        {/* Products Grid/List */}
        <div style={viewMode === 'grid' ? styles.productsGrid : styles.productsList}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={viewMode === 'grid' ? styles.productCard : styles.productListItem}>
              {/* Product Badge */}
              {product.badge && (
                <div style={{...styles.productBadge, background: product.color}}>
                  {product.badgeIcon} {product.badge}
                </div>
              )}
              
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div style={styles.discountBadge}>
                  -{product.discount}%
                </div>
              )}

              {/* Image Section */}
              <div style={viewMode === 'grid' ? styles.productImageWrapper : styles.listImageWrapper}>
                <img src={product.image} alt={product.name} style={viewMode === 'grid' ? styles.productImage : styles.listImage} />
                <div style={{...styles.productIconOverlay, background: product.color}}>
                  {product.icon}
                </div>
                <div style={styles.imageActions}>
                  <button 
                    style={styles.imageActionBtn}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <FaHeart color={wishlist.includes(product.id) ? '#ef4444' : 'white'} />
                  </button>
                  <button 
                    style={styles.imageActionBtn}
                    onClick={() => openProductModal(product)}
                  >
                    <FaEye />
                  </button>
                  <button 
                    style={styles.imageActionBtn}
                    onClick={() => toggleCompare(product)}
                  >
                    <FaSyncAlt />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div style={viewMode === 'grid' ? styles.productContent : styles.listContent}>
                <div style={styles.productHeader}>
                  <div>
                    <h3 style={styles.productName}>{product.name}</h3>
                    <div style={styles.productTech}>{product.technology}</div>
                  </div>
                  <div style={styles.rating}>
                    <FaStar style={styles.starIcon} />
                    <span>{product.rating}</span>
                    <span style={styles.reviewCount}>({product.reviews.toLocaleString()})</span>
                  </div>
                </div>

                <p style={styles.productDescription}>{product.description}</p>

                <div style={styles.featureTags}>
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} style={styles.featureTag}>
                      <FaCheckCircle style={styles.checkIcon} />
                      {feature}
                    </span>
                  ))}
                </div>

                <div style={styles.productFooter}>
                  <div>
                    {product.originalPrice && (
                      <span style={styles.originalPrice}>${product.originalPrice}</span>
                    )}
                    <span style={styles.productPrice}>${product.price}<span style={styles.pricePeriod}>/mo</span></span>
                  </div>
                  <div style={styles.productActions}>
                    <button 
                      style={styles.detailsBtn}
                      onClick={() => openProductModal(product)}
                    >
                      <FaInfoCircle /> Details
                    </button>
                    <button style={styles.cartBtn}>
                      <FaShoppingCart /> Buy Now
                    </button>
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div style={styles.listExtraFeatures}>
                    {product.features.slice(3, 5).map((feature, idx) => (
                      <span key={idx} style={styles.listFeature}>
                        <FaCheckCircle /> {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={styles.emptyState}>
            <FaBoxOpen style={styles.emptyIcon} />
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button style={styles.resetBtn} onClick={() => { 
              setSearchTerm(''); 
              setActiveFilter('all');
              setPriceRange([0, 500]);
            }}>
              Reset Filters
            </button>
          </div>
        )}

        {/* Premium Features Section */}
        <div style={styles.premiumSection}>
          <div style={styles.premiumHeader}>
            <h2>Why Choose <span style={styles.gradientText}>Our Products</span></h2>
            <p>Experience the difference with our premium offerings</p>
          </div>
          <div style={styles.premiumGrid}>
            <div style={styles.premiumCard}>
              <div style={styles.premiumIcon}><FaTachometerAlt /></div>
              <h3>Lightning Fast</h3>
              <p>Optimized performance with 99.99% uptime guarantee</p>
            </div>
            <div style={styles.premiumCard}>
              <div style={styles.premiumIcon}><FaShieldAlt /></div>
              <h3>Bank-Level Security</h3>
              <p>Enterprise-grade encryption and data protection</p>
            </div>
            <div style={styles.premiumCard}>
              <div style={styles.premiumIcon}><FaHeadset /></div>
              <h3>24/7 Expert Support</h3>
              <p>Dedicated support team available round the clock</p>
            </div>
            <div style={styles.premiumCard}>
              <div style={styles.premiumIcon}><FaRocket /></div>
              <h3>Regular Updates</h3>
              <p>Continuous improvement with monthly releases</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to Transform Your Business?</h2>
            <p style={styles.ctaDesc}>Join thousands of satisfied customers using our innovative products</p>
            <button style={styles.ctaButton}>
              Start Free Trial <FaArrowRight style={styles.ctaIcon} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerBrand}>
              <div style={styles.logo3dSmall}>
                <span style={styles.logoTextSmall}>N</span>
              </div>
              <span style={styles.footerLogoName}>Nexura</span>
              <p style={styles.footerDesc}>Creating innovative digital solutions for the modern world.</p>
            </div>
            <div style={styles.footerLinks}>
              <div style={styles.footerColumn}>
                <h4>Products</h4>
                <a href="#">Cloud Suite</a>
                <a href="#">AI Analytics</a>
                <a href="#">Security</a>
              </div>
              <div style={styles.footerColumn}>
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
              </div>
              <div style={styles.footerColumn}>
                <h4>Resources</h4>
                <a href="#">Documentation</a>
                <a href="#">Support</a>
                <a href="#">API Status</a>
              </div>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>&copy; 2026 Nexura. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              <FaTimes />
            </button>
            <div style={styles.modalContent}>
              <div style={styles.modalImageWrapper}>
                <img src={selectedProduct.image} alt={selectedProduct.name} style={styles.modalImage} />
                <div style={{...styles.modalIcon, background: selectedProduct.color}}>
                  {selectedProduct.icon}
                </div>
              </div>
              <div style={styles.modalInfo}>
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
                  <div style={styles.modalRating}>
                    <FaStar style={styles.starIcon} />
                    <span>{selectedProduct.rating}</span>
                    <span>({selectedProduct.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <div style={styles.modalTech}>{selectedProduct.technology}</div>
                <p style={styles.modalDescription}>{selectedProduct.longDescription}</p>
                
                <div style={styles.modalFeatures}>
                  <h4>Key Features</h4>
                  <div style={styles.modalFeaturesList}>
                    {selectedProduct.features.map((feature, idx) => (
                      <span key={idx} style={styles.modalFeature}>
                        <FaCheckCircle /> {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.modalPriceSection}>
                  <div>
                    {selectedProduct.originalPrice && (
                      <span style={styles.modalOriginalPrice}>${selectedProduct.originalPrice}</span>
                    )}
                    <span style={styles.modalPrice}>${selectedProduct.price}<span>/mo</span></span>
                  </div>
                  <div style={styles.modalStock}>
                    {selectedProduct.stock > 0 ? (
                      <span style={styles.inStock}>✓ In Stock ({selectedProduct.stock} units)</span>
                    ) : (
                      <span style={styles.outStock}>✗ Out of Stock</span>
                    )}
                  </div>
                </div>

                <div style={styles.modalActions}>
                  <button style={styles.modalBuyBtn}>
                    <FaShoppingCart /> Purchase Now
                  </button>
                  <button style={styles.modalDemoBtn}>
                    Watch Demo <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    background: '#0a0a0a',
    overflowX: 'hidden',
    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  bgAnimation: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0
  },
  cube: {
    position: 'absolute',
    top: '80vh',
    left: '45vw',
    width: '10px',
    height: '10px',
    border: 'solid 1px rgba(0,210,255,0.3)',
    transformOrigin: 'top left',
    transform: 'scale(0) rotate(0deg) translate(-50%, -50%)',
    animation: 'cube 12s ease-in forwards infinite'
  },
  cube2: { top: '20vh', left: '10vw', animationDelay: '2s' },
  cube3: { top: '50vh', left: '85vw', animationDelay: '4s' },
  cube4: { top: '30vh', left: '70vw', animationDelay: '6s' },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(0,210,255,0.08) 0%, rgba(0,0,0,0.95) 100%)',
    zIndex: 1
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: '40px 40px 0 40px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  toast: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    background: '#1a1a2e',
    color: '#00d2ff',
    padding: '12px 24px',
    borderRadius: '12px',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease',
    border: '1px solid #00d2ff',
    boxShadow: '0 4px 15px rgba(0,210,255,0.2)'
  },
  compareBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(15, 15, 25, 0.98)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(0,210,255,0.2)',
    padding: '15px 30px',
    zIndex: 100,
    animation: 'slideUp 0.3s ease'
  },
  compareBarContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  compareItems: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  compareItem: {
    background: 'rgba(0,210,255,0.1)',
    padding: '5px 12px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px'
  },
  removeCompareBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '16px'
  },
  compareActions: {
    display: 'flex',
    gap: '10px'
  },
  compareNowBtn: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer'
  },
  closeCompareBtn: {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer'
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(0,210,255,0.1)',
    padding: '8px 20px',
    borderRadius: '50px',
    marginBottom: '20px',
    color: '#00d2ff',
    fontSize: '14px'
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '16px'
  },
  gradientText: {
    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '600px',
    margin: '0 auto 40px'
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
    marginTop: '20px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    background: 'rgba(15, 15, 25, 0.6)',
    backdropFilter: 'blur(10px)',
    padding: '15px 25px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  statIcon: {
    fontSize: '32px',
    color: '#00d2ff'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white'
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)'
  },
  filterSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(15, 15, 25, 0.6)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px'
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.5)'
  },
  searchInput: {
    width: '100%',
    padding: '12px 40px 12px 40px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  clearIcon: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer'
  },
  filterActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  filterToggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer'
  },
  sortWrapper: {
    position: 'relative'
  },
  sortSelect: {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer'
  },
  viewToggle: {
    display: 'flex',
    gap: '8px',
    background: 'rgba(255,255,255,0.05)',
    padding: '5px',
    borderRadius: '12px'
  },
  viewBtn: {
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer'
  },
  viewBtnActive: {
    background: 'rgba(0,210,255,0.2)',
    color: '#00d2ff'
  },
  filtersPanel: {
    background: 'rgba(15, 15, 25, 0.6)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  filterGroup: {
    marginBottom: '20px'
  },
  priceRange: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '10px'
  },
  rangeSlider: {
    flex: 1,
    height: '4px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '2px'
  },
  categoryFilterList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px'
  },
  categoryFilterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer',
    fontSize: '13px'
  },
  categoryFilterActive: {
    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    borderColor: 'transparent',
    color: 'white'
  },
  resultsInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px'
  },
  viewCompareBtn: {
    background: 'rgba(0,210,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    padding: '5px 12px',
    color: '#00d2ff',
    cursor: 'pointer'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  productsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '60px'
  },
  productCard: {
    position: 'relative',
    background: 'rgba(15, 15, 25, 0.6)',
    backdropFilter: 'blur(15px)',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease'
  },
  productListItem: {
    position: 'relative',
    display: 'flex',
    background: 'rgba(15, 15, 25, 0.6)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease'
  },
  productBadge: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '11px',
    fontWeight: '600',
    zIndex: 5
  },
  discountBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#ef4444',
    padding: '5px 10px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    zIndex: 5
  },
  productImageWrapper: {
    position: 'relative',
    height: '220px',
    overflow: 'hidden'
  },
  listImageWrapper: {
    position: 'relative',
    width: '280px',
    minWidth: '280px',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  listImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  productIconOverlay: {
    position: 'absolute',
    bottom: '-20px',
    right: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
  },
  imageActions: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    display: 'flex',
    gap: '8px',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  imageActionBtn: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(5px)',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  productContent: {
    padding: '24px'
  },
  listContent: {
    flex: 1,
    padding: '24px'
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  productName: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '4px'
  },
  productTech: {
    fontSize: '11px',
    color: '#00d2ff'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '#f59e0b'
  },
  starIcon: {
    fontSize: '14px'
  },
  reviewCount: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px'
  },
  productDescription: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  featureTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px'
  },
  featureTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.05)',
    padding: '4px 10px',
    borderRadius: '20px'
  },
  checkIcon: {
    fontSize: '9px',
    color: '#10b981'
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  originalPrice: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'line-through',
    marginRight: '8px'
  },
  productPrice: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#00d2ff'
  },
  pricePeriod: {
    fontSize: '12px',
    fontWeight: 'normal'
  },
  productActions: {
    display: 'flex',
    gap: '10px'
  },
  detailsBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '13px'
  },
  cartBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '13px'
  },
  listExtraFeatures: {
    display: 'flex',
    gap: '15px',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  listFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px',
    background: 'rgba(15, 15, 25, 0.6)',
    borderRadius: '24px',
    marginBottom: '60px'
  },
  emptyIcon: {
    fontSize: '64px',
    color: 'rgba(255,255,255,0.2)',
    marginBottom: '20px'
  },
  resetBtn: {
    marginTop: '20px',
    padding: '10px 24px',
    background: '#00d2ff',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    cursor: 'pointer'
  },
  premiumSection: {
    marginTop: '60px',
    marginBottom: '60px',
    textAlign: 'center'
  },
  premiumHeader: {
    marginBottom: '40px'
  },
  premiumGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  premiumCard: {
    background: 'rgba(15, 15, 25, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease'
  },
  premiumIcon: {
    fontSize: '48px',
    color: '#00d2ff',
    marginBottom: '16px'
  },
  ctaSection: {
    marginBottom: '60px',
    background: 'linear-gradient(135deg, rgba(0,210,255,0.1), rgba(58,123,213,0.05))',
    borderRadius: '32px',
    padding: '60px',
    textAlign: 'center'
  },
  ctaTitle: {
    fontSize: '38px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '16px'
  },
  ctaDesc: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '30px'
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 42px',
    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    border: 'none',
    borderRadius: '60px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  ctaIcon: {
    fontSize: '14px'
  },
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '50px',
    paddingBottom: '30px'
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    marginBottom: '40px'
  },
  footerBrand: {
    maxWidth: '300px'
  },
  logo3dSmall: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px'
  },
  logoTextSmall: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white'
  },
  footerLogoName: {
    fontSize: '22px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #fff, #00d2ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'block',
    marginBottom: '12px'
  },
  footerDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '1.6'
  },
  footerLinks: {
    display: 'flex',
    gap: '60px',
    flexWrap: 'wrap'
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    position: 'relative',
    maxWidth: '1000px',
    width: '90%',
    background: 'rgba(15, 15, 25, 0.98)',
    borderRadius: '32px',
    overflow: 'hidden',
    border: '1px solid rgba(0,210,255,0.2)'
  },
  modalClose: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255,255,255,0.1)',
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
  modalContent: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  modalImageWrapper: {
    flex: 1,
    minWidth: '350px',
    position: 'relative',
    background: 'linear-gradient(135deg, #00d2ff20, #3a7bd505)'
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  modalIcon: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    color: 'white'
  },
  modalInfo: {
    flex: 1,
    padding: '32px'
  },
  modalHeader: {
    marginBottom: '16px'
  },
  modalTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px'
  },
  modalRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#f59e0b'
  },
  modalTech: {
    display: 'inline-block',
    background: 'rgba(0,210,255,0.1)',
    padding: '4px 12px',
    borderRadius: '20px',
    color: '#00d2ff',
    fontSize: '12px',
    marginBottom: '20px'
  },
  modalDescription: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.6',
    marginBottom: '24px'
  },
  modalFeatures: {
    marginBottom: '24px'
  },
  modalFeaturesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '12px'
  },
  modalFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.8)'
  },
  modalPriceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  modalOriginalPrice: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'line-through',
    marginRight: '12px'
  },
  modalPrice: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#00d2ff'
  },
  modalStock: {
    fontSize: '14px'
  },
  inStock: {
    color: '#10b981'
  },
  outStock: {
    color: '#ef4444'
  },
  modalActions: {
    display: 'flex',
    gap: '15px'
  },
  modalBuyBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '14px',
    background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  modalDemoBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes cube {
    from {
      transform: scale(0) rotate(0deg) translate(-50%, -50%);
      opacity: 1;
    }
    to {
      transform: scale(20) rotate(960deg) translate(-50%, -50%);
      opacity: 0;
    }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  
  .productCard:hover, .productListItem:hover {
    transform: translateY(-5px);
    border-color: rgba(0,210,255,0.3);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  
  .productCard:hover .productImage,
  .productListItem:hover .listImage {
    transform: scale(1.05);
  }
  
  .productCard:hover .imageActions,
  .productListItem:hover .imageActions {
    opacity: 1;
  }
  
  .detailsBtn:hover, .cartBtn:hover, .ctaButton:hover, .resetBtn:hover, .modalBuyBtn:hover, .modalDemoBtn:hover, .filterToggleBtn:hover, .viewBtn:hover, .categoryFilterBtn:hover {
    transform: scale(1.05);
  }
  
  .premiumCard:hover {
    transform: translateY(-8px);
    border-color: rgba(0,210,255,0.3);
  }
  
  .imageActionBtn:hover {
    transform: scale(1.1);
    background: #00d2ff;
  }
  
  input:focus, select:focus {
    border-color: #00d2ff;
    outline: none;
  }
  
  a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #00d2ff;
  }
  
  button {
    cursor: pointer;
  }
`;

document.head.appendChild(styleSheet);

export default Product;