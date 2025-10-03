import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  className?: string; // For the container
  imageClassName?: string; // For the <img> tag
}

const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  ({ src, alt, className, imageClassName, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      // Reset state when src changes, important for components that re-render with new images
      setIsLoaded(false);
      setHasError(false);
      
      if (!src) {
          setHasError(true);
          return;
      };

      // FIX: The `src` prop can be a Blob, which is not a valid type for an HTMLImageElement's `src` attribute.
      // This checks if `src` is a string before assigning it.
      if (typeof src !== 'string') {
        setHasError(true);
        return;
      }

      const img = new window.Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }, [src]);
    
    const showSkeleton = !isLoaded && !hasError;

    return (
      <div ref={ref} className={cn('relative bg-gray-200 dark:bg-gray-800 overflow-hidden', className)}>
        {showSkeleton && (
          <div className="absolute inset-0 w-full h-full animate-pulse bg-gray-300 dark:bg-gray-700" />
        )}
        
        {src && typeof src === 'string' && !hasError && (
          <img
            src={src}
            alt={alt}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0',
              imageClassName
            )}
            loading="lazy"
            {...props}
          />
        )}

        {hasError && (
           <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
             <svg className="w-1/4 h-1/4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        )}
      </div>
    );
  }
);

Image.displayName = 'Image';

export default Image;
