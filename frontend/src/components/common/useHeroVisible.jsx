import { useEffect, useState } from "react";

export default function useHeroVisible() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero-section");

    // SAFE GUARD (this fixes your crash)
    if (!hero) {
      setIsHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return isHeroVisible;
}