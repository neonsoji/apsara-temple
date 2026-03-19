import './Story.css';

export default function Story() {
  return (
    <section className="story-section">
      <div className="story-ambient-glow"></div>
      
      <div className="story-container">
        <h2 className="story-title">The <span className="text-accent-gold">Temple</span></h2>
        <div className="story-ornament-top">✧</div>
        <p className="story-text">
          Where ancient symbols meet modern protection. Our sacred talismans 
          are crafted with intention, echoing the spiritual legacy of forgotten temples 
          and the timeless wisdom of sacred geometry.
        </p>
        <p className="story-text">
          Each piece is a vessel of energy, a silent guardian for the contemporary soul, 
          carrying the weight of ritual and the beauty of sacred arts.
        </p>
      </div>
    </section>
  );
}
