'use client';

import './Story.css';

interface StoryProps {
  dict: any;
}

export default function Story({ dict }: StoryProps) {
  if (!dict) return null;

  return (
    <section className="story-section">
      <div className="story-atmosphere-glow"></div>
      
      <div className="story-container">
        <h2 className="story-title">{dict.title}</h2>
        <div className="story-ornament">✧ ✦ ✧</div>
        <div className="story-content">
          <p className="story-para">{dict.p1}</p>
          <p className="story-para">{dict.p2}</p>
        </div>
      </div>
    </section>
  );
}
