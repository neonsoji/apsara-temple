'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  }, [current, isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % images.length);
  }, [current, images.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + images.length) % images.length);
  }, [current, images.length, goTo]);

  // Auto-cycle every 4s
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, images.length]);

  if (!images || images.length === 0) return null;

  // Single image — rendu simple
  if (images.length === 1) {
    return (
      <div className="main-image-wrapper">
        <div className="image-aura" />
        <Image 
          src={images[0]} 
          alt={`${alt} – talisman spirituel APSARA TEMPLE`} 
          width={800} 
          height={800} 
          priority 
          sizes="(max-width: 1024px) 100vw, 800px"
          className="main-product-image" 
        />
      </div>
    );
  }

  return (
    <div className="gallery-wrapper">
      <div className="image-aura" />

      {/* Main display */}
      <div
        className="gallery-main"
        style={{ opacity: isAnimating ? 0 : 1 }}
      >
        <Image
          src={images[current]}
          alt={`${alt} – talisman spirituel APSARA TEMPLE — ${current + 1}`}
          width={800}
          height={800}
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="main-product-image"
        />
      </div>

      {/* Prev / Next arrows */}
      <button className="gallery-arrow gallery-arrow--prev" onClick={prev} aria-label="Image précédente">
        ‹
      </button>
      <button className="gallery-arrow gallery-arrow--next" onClick={next} aria-label="Image suivante">
        ›
      </button>

      {/* Dot indicators */}
      <div className="gallery-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot${i === current ? ' gallery-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            className={`gallery-thumb${i === current ? ' gallery-thumb--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Vignette ${i + 1}`}
          >
            <Image 
              src={src} 
              alt={`${alt} – talisman spirituel APSARA TEMPLE vignette ${i + 1}`} 
              width={100} 
              height={100} 
              sizes="100px"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
