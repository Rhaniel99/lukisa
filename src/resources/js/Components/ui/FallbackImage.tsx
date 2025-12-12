import { useState } from "react";

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function FallbackImage({
  src,
  fallback = "/placeholder.jpg",
  alt,
  ...props
}: FallbackImageProps) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
