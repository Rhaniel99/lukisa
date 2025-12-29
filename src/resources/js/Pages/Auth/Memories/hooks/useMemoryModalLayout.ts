import { useEffect, useState } from "react";

export function useMemoryLayout(image?: string) {
  const [layout, setLayout] = useState<'photo' | 'wallpaper'>('photo');

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const ratio = img.width / img.height;
      setLayout(ratio > 1.4 ? 'wallpaper' : 'photo');
    };
  }, [image]);

  return layout;
}
