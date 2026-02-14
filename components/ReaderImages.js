"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ReaderImages({ images, chapterNumber, manhwaTitle }) {
  const [loadedSet, setLoadedSet] = useState(new Set());
  const observerRef = useRef(null);
  const imageRefs = useRef([]);

  const handleLoad = useCallback((index) => {
    setLoadedSet((prev) => new Set([...prev, index]));
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: "800px 0px" }
    );

    imageRefs.current.forEach((img) => {
      if (img) observerRef.current?.observe(img);
    });

    return () => observerRef.current?.disconnect();
  }, [images]);

  return (
    <div className="flex flex-col items-center bg-black min-h-screen">
      {images.map((url, index) => (
        <div
          key={index}
          className="w-full max-w-3xl relative"
          style={{ minHeight: loadedSet.has(index) ? "auto" : "400px" }}
        >
          <Image
            src={url}
            alt={`${manhwaTitle} Chapter ${chapterNumber} - Page ${index + 1}`}
            width={800}
            height={1200}
            className={`w-full h-auto ${loadedSet.has(index) ? "fade-in" : "opacity-0"}`}
            onLoad={() => handleLoad(index)}
            loading={index < 3 ? "eager" : "lazy"}
            quality={85}
            sizes="(max-width: 768px) 100vw, 800px"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
