import './ProductGrid.css';

const PLACEHOLDER_PRODUCTS = [
  { id: 1, title: 'Sacred Emblem I', subtitle: 'Sacred Silver' },
  { id: 2, title: 'Mystic Protection II', subtitle: 'Obsidian Core' },
  { id: 3, title: 'Celestial Talisman III', subtitle: 'Ivory Bone' }
];

export default function ProductGrid() {
  return (
    <section className="product-grid-section">
      {/* Background Ambient Glow */}
      <div className="product-grid-ambient-glow"></div>

      <div className="section-header">
        <span className="section-label"><span className="text-accent-gold">✧</span> Selected Objects <span className="text-accent-gold">✧</span></span>
        <h2 className="section-title">The <span className="text-accent-turquoise">First</span> Relics</h2>
      </div>
      
      <div className="product-container">
        {PLACEHOLDER_PRODUCTS.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-box">
              <div className="glass-reflection"></div>
              <div className="placeholder-icon">✧</div>
              {/* Future product image goes here */}
              <div className="card-hover-overlay"></div>
            </div>
            
            <div className="product-info-panel">
              <span className="product-type">{product.subtitle}</span>
              <h3 className="product-name">{product.title}</h3>
              <div className="product-line"></div>
              <p className="product-availability">PRE-ORDER OPEN</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
